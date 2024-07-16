'use server'

import type { SectionAndCategory } from '@/types/homepage'
import type { ZodArray } from 'zod'
import { z } from 'zod'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import { createDataFetchingChain } from '@/utils/data-process'
import { fetchGQLData } from '@/utils/graphql'
import { sectionSchema } from '@/utils/data-schema'
import { URL_STATIC_SECTION_AND_CATEGORY } from '@/constants/config'
import { GetSectionsAndCategoriesDocument } from '@/graphql/__generated__/graphql'

const transformRawSectionsAndCategories = (
  rawData: z.infer<ZodArray<typeof sectionSchema>>
): SectionAndCategory[] => {
  if (!rawData) return []

  return rawData.map((rawSection) => {
    const name = rawSection.name ?? ''
    const slug = rawSection.slug ?? ''
    const color = rawSection.color ?? ''
    const categories = (rawSection.categories ?? []).map((rawCategory) => {
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
    }
  })
}

export const fetchSectionsAndCategories = async (): Promise<
  SectionAndCategory[]
> => {
  const errorLogger = createErrorLogger(
    'Error occurs while fetching sections and categories',
    getTraceObject()
  )
  const schema = z.promise(z.object({ sections: z.array(sectionSchema) }))

  const data = await createDataFetchingChain<
    z.infer<ZodArray<typeof sectionSchema>>
  >(
    errorLogger,
    [],
    async () => {
      const resp = await fetch(URL_STATIC_SECTION_AND_CATEGORY, {
        next: { revalidate: 0 },
      })

      const result = await schema.parse(resp.json())
      return result.sections
    },
    async () => {
      const result = await schema.parse(
        fetchGQLData(errorLogger, GetSectionsAndCategoriesDocument)
      )
      return result.sections
    }
  )

  return transformRawSectionsAndCategories(data)
}
