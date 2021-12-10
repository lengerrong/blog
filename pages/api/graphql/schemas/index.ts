import { loadSchemaSync } from '@graphql-tools/load'
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { addResolversToSchema } from '@graphql-tools/schema'
import resolvers from '../resolvers'
import path from 'path'

const loadSchemas = () => {
  const schemaPath = path.join(
    process.cwd(),
    'pages/api/graphql/schemas/**/*.graphql'
  )
  const schema = loadSchemaSync(schemaPath, {
    loaders: [new GraphQLFileLoader()]
  })
  return addResolversToSchema({
    schema,
    resolvers
  })
}

export default loadSchemas
