import type { SHORTS_TYPE } from '@/types/common'

export enum ENVIRONMENT {
  LOCAL = 'local',
  DEVELOPMENT = 'dev',
  STAGING = 'staging',
  PRODUCTION = 'prod',
}

type SocialLinks = {
  name: string
  href: string
}

type PageLink = SocialLinks & {
  isExternal?: boolean
}

type ContactLink = SocialLinks & {
  text: string
}

// TODO: update url values
export const PAGE_LINKS: PageLink[] = [
  {
    name: '廣告業務',
    href: '/',
    isExternal: true,
  },
  {
    name: '內容授權',
    href: '/',
    isExternal: true,
  },
  {
    name: '下載APP',
    href: '/',
    isExternal: true,
  },
  {
    name: '新聞自律',
    href: '/',
    isExternal: true,
  },
]

export const CONTACT_LINKS: ContactLink[] = [
  {
    name: '鏡報客服',
    href: 'tel:+886(02)7752-5678',
    text: '(02)7752-5678',
  },
  {
    // TODO: update email
    name: '客服信箱',
    href: 'mailto:movieservice@nexttv.com.tw',
    text: 'movieservice@nexttv.com.tw',
  },
]

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

export const SITE_LINKS = [
  {
    name: '鏡週刊',
    href: 'https://www.mirrormedia.mg/',
  },
  {
    name: '鏡文學',
    href: 'https://www.mirrorfiction.com/',
  },
  {
    name: '鏡電視',
    href: 'https://www.mnews.tw/',
  },
] as const satisfies SocialLinks[]

export const IMAGE_BREAKPOINT = {
  mobile: '719px',
  tablet: '1199px',
} as const

export const LATEST_SHORT_PAGES = {
  news: '/shorts/news',
  creativity: '/shorts/creativity',
} as const satisfies Record<SHORTS_TYPE, string>

export const SHARE_URL_FACEBOOK = 'https://www.facebook.com/share.php?u='

export const SHARE_URL_LINE = 'https://social-plugins.line.me/lineit/share?url='
