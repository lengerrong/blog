import { GraphQLSchemaContext } from 'apollo-server-types'
import { GraphQLResolveInfo } from 'graphql'
import { Post, Posts, PostsParams } from 'apollo-graphql-types'
import OracleDB from 'oracledb'
import log from 'logging'

const posts = async (
  source: any,
  { offset }: PostsParams,
  context: GraphQLSchemaContext,
  info: GraphQLResolveInfo
) => {
  log.info(source, offset, context, info)
  const db = new OracleDB(
    {
      client_id: process.env.ORACLE_DB_OAUTH_CLIENT_ID!,
      client_secret: process.env.ORACLE_DB_OAUTH_CLIENT_SECRET!
    },
    process.env.ORACLE_DB_ORDS_URL!,
    process.env.ORACLE_DB_SCHEMA
  )
  const limit = 49
  const offsetPosts = await db.collection<Post>(
    'POSTS',
    {
      action: 'query',
      fields: 'all',
      limit,
      offset: offset,
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
  const { hasMore, count } = offsetPosts
  return {
    items: offsetPosts.items.map((item) => item.value),
    hasMore,
    count
  } as Posts
}

export default posts
