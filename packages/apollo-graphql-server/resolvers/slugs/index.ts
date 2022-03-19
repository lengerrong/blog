import { Post } from 'apollo-graphql-types'
import OracleDB from 'oracledb'

const slugs = async () => {
  const db = new OracleDB(
    {
      client_id: process.env.ORACLE_DB_OAUTH_CLIENT_ID!,
      client_secret: process.env.ORACLE_DB_OAUTH_CLIENT_SECRET!
    },
    process.env.ORACLE_DB_ORDS_URL!,
    process.env.ORACLE_DB_SCHEMA
  )
  const offset = 0
  const limit = 512
  const slugsCollection = await db.collection<Post>(
    'POSTS',
    {
      action: 'query',
      fields: ['slug'],
      offset,
      limit,
      totalResults: true
    },
    {
      $query: {
        type: 'post',
        status: 'published'
      },
      $orderby: [
        {
          path: 'published_at',
          order: 'desc'
        }
      ]
    }
  )
  return slugsCollection.items.map((item) => item.value.slug)
}

export default slugs
