import 'server-only'
import { MINUTE } from '@/constants/time-unit'
import type { ZodArray } from 'zod'
import { z } from 'zod'
import { sectionSchema } from './data-schema'
import type { SectionAndCategory } from '@/types/common'
import { createErrorLogger, getTraceObject } from './log/common'
import { createDataFetchingChain } from './data-process'
import { URL_STATIC_SECTION_AND_CATEGORY } from '@/constants/config'
import { fetchGQLData } from './graphql'
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
      const resp = await fetch(URL_STATIC_SECTION_AND_CATEGORY)

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

class SectionColorManager {
  private lastTime = 0
  private cacheTime = MINUTE * 5
  private defaultColor = '#D0D2D8'
  private data: Awaited<ReturnType<typeof fetchSectionsAndCategories>>

  constructor() {
    this.data = []
    this.updateData()
  }

  async updateData() {
    const result = await fetchSectionsAndCategories()
    this.lastTime = new Date().valueOf()
    this.data = result
  }

  async getColor(sectionSlug?: string): Promise<string> {
    if (!sectionSlug) return this.defaultColor

    const now = new Date().valueOf()

    if (now - this.lastTime > this.cacheTime) {
      await this.updateData()
    }

    return (
      this.data.find((item) => sectionSlug === item.slug)?.color ??
      this.defaultColor
    )
  }
}

export const colorManger = new SectionColorManager()
