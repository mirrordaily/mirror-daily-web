import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { getStoryPageUrl } from '@/utils/site-urls'
import {
  getHeroImage,
  dateFormatter,
  selectMainImage,
} from '@/utils/data-process'
import { fetchGQLData } from '@/utils/graphql'
import type {
  GetTagInformationQuery,
  GetPostsByTagSlugQuery,
} from '@/graphql/__generated__/graphql'
import {
  GetTagInformationDocument,
  GetPostsByTagSlugDocument,
} from '@/graphql/__generated__/graphql'
import type { TagPost, TagInfo } from '@/types/tag-page'

function transformTagInformation(
  rawData: GetTagInformationQuery['tag']
): TagInfo | null {
  if (!rawData) return null

  const name = rawData.name ?? ''

  return {
    name,
  }
}

async function fetchTagInformation(slug: string): Promise<TagInfo | null> {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching tag information',
    getTraceObject()
  )

  const result = await fetchGQLData(errorLogger, GetTagInformationDocument, {
    slug: slug,
  })

  if (result) {
    const { tag } = result
    return transformTagInformation(tag)
  } else {
    return null
  }
}

function transformTagPost(rawData: GetPostsByTagSlugQuery['posts']): TagPost[] {
  if (!rawData) return []

  return rawData.map((rawPost) => {
    const title = rawPost.title ?? ''
    const slug = rawPost.slug ?? ''
    const link = getStoryPageUrl(slug)
    const createdTime = dateFormatter(rawPost.createdAt) ?? ''
    const heroImage = getHeroImage(rawPost.heroImage)
    const brief = rawPost.apiDataBrief?.[0]?.content?.[0] ?? ''
    const sectionName = rawPost.sections?.[0]?.name ?? ''
    const sectionColor = rawPost.sections?.[0]?.color ?? '#FF5A36'
    const content = rawPost.apiData?.[0]?.content?.[0] ?? ''
    const ogImage = getHeroImage(rawPost.og_image)
    const postMainImage = selectMainImage(heroImage, ogImage)
    const textContent = brief || content

    return {
      postMainImage,
      title,
      textContent,
      link,
      createdTime,
      sectionColor,
      sectionName,
    }
  })
}

async function fetchTagPosts(page: number, slug: string): Promise<TagPost[]> {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching posts in tag page',
    getTraceObject()
  )

  const pageSize = 12
  const take = pageSize * 2

  const result = await fetchGQLData(errorLogger, GetPostsByTagSlugDocument, {
    skip: (page - 1) * pageSize,
    take: take,
    slug: slug,
  })

  if (result) {
    const { posts } = result
    return transformTagPost(posts)
  } else {
    return []
  }
}

export { fetchTagInformation, fetchTagPosts }
