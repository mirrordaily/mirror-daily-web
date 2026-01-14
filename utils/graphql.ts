import { type OperationVariables } from '@apollo/client'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'

import { getClient, getStoryClient } from './apollo-client'
import type { createErrorLogger } from './log/common'

async function fetchGQLData<TResult, TVariables extends OperationVariables>(
  errorLogger: ReturnType<typeof createErrorLogger>,
  query: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
): Promise<TResult | null> {
  try {
    const { data, errors: gqlErrors } = await getClient().query({
      query,
      variables,
    })

    if (gqlErrors && gqlErrors.length > 0) {
      throw gqlErrors
    }
    return data
  } catch (error) {
    errorLogger(error)
    return null
  }
}

async function updateGQLData<TResult, TVariables extends OperationVariables>(
  errorLogger: ReturnType<typeof createErrorLogger>,
  mutation: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
): Promise<TResult | null | undefined> {
  try {
    const { data, errors: gqlErrors } = await getClient().mutate({
      mutation,
      variables,
    })

    if (gqlErrors && gqlErrors.length > 0) {
      throw gqlErrors
    }
    return data
  } catch (error) {
    errorLogger(error)
    return null
  }
}

// Fetch GraphQL data using story-specific endpoint
async function fetchStoryGQLData<
  TResult,
  TVariables extends OperationVariables,
>(
  errorLogger: ReturnType<typeof createErrorLogger>,
  query: TypedDocumentNode<TResult, TVariables>,
  variables?: TVariables
): Promise<TResult | null> {
  try {
    const { data, errors: gqlErrors } = await getStoryClient().query({
      query,
      variables,
    })

    if (gqlErrors && gqlErrors.length > 0) {
      throw gqlErrors
    }
    return data
  } catch (error) {
    errorLogger(error)
    // If the primary story endpoint fails, fallback to the default endpoint.
    return fetchGQLData(errorLogger, query, variables)
  }
}

export { fetchGQLData, updateGQLData, fetchStoryGQLData }
