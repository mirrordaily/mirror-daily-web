'use server'

import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import {
  GetPostByIdDocument,
  GetRelatedPostsByIdDocument,
  GetPostsBySameSectionDocument,
} from '@/graphql/__generated__/graphql'
import type {
  GetPostByIdQuery,
  PostDetailFragment,
} from '@/graphql/__generated__/graphql'
import {
  dateFormatter,
  getHeroImage,
  selectMainImage,
  transformRawRelatedPosts,
} from '@/utils/data-process'
import type { Post } from '@/types/story'
import type { RelatedPost } from '@/types/common'
import { getStoryPageUrl, getAuthorPageUrl } from '@/utils/site-urls'

function transformPost(
  rawData: GetPostByIdQuery['post'] | PostDetailFragment
): Post | null {
  if (!rawData) return null

  const heroImage = getHeroImage(rawData.heroImage)
  const ogImage = getHeroImage(rawData.og_image)
  const postMainImage = selectMainImage(heroImage, ogImage)
  // 為了相容舊資料：目前警語是複選 (Warnings)，但以前是單選 (Warning)，所以兩個欄位都需要保留
  const warnings =
    rawData.Warnings?.map(({ id, content }) => ({
      id,
      content: content ?? '',
    })) ?? []
  if (rawData.Warning) {
    warnings.push({
      id: rawData.Warning.id ?? '',
      content: rawData.Warning.content ?? '',
    })
  }
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
  const editors =
    rawData.designers?.map(({ id, name }) => ({
      link: getAuthorPageUrl(id),
      name: name ?? '',
    })) ?? []
  const mainWriters =
    rawData.engineers?.map(({ id, name }) => ({
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
  const algoTags =
    rawData.tags_algo?.map((tag) => ({
      name: tag.name ?? '',
      slug: tag.slug ?? '',
    })) ?? []

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
    id: rawData.id,
    link: getStoryPageUrl(rawData.id),
    title: rawData.title ?? '',
    subtitle: rawData.subtitle ?? '',
    heroCaption: rawData.heroCaption ?? '',
    publishedDateRaw: rawData.publishedDate ?? '',
    publishedTime: dateFormatter(rawData.publishedDate) ?? '',
    postMainImage,
    sections,
    isAdult: rawData.isAdult ?? false,
    shouldShowAd: !(rawData.hiddenAdvertised ?? false),
    writers,
    photographers,
    editors,
    mainWriters,
    apiData,
    apiDataBrief,
    tags,
    algoTags,
    warnings,
    categories,
  }
}

async function fetchPost(id: string) {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching post with id: ${id} on story page`,
    getTraceObject()
  )

  const result = await fetchGQLData(errorLogger, GetPostByIdDocument, {
    id: id,
  })

  if (result) {
    const { post } = result
    return transformPost(post)
  } else {
    return null
  }
}

async function fetchNextPostBySameSectionAction(
  id: string,
  slug: string,
  publishedDate: string
): Promise<Post | null> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching next post by same section with id: ${id}, slug: ${slug} and published date: ${publishedDate} on story page`,
    getTraceObject()
  )

  const result = await fetchGQLData(
    errorLogger,
    GetPostsBySameSectionDocument,
    {
      take: 1,
      slug,
      publishedDate,
    }
  )

  const rawPost = result?.posts?.[0]
  if (!rawPost) return null

  return transformPost(rawPost)
}

async function fetchRelatedPosts(id: string): Promise<RelatedPost[]> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching related posts using post id ${id} on story page`,
    getTraceObject()
  )

  const result = await fetchGQLData(errorLogger, GetRelatedPostsByIdDocument, {
    id: id,
  })

  if (result) {
    const { post } = result
    return transformRawRelatedPosts(post)
  } else return []
}

export { fetchPost, fetchRelatedPosts, fetchNextPostBySameSectionAction }
