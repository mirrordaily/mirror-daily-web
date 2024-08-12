import { FIXED_KEY_FOR_SECTION_SHORTS } from '@/constants/config'
import { LATEST_SHORT_PAGES } from '@/constants/misc'

export const getPostPageUrl = (slug: string, isExternal?: boolean) =>
  isExternal ? getExternalPageUrl(slug) : getStoryPageUrl(slug)

export const getExternalPageUrl = (slug: string) => `/external/${slug}`

export const getStoryPageUrl = (slug: string) => `/story/${slug}`

export const getSectionPageUrl = (slug: string) =>
  slug === FIXED_KEY_FOR_SECTION_SHORTS
    ? LATEST_SHORT_PAGES.news
    : `/section/${slug}`

export const getCategoryPageUrl = (slug: string) => `/category/${slug}`

export const getTopicSectionPage = () => `/topics`

export const getTopicPageUrl = (slug: string) => `/topic/${slug}`

export const getShortsPageUrl = (id: string) => `/shorts/${id}`
