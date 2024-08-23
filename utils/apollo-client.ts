import type { ApolloLink } from '@apollo/client'
import {
  ApolloClient,
  from,
  InMemoryCache,
  type NormalizedCacheObject,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { isServer } from '@/utils/common'

import { API_ENDPOINT } from '@/constants/config'
import { createErrorLogger } from './log/common'

// reference: https://www.apollographql.com/blog/how-to-use-apollo-client-with-next-js-13
// makes sure that we only instance the Apollo Client once per request,
// since Apollo Client’s cache is designed with a single user in mind,
// we recommend that your Next.js server instantiates a new cache for each SSR request,
// rather than reusing the same long-lived instance for multiple users’ data.

let client: ApolloClient<NormalizedCacheObject> | null = null

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (isServer()) {
    if (graphQLErrors) {
      const logger = createErrorLogger('GraphQL Error')
      graphQLErrors.forEach((error) => logger(error))
    }
    if (networkError) {
      const logger = createErrorLogger('Network Error')
      logger(networkError)
    }
  }
})

const uploadLink = createUploadLink({
  uri: API_ENDPOINT,
  headers: {
    'Apollo-Require-Preflight': 'true',
  },
}) as unknown as ApolloLink

export const getClient = () => {
  // creat a new client if there's no existing one
  // or if we are running on the server.
  if (!client || isServer()) {
    client = new ApolloClient({
      link: from([errorLink, uploadLink]),
      cache: new InMemoryCache(),
      defaultOptions: {
        query: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all',
        },
      },
    })
  }
  return client
}
