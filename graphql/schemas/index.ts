import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import resolvers from '../resolvers'
import path from 'path'

const loadSchemas = () => {
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

export default loadSchemas
