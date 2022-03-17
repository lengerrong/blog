/**
 * @jest-environment node
 */
import OracleSODARestApi, { OauthClientCredentials } from '..'

describe('OracleSODARestApi', () => {
  it('collection', async () => {
    const api = new OracleSODARestApi(
      new OauthClientCredentials(
        'ENoZUNuN-zHiy1nrA1OGvw..',
        'lctTIH6yjQgi1WkFk-y-2A..'
      ),
      'https://gb155dd5f199f4a-errongwindev.adb.us-sanjose-1.oraclecloudapps.com/ords/'
    )
    //const tests = await api.collection('tests')
    //expect(tests?.data?.items?.[0]?.value?.hello).toEqual('world')
  })
})
