import type { z } from 'zod'
import { isValidUrl } from './common'
import type { rawLatestPostSchema, rawPopularPostSchema } from './data-schema'
import type { HeaderData, LatestPost, PopularNews } from '@/types/common'
import { DEFAULT_SECTION_NAME } from '@/constants/misc'
import { getHeroImage, getSectionColor, getCategoryColor } from './data-process'
import { getPostPageUrl } from './site-urls'
import { toDisplayDateTimeInTaipei } from './date'

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

type Sections = {
  name: string
  slug: string
}[]

const getLabelSection = (sections: Sections, headerData: HeaderData[]) => {
  if (!sections.length)
    return {
      sectionName: DEFAULT_SECTION_NAME,
      color: getSectionColor(headerData, ''),
    }

  const defaultShownSection = { name: DEFAULT_SECTION_NAME, slug: '' }
  let shownSection = { ...defaultShownSection }
  if (sections.length === 1) {
    shownSection = sections[0] ?? defaultShownSection
  } else {
    shownSection =
      sections.filter((section) => section.name !== '即時')?.[0] ??
      defaultShownSection
  }

  return {
    sectionName: shownSection.name ?? DEFAULT_SECTION_NAME,
    color: getSectionColor(headerData, shownSection.slug ?? ''),
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
  }

  const { sectionName, color } = getLabelSection(sections, headerData)

  return {
    name: sectionName,
    color,
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
    publishedDate: toDisplayDateTimeInTaipei(publishedDate),
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
  const categoryColor = getCategoryColor(headerData, categories[0]?.slug)
  const { sectionName, color } = getLabelSection(sections, headerData)

  return {
    sectionName,
    sectionColor: color,
    categoryName: categories[0]?.name ?? DEFAULT_SECTION_NAME,
    categoryColor,
    postId: id,
    postName: title,
    postBrief: brief,
    heroImage: getHeroImage(heroImage),
    publishedDate: toDisplayDateTimeInTaipei(publishedDate),
    link: getPostPageUrl(id),
  }
}

export { hasExternalLink, transformRawLatestPost, transformRawPopularPost }
