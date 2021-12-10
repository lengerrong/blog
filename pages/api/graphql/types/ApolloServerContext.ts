import { MicroRequest } from 'apollo-server-micro/dist/types'
import { ServerResponse } from 'http'

type ApolloServerContext = {
  req: MicroRequest
  res: ServerResponse
}

export default ApolloServerContext
