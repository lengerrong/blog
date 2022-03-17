/**
 * @jest-environment node
 */
import OracleDB from '..'

describe('OracleDB', () => {
  it('collection', async () => {
    const api = new OracleDB(
      {
        client_id: 'ENoZUNuN-zHiy1nrA1OGvw..',
        client_secret: 'lctTIH6yjQgi1WkFk-y-2A..'
      },
      'https://gb155dd5f199f4a-errongwindev.adb.us-sanjose-1.oraclecloudapps.com/ords/'
    )
    //const tests = await api.collection('tests')
    //expect(tests?.data?.items?.[0]?.value?.hello).toEqual('world')
  })
})
