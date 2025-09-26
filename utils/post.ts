import type { z } from 'zod'
import { isValidUrl } from './common'
import type { rawLatestPostSchema, rawPopularPostSchema } from './data-schema'
import type { HeaderData, LatestPost, PopularNews } from '@/types/common'
import { DEFAULT_SECTION_NAME } from '@/constants/misc'
import { getHeroImage, getSectionColor, getCategoryColor } from './data-process'
import { getPostPageUrl } from './site-urls'
import { dateFormatter } from './data-process'

const hasExternalLink = (
  rawPost: z.infer<typeof rawLatestPostSchema>
): boolean => {
  const { redirect } = rawPost
  return isValidUrl(redirect)
}

type SectionConfig = {
  name: string
  color: string
}

const getSectionSlug = (sections: { name: string; slug: string }[]) => {
  if (sections.length === 1) {
    return sections[0]?.slug ?? ''
  } else if (sections.length > 1) {
    return sections.filter((section) => section.name !== '即時')[0]?.slug ?? ''
  } else {
    return ''
  }
}

const getSectionName = (sections: { name: string; slug: string }[]) => {
  if (sections.length === 1) {
    return sections[0]?.name ?? DEFAULT_SECTION_NAME
  } else if (sections.length > 1) {
    return (
      sections.filter((section) => section.name !== '即時')[0]?.name ??
      DEFAULT_SECTION_NAME
    )
  } else {
    return DEFAULT_SECTION_NAME
  }
}

const getSectionConfig = (
  rawPosts: z.infer<typeof rawLatestPostSchema>,
  headerData: HeaderData[]
): SectionConfig => {
  const { partner, sections } = rawPosts

  if (
    partner &&
    typeof partner !== 'string' &&
    partner?.slug === 'healthnews'
  ) {
    return {
      name: '生活',
      color: '#03C121',
    }
  } else {
    const sectionSlug = getSectionSlug(sections)
    const color = getSectionColor(headerData, sectionSlug)
    const sectionName = getSectionName(sections)

    return {
      name: sectionName,
      color,
    }
  }
}

const transformRawLatestPost = (
  rawPosts: z.infer<typeof rawLatestPostSchema>,
  headerData: HeaderData[]
): LatestPost => {
  const { id, title, brief, heroImage, publishedDate, partner, categories } =
    rawPosts
  const { name, color } = getSectionConfig(rawPosts, headerData)
  const categoryColor = getCategoryColor(headerData, categories[0]?.slug)

  return {
    sectionName: name,
    sectionColor: color,
    categoryName: categories[0]?.name ?? DEFAULT_SECTION_NAME,
    categoryColor,
    postId: id,
    postName: title,
    postBrief: brief,
    heroImage: getHeroImage(heroImage),
    publishedDate: dateFormatter(publishedDate),
    link: getPostPageUrl(id, !!partner),
  }
}

const transformRawPopularPost = (
  rawPosts: z.infer<typeof rawPopularPostSchema>,
  headerData: HeaderData[]
): PopularNews => {
  const {
    id,
    title,
    brief,
    heroImage,
    publishedDate,
    sectionsInInputOrder: sections,
    categories,
  } = rawPosts
  const sectionSlug = getSectionSlug(sections)
  const sectionColor = getSectionColor(headerData, sectionSlug)
  const categoryColor = getCategoryColor(headerData, categories[0]?.slug)
  const sectionName = getSectionName(sections)

  return {
    sectionName,
    sectionColor,
    categoryName: categories[0]?.name ?? DEFAULT_SECTION_NAME,
    categoryColor,
    postId: id,
    postName: title,
    postBrief: brief,
    heroImage: getHeroImage(heroImage),
    publishedDate: dateFormatter(publishedDate),
    link: getPostPageUrl(id),
  }
}

export { hasExternalLink, transformRawLatestPost, transformRawPopularPost }
