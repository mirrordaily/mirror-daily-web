import 'server-only'

import { ApolloError } from '@apollo/client'
import errors from '@twreporter/errors'
import { GCP_PROJECT_ID } from '@/constants/config'
import { headers } from 'next/headers'

const createErrorLogger = (
  errorMessage: string,
  traceObject?: Record<string, unknown> | undefined
) => {
  return (error: unknown) => {
    const annotatingError = errors.helpers.wrap(
      error,
      'UnhandledError',
      errorMessage
    )

    if (error instanceof ApolloError) {
      const { graphQLErrors, clientErrors, networkError } = error
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
    } else if (error instanceof Error) {
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
            error: {
              name: error.name,
              message: error.message,
              stack: error.stack,
            },
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
            error,
          },
          ...(traceObject ?? {}),
        })
      )
    }
  }
}

const getTraceObject = () => {
  const globalLogFields: Record<string, string> = {}
  try {
    const traceHeader = headers().get('x-cloud-trace-context')
    if (traceHeader) {
      const [trace] = traceHeader.split('/')
      globalLogFields['logging.googleapis.com/trace'] =
        `projects/${GCP_PROJECT_ID}/traces/${trace}`
    }
    return globalLogFields
  } catch (e) {
    return globalLogFields
  }
}

export { createErrorLogger, getTraceObject }
