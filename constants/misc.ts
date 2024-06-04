export enum ENVIRONMENT {
  LOCAL = 'local',
  DEVELOPMENT = 'dev',
  STAGING = 'staging',
  PRODUCTION = 'prod',
}

export type SocialLinks = {
  name: string
  href: string
}

// TODO: update url values
export const SOCIAL_LINKS = [
  {
    name: 'Facebook',
    href: '/',
  },
  {
    name: 'Instagram',
    href: '/',
  },
  {
    name: 'Threads',
    href: '/',
  },
  {
    name: 'YouTube',
    href: '/',
  },
  {
    name: 'LINE',
    href: '/',
  },
] as const satisfies SocialLinks[]
