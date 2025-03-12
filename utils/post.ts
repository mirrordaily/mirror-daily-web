import type { z } from 'zod'
import { isValidUrl } from './common'
import type { rawLatestPostSchema } from './data-schema'
import type { LatestPost } from '@/types/common'
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
  sectionData: Parameters<typeof getSectionColor>[0]
): CategoryConfig => {
  const { partner, sections } = rawPosts

  if (typeof partner === 'string') {
    const categoryName = sections[0]?.name || DEFAULT_SECTION_NAME
    const color = getSectionColor(sectionData, sections[0]?.slug)

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
  sectionData: Parameters<typeof getSectionColor>[0]
): LatestPost => {
  const { title, slug, heroImage, publishedDate, partner } = rawPosts
  const { name, color } = getSectionConfig(rawPosts, sectionData)

  return {
    categoryName: name,
    categoryColor: color,
    postName: title,
    postSlug: slug,
    heroImage: getHeroImage(heroImage),
    publishedDate,
    link: getPostPageUrl(slug, !!partner),
  }
}

export { hasExternalLink, transformRawLatestPost }
