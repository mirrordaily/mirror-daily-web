'use server'

import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { fetchStoryGQLData } from '@/utils/graphql'
import {
  GetExternalByIdDocument,
  GetRelatedPostsByExternalIdDocument,
} from '@/graphql/__generated__/graphql'
import type { GetExternalByIdQuery } from '@/graphql/__generated__/graphql'
import type { ExternalPost } from '@/types/external'
import { dateFormatter, transformRawRelatedPosts } from '@/utils/data-process'
import { getExternalPageUrl, getExternalsPageUrl } from '@/utils/site-urls'
import type { RelatedPost } from '@/types/common'

function transformExternal(
  rawData: GetExternalByIdQuery['external']
): ExternalPost | null {
  if (!rawData) return null
  const title = rawData.title ?? ''
  const thumb = rawData.thumb ?? ''
  const thumbCaption = rawData.thumbCaption ?? ''
  const partner = rawData.partner?.name ?? ''
  const partnerSlug = rawData.partner?.slug ?? ''
  const externalsLink = getExternalsPageUrl(partnerSlug)
  const publishedTime = dateFormatter(rawData.publishedDate) ?? ''
  const updatedTime = rawData.updatedAt ? dateFormatter(rawData.updatedAt) : ''
  const brief = rawData.brief ?? ''
  const content = rawData.content ?? ''
  const tags =
    rawData.tags?.map((tag) => ({
      name: tag.name ?? '',
      slug: tag.slug ?? '',
    })) ?? []
  const link = getExternalPageUrl(rawData.id)
  const slicedSections = Array.isArray(rawData.sections)
    ? rawData.sections.slice(0, 3)
    : []

  const sections = slicedSections.map((section) => ({
    name: section.name ?? '',
    color: section.color ?? '',
    slug: section.slug ?? '',
  }))

  const categories =
    rawData.categories?.map((category) => ({
      name: category.name ?? '',
      slug: category.slug ?? '',
    })) ?? []

  return {
    title,
    thumb,
    thumbCaption,
    partner,
    externalsLink,
    publishedTime,
    updatedTime,
    brief,
    content,
    tags,
    link,
    sections,
    categories,
  }
}

async function fetchExternal(id: string): Promise<ExternalPost | null> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching external with id:${id} on external page`,
    getTraceObject()
  )
  const result = await fetchStoryGQLData(errorLogger, GetExternalByIdDocument, {
    id,
  })
  if (result) {
    const { external } = result
    return transformExternal(external)
  } else {
    return null
  }
}

async function fetchRelatedPosts(id: string): Promise<RelatedPost[]> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching related posts using external id:${id} on external page`,
    getTraceObject()
  )
  const result = await fetchStoryGQLData(
    errorLogger,
    GetRelatedPostsByExternalIdDocument,
    {
      id,
    }
  )
  if (result) {
    const { external } = result
    return transformRawRelatedPosts(external)
  } else {
    return []
  }
}

export { fetchExternal, fetchRelatedPosts }
