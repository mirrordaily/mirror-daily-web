'use server'

import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import {
  GetPostBySlugDocument,
  GetRelatedPostsBySlugDocument,
} from '@/graphql/__generated__/graphql'
import type {
  GetPostBySlugQuery,
  GetRelatedPostsBySlugQuery,
} from '@/graphql/__generated__/graphql'
import {
  dateFormatter,
  getHeroImage,
  selectMainImage,
} from '@/utils/data-process'
import type { Post } from '@/types/story'
import type { RelatedPost } from '@/types/common'
import { getStoryPageUrl, getAuthorPageUrl } from '@/utils/site-urls'
import { DEFAULT_SECTION_COLOR, DEFAULT_SECTION_NAME } from '@/constants/misc'

function transformPost(rawData: GetPostBySlugQuery['post']): Post | null {
  if (!rawData) return null

  const title = rawData.title ?? ''
  const subtitle = rawData.subtitle ?? ''
  const heroCaption = rawData.heroCaption ?? ''
  const publishedTime = dateFormatter(rawData.publishedDate) ?? ''
  const heroImage = getHeroImage(rawData.heroImage)
  const ogImage = getHeroImage(rawData.og_image)
  const postMainImage = selectMainImage(heroImage, ogImage)
  const sectionName = rawData.sections?.[0]?.name ?? DEFAULT_SECTION_NAME
  const sectionColor = rawData.sections?.[0]?.color ?? DEFAULT_SECTION_COLOR
  const writers =
    rawData.writers?.map(({ id, name }) => ({
      link: getAuthorPageUrl(id),
      name: name ?? '',
    })) ?? []
  const photographers =
    rawData.photographers?.map(({ id, name }) => ({
      link: getAuthorPageUrl(id),
      name: name ?? '',
    })) ?? []
  const apiData = rawData.apiData
  const apiDataBrief = rawData.apiDataBrief
  const tags =
    rawData.tags?.map((tag) => ({
      name: tag.name ?? '',
      slug: tag.slug ?? '',
    })) ?? []
  const slug = rawData.slug ?? ''
  const link = getStoryPageUrl(slug)

  return {
    title,
    subtitle,
    heroCaption,
    publishedTime,
    postMainImage,
    sectionName,
    sectionColor,
    writers,
    photographers,
    apiData,
    apiDataBrief,
    tags,
    link,
  }
}

async function fetchPost(slug: string) {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching post with slug: ${slug} on story page`,
    getTraceObject()
  )

  const result = await fetchGQLData(errorLogger, GetPostBySlugDocument, {
    slug: slug,
  })

  if (result) {
    const { post } = result
    return transformPost(post)
  } else {
    return null
  }
}

function transformRelatedPosts(
  rawData: GetRelatedPostsBySlugQuery['post']
): RelatedPost[] {
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
    `Error occurs while fetching related posts using post slug ${slug} on story page`,
    getTraceObject()
  )

  const result = await fetchGQLData(
    errorLogger,
    GetRelatedPostsBySlugDocument,
    { slug: slug }
  )

  if (result) {
    const { post } = result
    return transformRelatedPosts(post)
  } else return []
}

export { fetchPost, fetchRelatedPosts }
