import axios, { AxiosError } from 'axios'
import path from 'path'

type CredentialsType = 'basic' | 'bearer'

export class HttpBasicCredentials {
  readonly type: CredentialsType = 'basic'
  password: string
  constructor(password: string) {
    this.password = password
  }
}

export class OauthClientCredentials {
  readonly type: CredentialsType = 'bearer'
  client_id: string
  client_secret: string
  constructor(client_id: string, client_secret: string) {
    this.client_id = client_id
    this.client_secret = client_secret
  }
}

type OauthToken = {
  access_token: string
  expires_in: number
}

export default class OracleSODARestApi {
  /**
   * The database schema that is enabled for Oracle REST Data Service(ORDS)
   * The default is `"admin"`
   */
  schema: string
  /**
   * The database_ORDS_url is available by clicking COPY URL in the RESTful Services and
   * Soda area on the Autonomous Database Service Console.
   * See Access RESTful Services and SODA for REST for more information.
   * https://docs.oracle.com/en/cloud/paas/autonomous-json-database/ajdug/ords-accessing-ords-and-soda-services-autonomous-database.html
   */
  ords_url: string
  /**
   * Choose how you want to aunthenticate the access to SODA for REST on Autonomous Database
   * The default is `"bearer"`, accessing SODA for REST with OAuth authentication can improve performance and security.
   *
   */
  credentials: HttpBasicCredentials | OauthClientCredentials

  private oauth_token?: OauthToken

  constructor(
    credentials: HttpBasicCredentials | OauthClientCredentials,
    ords_url: string,
    schema = 'admin'
  ) {
    this.ords_url = ords_url
    this.schema = schema
    this.credentials = credentials
  }

  private async ensureOauthToken() {
    if (this.credentials.type === 'basic') return true
    if (this.oauth_token && this.oauth_token.expires_in < new Date().getTime())
      return true
    // oauth token expired or not obtained yet
    // obtain a new token
    const url = new URL(
      path.join(this.schema, 'oauth/token'),
      this.ords_url
    ).toString()
    const { client_id, client_secret } = this
      .credentials as OauthClientCredentials
    return axios
      .get(url, {
        auth: {
          username: client_id,
          password: client_secret
        },
        data: {
          grant_type: 'client_credentials'
        }
      })
      .then((res) => {
        this.oauth_token = res.data as OauthToken
      })
      .catch((err: Error | AxiosError) => {
        throw err
      })
  }
}
