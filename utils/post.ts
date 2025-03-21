import type { z } from 'zod'
import { isValidUrl } from './common'
import type { rawLatestPostSchema, rawPopularPostSchema } from './data-schema'
import type { HeaderData, LatestPost } from '@/types/common'
import { DEFAULT_SECTION_COLOR, DEFAULT_SECTION_NAME } from '@/constants/misc'
import { getHeroImage, getSectionColor } from './data-process'
import { getPostPageUrl } from './site-urls'

const hasExternalLink = (
  rawPost: z.infer<typeof rawLatestPostSchema>
): boolean => {
  const { redirect } = rawPost
  return isValidUrl(redirect)
}

type CategoryConfig = {
  name: string
  color: string
}

const getSectionConfig = (
  rawPosts: z.infer<typeof rawLatestPostSchema>,
  headerData: HeaderData[]
): CategoryConfig => {
  const { partner, sections } = rawPosts

  if (typeof partner === 'string') {
    const categoryName = sections[0]?.name || DEFAULT_SECTION_NAME
    const color = getSectionColor(headerData, sections[0]?.slug)

    return {
      name: categoryName,
      color,
    }
  } else {
    const { slug } = partner
    if (slug === 'healthnews') {
      return {
        name: '生活',
        color: '#03C121',
      }
    } else {
      // ebc and others
      const color = DEFAULT_SECTION_COLOR
      return {
        name: DEFAULT_SECTION_NAME,
        color,
      }
    }
  }
}

const transformRawLatestPost = (
  rawPosts: z.infer<typeof rawLatestPostSchema>,
  headerData: HeaderData[]
): LatestPost => {
  const { id, title, heroImage, publishedDate, partner } = rawPosts
  const { name, color } = getSectionConfig(rawPosts, headerData)

  return {
    categoryName: name,
    categoryColor: color,
    postId: id,
    postName: title,
    heroImage: getHeroImage(heroImage),
    publishedDate,
    link: getPostPageUrl(id, !!partner),
  }
}

const transformRawPopularPost = (
  rawPosts: z.infer<typeof rawPopularPostSchema>,
  headerData: HeaderData[]
): LatestPost => {
  const { id, title, heroImage, sectionsInInputOrder: sections } = rawPosts
  const color = getSectionColor(headerData, sections[0]?.slug)

  return {
    categoryName: sections[0]?.name ?? DEFAULT_SECTION_NAME,
    categoryColor: color,
    postId: id,
    postName: title,
    heroImage: getHeroImage(heroImage),
    publishedDate: new Date().toISOString(),
    link: getPostPageUrl(id),
  }
}

export { hasExternalLink, transformRawLatestPost, transformRawPopularPost }
