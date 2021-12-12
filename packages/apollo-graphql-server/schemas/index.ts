import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import { resolvers } from '../resolvers'
import path from 'path'

export const loadSchemas = () => {
  // *.graphql files are placed at /public folder as static resources
  // otherwise files are not accessible if this was called
  // in a serverless lambda function(such as /api/graphql endpoint)
  const dir = path.resolve('./public', 'graphql')
  const schemaPath = path.join(dir, 'schemas/**/*.graphql')
  const schema = loadSchemaSync(schemaPath, {
    loaders: [new GraphQLFileLoader()]
  })
  return addResolversToSchema({
    schema,
    resolvers
  })
}
