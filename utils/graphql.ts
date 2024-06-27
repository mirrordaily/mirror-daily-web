import { type OperationVariables } from '@apollo/client'
import type { TypedDocumentNode } from '@graphql-typed-document-node/core'

import { getClient } from './apollo-client'
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

export { fetchGQLData }
