export enum ENVIRONMENT {
  LOCAL = 'local',
  DEVELOPMENT = 'dev',
  STAGING = 'staging',
  PRODUCTION = 'prod',
}

type SocialLinks = {
  name: string
  url: string
}

// TODO: update url values
export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    url: '/',
  },
  {
    name: 'Instagram',
    url: '/',
  },
  {
    name: 'Threads',
    url: '/',
  },
  {
    name: 'YouTube',
    url: '/',
  },
  {
    name: 'LINE',
    url: '/',
  },
] as const satisfies SocialLinks[]
