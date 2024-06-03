import { ENVIRONMENT } from './misc'

const ENV = (function () {
  const env = process.env.NEXT_PUBLIC_ENV

  if (!env) return ENVIRONMENT.LOCAL
  else if (Object.values(ENVIRONMENT).includes(env as ENVIRONMENT)) {
    return env as ENVIRONMENT
  }
  return ENVIRONMENT.LOCAL
})()

let API_ENDPOINT = ''

switch (ENV) {
  case ENVIRONMENT.LOCAL:
  case ENVIRONMENT.DEVELOPMENT:
    // TODO: switch to gql API endpoint service
    API_ENDPOINT = 'https://daily-gql-dev-axzdcnzvtq-de.a.run.app/api/graphql'
    break

  default:
    break
}

export { API_ENDPOINT, ENV }
