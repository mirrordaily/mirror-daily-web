import { ApolloError } from '@apollo/client'
import errors from '@twreporter/errors'

const logGQLError = (
  errorMessage: string,
  traceObject?: Record<string, unknown> | undefined
) => {
  return (gqlErrors: unknown) => {
    const annotatingError = errors.helpers.wrap(
      gqlErrors,
      'UnhandledError',
      errorMessage
    )

    if (gqlErrors instanceof ApolloError) {
      const { graphQLErrors, clientErrors, networkError } = gqlErrors
      console.error(
        JSON.stringify({
          severity: 'ERROR',
          message: errors.helpers.printAll(
            annotatingError,
            {
              withStack: true,
              withPayload: true,
            },
            0,
            0
          ),
          debugPayload: {
            graphQLErrors,
            clientErrors,
            networkError,
          },
          ...(traceObject ?? {}),
        })
      )
    } else {
      console.error(
        JSON.stringify({
          severity: 'ERROR',
          message: errors.helpers.printAll(
            annotatingError,
            {
              withStack: true,
              withPayload: true,
            },
            0,
            0
          ),
          debugPayload: {
            gqlErrors,
          },
          ...(traceObject ?? {}),
        })
      )
    }
  }
}

export { logGQLError }
