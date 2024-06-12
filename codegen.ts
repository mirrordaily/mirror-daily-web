// GraphQL-Codegen config file
import type { CodegenConfig } from '@graphql-codegen/cli'
import { API_ENDPOINT } from './constants/config'

const config: CodegenConfig = {
  schema: API_ENDPOINT,
  documents: ['./graphql/**/*.{gql,graphql}'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './graphql/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
      hooks: { afterOneFileWrite: ['prettier --write'] },
    },
  },
}

export default config
