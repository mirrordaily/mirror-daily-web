'use server'

import type {
  HeaderData,
  LatestVideos,
  PopularNews,
  Shorts,
} from '@/types/common'
import { LATEST_VIDEOS_TYPE, SHORTS_TYPE } from '@/types/common'
import { z } from 'zod'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import {
  createDataFetchingChain,
  transformLatestShorts,
  transformLatestVideos,
} from '@/utils/data-process'
import { fetchGQLData, updateGQLData } from '@/utils/graphql'
import {
  latestShortsSchema,
  rawPopularPostSchema,
  rawLatestPostSchema,
  headerSchema,
  graphqlVideosSchema,
  jsonVideosSchema,
} from '@/utils/data-schema'
import {
  STATIC_JSON_LATEST_SHORTS,
  STATIC_JSON_LATEST_VIDEOS,
  STATIC_JSON_POPULAR_NEWS,
  STATIC_JSON_LATEST_NEWS,
  STATIC_JSON_HEADER,
} from '@/constants/config'
import { readStaticJson } from '@/utils/read-static-json'
import {
  CreateCreativityShortsDocument,
  CreateShortsPreviewDocument,
  GetLatestShortsDocument,
  GetLatestVideosDocument,
} from '@/graphql/__generated__/graphql'
import type { LatestPost } from '@/types/common'
import {
  AVAILABLE_IMAGE_MIME_TYPE,
  AVAILABLE_VIDEO_MIME_TYPE,
  MAX_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
} from '@/constants/multimedia'
import type { FormActionResponse } from '@/types/shorts'
import { FormState } from '@/types/shorts'
import {
  hasExternalLink,
  transformRawLatestPost,
  transformRawPopularPost,
} from '@/utils/post'
import { cache } from 'react'
import { hiddenPopularPostIds } from '@/constants/popular-post'

export const fetchLatestPost = async (
  page: number = 1
): Promise<LatestPost[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching latest posts',
    await getTraceObject()
  )

  try {
    const rawPostData = await readStaticJson<{ latest?: unknown }>(
      `${STATIC_JSON_LATEST_NEWS}0${page}.json`
    )

    const latestPosts = z.array(rawLatestPostSchema).parse(rawPostData?.latest)
    const filteredData = latestPosts.filter(
      (rawPost) => !hasExternalLink(rawPost)
    )

    const headerData = await fetchHeaderData()
    return filteredData.map((item) => transformRawLatestPost(item, headerData))
  } catch (e) {
    errorLogger(e)
    return []
  }
}

export const fetchPopularPost = async (
  amount: number = 10
): Promise<PopularNews[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching popular posts',
    await getTraceObject()
  )

  try {
    const jsonData = await readStaticJson(STATIC_JSON_POPULAR_NEWS)
    const rawPostData = z.array(rawPopularPostSchema).parse(jsonData)

    const headerData = await fetchHeaderData()

    return rawPostData
      .filter((item) => !hiddenPopularPostIds.includes(item.id))
      .map((item) => transformRawPopularPost(item, headerData))
      .slice(0, amount)
  } catch (e) {
    errorLogger(e)
    return []
  }
}

export const fetchLatestShorts = async (
  type: SHORTS_TYPE,
  amount: number = 10,
  start: number = 0
): Promise<Shorts[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching latest shorts',
    await getTraceObject()
  )

  const originalSchema = z.object({
    [SHORTS_TYPE.NEWS]: z.array(latestShortsSchema),
    [SHORTS_TYPE.DERIVATIVE]: z.array(latestShortsSchema),
  })
  const data = await createDataFetchingChain<z.infer<typeof originalSchema>>(
    errorLogger,
    {
      [SHORTS_TYPE.NEWS]: [],
      [SHORTS_TYPE.DERIVATIVE]: [],
    },
    async () => {
      const jsonData = await readStaticJson(STATIC_JSON_LATEST_SHORTS)
      const result = originalSchema.parse(jsonData)
      return result
    },
    async () => {
      const result = await fetchGQLData(errorLogger, GetLatestShortsDocument, {
        amount,
        start,
      })
      return originalSchema.parse(result)
    }
  )
  const matchedData = data[type].slice(start, amount)
  return matchedData.map(transformLatestShorts)
}

export const fetchLatestVideos = async (
  type: LATEST_VIDEOS_TYPE,
  amount: number = 10,
  start: number = 0
): Promise<LatestVideos[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching latest videos',
    await getTraceObject()
  )

  const originalSchema = z.object({
    [LATEST_VIDEOS_TYPE.NEWS]: z.array(graphqlVideosSchema),
    [LATEST_VIDEOS_TYPE.CREATIVITY]: z.array(graphqlVideosSchema),
  })
  const jsonOriginalSchema = z.object({
    [LATEST_VIDEOS_TYPE.NEWS]: z.array(jsonVideosSchema),
  })

  const data = await createDataFetchingChain<z.infer<typeof originalSchema>>(
    errorLogger,
    {
      [LATEST_VIDEOS_TYPE.NEWS]: [],
      [LATEST_VIDEOS_TYPE.CREATIVITY]: [],
    },
    async () => {
      const jsonData = await readStaticJson(STATIC_JSON_LATEST_VIDEOS)
      const parseResult = jsonOriginalSchema.safeParse(jsonData)
      if (!parseResult.success) {
        console.error('JSON Schema Validation Failed:', {
          errors: parseResult.error.flatten(),
          receivedData: jsonData,
          expectedSchema: 'jsonOriginal schema',
        })
        errorLogger(parseResult.error)
        return {
          [LATEST_VIDEOS_TYPE.NEWS]: [],
          [LATEST_VIDEOS_TYPE.CREATIVITY]: [],
        }
      }

      const transformedNewsData = parseResult.data[LATEST_VIDEOS_TYPE.NEWS].map(
        (item) => ({
          ...item,
          heroImage:
            typeof item.heroImage === 'string'
              ? { resized: { original: item.heroImage } }
              : item.heroImage,
        })
      )

      return {
        [LATEST_VIDEOS_TYPE.NEWS]: transformedNewsData,
        [LATEST_VIDEOS_TYPE.CREATIVITY]: [],
      }
    },
    async () => {
      const result = await fetchGQLData(errorLogger, GetLatestVideosDocument, {
        amount,
        start,
      })
      const parseResult = originalSchema.safeParse(result)
      if (!parseResult.success) {
        errorLogger(parseResult.error)
        return {
          [LATEST_VIDEOS_TYPE.NEWS]: [],
          [LATEST_VIDEOS_TYPE.CREATIVITY]: [],
        }
      }
      return parseResult.data
    }
  )
  const matchedData = data[type].slice(start, amount)
  return matchedData.map(transformLatestVideos)
}

export const createCreativityShorts = async (
  formData: FormData
): Promise<FormActionResponse> => {
  const errorLogger = createErrorLogger(
    'Error occurs while creating creativity shorts',
    await getTraceObject()
  )

  /** File is not available in Node.js 18 environment, so we need to create schema to validate it */
  const fileSchema = z.custom<File>(
    (val) =>
      typeof val === 'object' &&
      'type' in val &&
      typeof val['type'] === 'string' &&
      'size' in val &&
      typeof val['size'] === 'number',
    {
      message: 'input is not a file',
    }
  )

  const dataSchema = z.object({
    shorts: fileSchema
      .refine((file) => AVAILABLE_VIDEO_MIME_TYPE.includes(file.type), {
        message: 'shorts is not valid type',
      })
      .refine((file) => file.size <= MAX_VIDEO_SIZE, {
        message: 'shorts is over size limit',
      }),
    preview: fileSchema
      .refine((file) => AVAILABLE_IMAGE_MIME_TYPE.includes(file.type), {
        message: 'preview image is not valid type',
      })
      .refine((file) => file.size <= MAX_IMAGE_SIZE, {
        message: 'preview image is over size limit',
      }),
    title: z.string().min(1),
    description: z.string().nullish(),
    user: z.string().nullish(),
    email: z.string().email(),
    tos: z.literal('on'),
    copyright: z.literal('on'),
  })

  const formKeys = Object.keys(dataSchema.shape)
  const rawFormData = formKeys.reduce((data: Record<string, unknown>, key) => {
    data[key] = formData.get(key)
    return data
  }, {})

  const { success, data, error } = dataSchema.safeParse(rawFormData)

  if (!success) {
    const errors = error.flatten().fieldErrors
    errorLogger(error)

    return {
      state: FormState.Fail,
      errors: errors,
    }
  }

  let imageId: string = ''

  {
    const result = await updateGQLData(
      errorLogger,
      CreateShortsPreviewDocument,
      {
        name: data.preview.name,
        file: data.preview,
      }
    )

    if (result && result.photo) {
      imageId = result.photo?.id
    } else {
      return {
        state: FormState.Fail,
        errors: {
          misc: ['Create preview image failed.'],
        },
      }
    }
  }

  {
    const result = await updateGQLData(
      errorLogger,
      CreateCreativityShortsDocument,
      {
        title: data.title,
        photoId: imageId,
        file: data.shorts,
        author: data.user,
        authorEmail: data.email,
        description: data.description,
      }
    )

    if (!(result && result.shorts)) {
      return {
        state: FormState.Fail,
        errors: {
          misc: ['Create creativity shorts failed.'],
        },
      }
    } else {
      return {
        state: FormState.Success,
      }
    }
  }
}

const transformHeaderData = (
  rawData: z.infer<typeof headerSchema>
): HeaderData[] => {
  if (!rawData) return []

  return rawData.map((item) => {
    if (item.type === 'Topic') {
      const name = item.name ?? ''
      const slug = item.slug ?? ''

      return {
        name,
        slug,
        type: item.type,
      }
    } else {
      const name = item.name ?? ''
      const slug = item.slug ?? ''
      const color = item.color ?? ''
      const categories = (item.categories ?? []).map((rawCategory) => {
        const name = rawCategory.name ?? ''
        const slug = rawCategory.slug ?? ''

        return {
          name,
          slug,
          color,
        }
      })

      return {
        name,
        slug,
        color,
        categories,
        type: item.type ?? 'Section',
      }
    }
  })
}

export const fetchHeaderData = cache(async (): Promise<HeaderData[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching header json',
    await getTraceObject()
  )
  const data = await createDataFetchingChain<z.infer<typeof headerSchema>>(
    errorLogger,
    [],
    async () => {
      const jsonData = await readStaticJson(STATIC_JSON_HEADER)
      const result = headerSchema.parse(jsonData)
      return result
    }
  )

  return transformHeaderData(data)
})
