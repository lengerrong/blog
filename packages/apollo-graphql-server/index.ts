import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { loadSchemas } from './schemas'
import { ApolloServerContext } from './types/ApolloServerContext'

export const createApolloGraphqlServer = () => {
  return new ApolloServer({
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
}
