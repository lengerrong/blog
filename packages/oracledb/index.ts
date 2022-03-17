import axios from 'axios'
import path from 'path'
import qs from 'qs'
import { Collection } from './collection'

export type OauthClientCredentials = {
  client_id: string
  client_secret: string
}

type OauthToken = {
  access_token: string
  expires_in: number
}

export default class OracleDB {
  /**
   * The database schema that is enabled for Oracle REST Data Service(ORDS)
   * The default is `admin`
   */
  private schema: string
  /**
   * The database_ORDS_url is available by clicking COPY URL in the RESTful Services and
   * Soda area on the Autonomous Database Service Console.
   * See Access RESTful Services and SODA for REST for more information.
   * https://docs.oracle.com/en/cloud/paas/autonomous-json-database/ajdug/ords-accessing-ords-and-soda-services-autonomous-database.html
   * Usually the url has the below pattern.
   * https://${host}-{db}.adb.${region}.oraclecloudapps.com/ords/
   */
  private ords_url: string
  /**
   * accessing SODA for REST with OAuth authentication can improve performance and security.
   *
   */
  private credentials: OauthClientCredentials

  private oauth_token?: OauthToken

  constructor(
    credentials: OauthClientCredentials,
    ords_url: string,
    schema = 'admin'
  ) {
    this.ords_url = ords_url
    this.schema = schema
    this.credentials = credentials
  }

  async collection<T>(alias: string, query?: any, payload?: any) {
    await this.ensureOauthToken()
    const { access_token } = this.oauth_token!
    const url = new URL(
      path.join(this.schema, 'soda/latest', alias),
      this.ords_url
    )
    url.search = qs.stringify(query)
    const headers = {
      'content-type': 'application/json',
      Authorization: `Bearer ${access_token}`
    }
    const config = {
      headers: headers
    }
    console.log('post ', url.toString())
    return (await axios.post(url.toString(), payload, config))
      .data as Collection<T>
  }

  private ensureOauthToken() {
    if (this.oauth_token && this.oauth_token.expires_in < new Date().getTime())
      return Promise.resolve(this.oauth_token)
    // oauth token expired or not obtained yet
    // obtain a new token
    const url = new URL(
      path.join(this.schema, 'oauth/token'),
      this.ords_url
    ).toString()
    const { client_id, client_secret } = this.credentials
    const auth_token = Buffer.from(
      `${client_id}:${client_secret}`,
      'utf-8'
    ).toString('base64')
    const data = { grant_type: 'client_credentials' }
    const config = {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${auth_token}`
      }
    }
    return axios.post(url, qs.stringify(data), config).then((res) => {
      return (this.oauth_token = res.data as OauthToken)
    })
  }
}
