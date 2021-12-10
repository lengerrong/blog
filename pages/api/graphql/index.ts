// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApolloServer } from 'apollo-server-micro'
import loadSchemas from './schemas'
import { MicroRequest } from 'apollo-server-micro/dist/types'
import { ServerResponse } from 'http'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import ApolloServerContext from './types/ApolloServerContext'

const apolloServer = new ApolloServer({
  schema: loadSchemas(),
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground({
      settings: {
        'schema.polling.enable': false
      }
    })
  ],
  introspection: true,
  context: (context: ApolloServerContext) => {
    return context
  }
})
const startServer = apolloServer.start()

type GraphqlHandler = (req: MicroRequest, res: ServerResponse) => Promise<void>
let gqlHandler: GraphqlHandler | null = null

export const config = {
  api: {
    bodyParser: false
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await startServer
  gqlHandler ||= apolloServer.createHandler({
    path: '/api/graphql'
  })
  await gqlHandler(req, res)
}
