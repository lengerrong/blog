import { GraphQLSchemaContext } from 'apollo-server-types'
import { GraphQLResolveInfo } from 'graphql'
import { Post } from 'apollo-graphql-types'
import OracleDB from 'oracledb'

export type PostParams = {
  slug: string
}

const post = async (
  _source: any,
  { slug }: PostParams,
  _context: GraphQLSchemaContext,
  _info: GraphQLResolveInfo
) => {
  const db = new OracleDB(
    {
      client_id: process.env.ORACLE_DB_OAUTH_CLIENT_ID!,
      client_secret: process.env.ORACLE_DB_OAUTH_CLIENT_SECRET!
    },
    process.env.ORACLE_DB_ORDS_URL!,
    process.env.ORACLE_DB_SCHEMA
  )
  const limit = 1
  const offset = 0
  const posts = await db.collection<Post>(
    'POSTS',
    {
      action: 'query',
      fields: 'all',
      limit,
      offset,
      totalResults: true
    },
    {
      $query: {
        type: 'post',
        status: 'published',
        slug
      },
      $orderby: [
        {
          path: 'published_at',
          order: 'desc'
        }
      ]
    }
  )
  return posts.items?.[offset].value
}

export default post
