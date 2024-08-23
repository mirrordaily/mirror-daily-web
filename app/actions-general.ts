'use server'

import type { PopularNews, Shorts } from '@/types/common'
import { SHORTS_TYPE } from '@/types/common'
import { z } from 'zod'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import {
  createDataFetchingChain,
  getHeroImage,
  transformLatestShorts,
} from '@/utils/data-process'
import { fetchGQLData, updateGQLData } from '@/utils/graphql'
import { latestShortsSchema, rawPopularPostSchema } from '@/utils/data-schema'
import {
  URL_STATIC_LATEST_SHORTS,
  URL_STATIC_POPULAR_NEWS,
} from '@/constants/config'
import {
  CreateCreativityShortsDocument,
  CreateShortsPreviewDocument,
  GetLatestShortsDocument,
} from '@/graphql/__generated__/graphql'
import type { LatestPost } from '@/types/homepage'
import { getPostPageUrl } from '@/utils/site-urls'
import { colorManger } from '@/utils/section-color-manager'
import {
  AVAILABLE_IMAGE_MIME_TYPE,
  AVAILABLE_VIDEO_MIME_TYPE,
  MAX_IMAGE_SIZE,
  MAX_VIDEO_SIZE,
} from '@/constants/multimedia'
import type { FormActionResponse } from '@/types/shorts'
import { FormState } from '@/types/shorts'
import { fetchSectionsAndCategories } from '@/utils/section-color-manager'

export { fetchSectionsAndCategories }

const transformRawPopularPost = async (
  rawPosts: z.infer<typeof rawPopularPostSchema>
): Promise<LatestPost> => {
  const { title, slug, heroImage, sectionsInInputOrder: sections } = rawPosts
  const color = await colorManger.getColor(sections[0]?.slug)

  return {
    // TODO: switch to category name
    categoryName: sections[0]?.name ?? '',
    categoryColor: color,
    postName: title,
    postSlug: slug,
    heroImage: getHeroImage(heroImage),
    publishedDate: new Date().toISOString(),
    link: getPostPageUrl(slug),
  }
}

export const fetchPopularPost = async (
  amount: number = 10
): Promise<PopularNews[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching popular posts',
    getTraceObject()
  )

  try {
    const resp = await fetch(URL_STATIC_POPULAR_NEWS)

    const rawPostData = await z
      .promise(z.array(rawPopularPostSchema))
      .parse(resp.json())

    const result = await Promise.allSettled(
      rawPostData.map(transformRawPopularPost)
    )
    return result
      .filter(
        (r): r is PromiseFulfilledResult<LatestPost> => r.status === 'fulfilled'
      )
      .map((r) => r.value)
      .slice(0, amount)
  } catch (e) {
    errorLogger(e)
    return []
  }
}

export const fetchLatestShorts = async (
  type: SHORTS_TYPE,
  amount: number = 10
): Promise<Shorts[]> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching latest shorts',
    getTraceObject()
  )

  const orignal = z.object({
    [SHORTS_TYPE.NEWS]: z.array(latestShortsSchema),
    [SHORTS_TYPE.DERIVATIVE]: z.array(latestShortsSchema),
  })
  const schema = z.promise(orignal)

  const data = await createDataFetchingChain<z.infer<typeof orignal>>(
    errorLogger,
    {
      [SHORTS_TYPE.NEWS]: [],
      [SHORTS_TYPE.DERIVATIVE]: [],
    },
    async () => {
      const resp = await fetch(URL_STATIC_LATEST_SHORTS)

      const result = await schema.parse(resp.json())
      return result
    },
    async () => {
      const result = await schema.parse(
        fetchGQLData(errorLogger, GetLatestShortsDocument, { amount })
      )
      return result
    }
  )

  const matchedData = data[type].slice(0, 10)
  return matchedData.map(transformLatestShorts)
}

export const createCreativityShorts = async (
  formData: FormData
): Promise<FormActionResponse> => {
  const errorLogger = createErrorLogger(
    'Error occurs while creating creativity shorts',
    getTraceObject()
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
    // TODO: add description and author
    const result = await updateGQLData(
      errorLogger,
      CreateCreativityShortsDocument,
      {
        title: data.title,
        photoId: imageId,
        file: data.shorts,
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
