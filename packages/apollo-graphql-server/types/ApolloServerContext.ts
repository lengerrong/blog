import { MicroRequest } from 'apollo-server-micro/dist/types'
import { ServerResponse } from 'http'

export type ApolloServerContext = {
  req: MicroRequest
  res: ServerResponse
}
