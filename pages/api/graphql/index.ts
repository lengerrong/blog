// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createApolloGraphqlServer } from 'apollo-graphql-server'

const gqlServer = createApolloGraphqlServer()
const startServer = gqlServer.start()

type GraphqlHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>
let gqlHandler: GraphqlHandler | null = null

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer
  gqlHandler ||= gqlServer.createHandler({
    path: '/api/graphql'
  })
  await gqlHandler(req, res)
}
