import type { SHORTS_TYPE } from '@/types/common'

export const SITE_NAME = '鏡報'

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
  headerSubmitButtonName: string
}

// TODO: update url values
export const PAGE_LINKS: PageLink[] = [
  {
    name: '新聞自律',
    href: '/',
    isExternal: true,
  },
  {
    name: 'AI使用規範',
    href: 'https://www.mirrordaily.news/story/4764',
    isExternal: true,
  },
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
    name: '隱私權政策',
    href: 'https://www.mirrordaily.news/story/4936',
    isExternal: true,
  },
  // {
  //   name: '下載APP',
  //   href: '/',
  //   isExternal: true,
  // },
]

export const CONTACT_LINKS: ContactLink[] = [
  {
    name: '爆料專線',
    headerSubmitButtonName: '',
    href: 'tel:+886(02)6619-8085',
    text: '(02)6619-8085',
  },
  {
    name: '爆料信箱',
    headerSubmitButtonName: '我要爆料',
    href: 'mailto:119@mirrordaily.news',
    text: '119@mirrordaily.news',
  },
  {
    name: '投書信箱',
    headerSubmitButtonName: '我要投書',
    href: 'mailto:editor@mirrordaily.news',
    text: 'editor@mirrordaily.news',
  },
]

export const CONTACT_LINKS_WITHOUT_FIRST = CONTACT_LINKS.filter(
  (_, idx) => idx !== 0
)

export const SOCIAL_LINKS = [
  {
    name: 'LINE',
    href: 'https://page.line.me/mirrordaily',
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/mirrordailytw/',
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/mirrordaily_tw/',
  },
  {
    name: 'Threads',
    href: 'https://www.threads.net/@mirrordaily_tw',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@%E9%8F%A1%E6%95%A2%E7%88%86',
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

export const DEFAULT_SECTION_NAME = '時事'

export const DEFAULT_SECTION_COLOR = '#4D8AA4'

export const FLASH_NEWS_COUNT = 8
