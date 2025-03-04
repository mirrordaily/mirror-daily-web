'use server'

import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import {
  GetExternalBySlugDocument,
  GetRelatedPostsByExternalSlugDocument,
} from '@/graphql/__generated__/graphql'
import type {
  GetExternalBySlugQuery,
  GetRelatedPostsByExternalSlugQuery,
} from '@/graphql/__generated__/graphql'
import type { ExternalPost } from '@/types/external'
import {
  dateFormatter,
  getHeroImage,
  selectMainImage,
} from '@/utils/data-process'
import { getExternalPageUrl, getStoryPageUrl } from '@/utils/site-urls'
import { DEFAULT_SECTION_COLOR, DEFAULT_SECTION_NAME } from '@/constants/misc'
import type { RelatedPost } from '@/types/story'

function transformExternal(
  rawData: GetExternalBySlugQuery['external']
): ExternalPost | null {
  if (!rawData) return null
  const title = rawData.title ?? ''
  const thumb = rawData.thumb ?? ''
  const writer = rawData.extend_byline ?? ''
  const publishedTime = dateFormatter(rawData.publishedDate) ?? ''
  const brief = rawData.brief ?? ''
  const content = rawData.content ?? ''
  const tags =
    rawData.tags?.map((tag) => ({
      name: tag.name ?? '',
      slug: tag.slug ?? '',
    })) ?? []
  const slug = rawData.slug ?? ''
  const link = getExternalPageUrl(slug)

  return {
    title,
    thumb,
    writer,
    publishedTime,
    brief,
    content,
    tags,
    link,
  }
}

async function fetchExternal(slug: string): Promise<ExternalPost | null> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching external with slug:${slug} on external page`,
    getTraceObject()
  )
  const result = await fetchGQLData(errorLogger, GetExternalBySlugDocument, {
    slug,
  })
  if (result) {
    const { external } = result
    return transformExternal(external)
  } else {
    return null
  }
}

function transformRelatedPosts(
  rawData: GetRelatedPostsByExternalSlugQuery['external']
) {
  if (!rawData || !rawData.relateds) return []

  return rawData.relateds.map((rawPost) => {
    const title = rawPost.title ?? ''
    const slug = rawPost.slug ?? ''
    const link = getStoryPageUrl(slug)
    const heroImage = getHeroImage(rawPost.heroImage)
    const ogImage = getHeroImage(rawPost.og_image)
    const postMainImage = selectMainImage(heroImage, ogImage)
    const sectionName = rawPost.sections?.[0]?.name ?? DEFAULT_SECTION_NAME
    const sectionColor = rawPost.sections?.[0]?.color ?? DEFAULT_SECTION_COLOR

    return {
      title,
      link,
      postMainImage,
      sectionColor,
      sectionName,
    }
  })
}

async function fetchRelatedPosts(slug: string): Promise<RelatedPost[]> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching related posts using external slug:${slug} on external page`,
    getTraceObject()
  )
  const result = await fetchGQLData(
    errorLogger,
    GetRelatedPostsByExternalSlugDocument,
    {
      slug,
    }
  )
  if (result) {
    const { external } = result
    return transformRelatedPosts(external)
  } else {
    return []
  }
}

export { fetchExternal, fetchRelatedPosts }
