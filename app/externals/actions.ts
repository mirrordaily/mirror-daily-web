'use server'
import { fetchGQLData } from '@/utils/graphql'
import { createErrorLogger, getTraceObject } from '@/utils/log/common'
import {
  GetPartnerInformationDocument,
  GetExternalsByPartnerSlugDocument,
} from '@/graphql/__generated__/graphql'
import type {
  GetPartnerInformationQuery,
  GetExternalsByPartnerSlugQuery,
} from '@/graphql/__generated__/graphql'
import { getExternalPageUrl } from '@/utils/site-urls'
import { DEFAULT_SECTION_NAME, DEFAULT_SECTION_COLOR } from '@/constants/misc'
import type { External } from '@/types/externals'
import { toDisplayDateTimeInTaipei } from '@/utils/date'

function transformPartnerInformation(
  rawData: GetPartnerInformationQuery['partner']
): string | null {
  if (!rawData) return null

  const name = rawData.name ?? ''
  return name
}

async function fetchPartnerInformation(slug: string) {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching partner information (slug:${slug}) on externals page`,
    await getTraceObject()
  )

  const result = await fetchGQLData(
    errorLogger,
    GetPartnerInformationDocument,
    {
      slug,
    }
  )

  if (result) {
    const { partner } = result
    return transformPartnerInformation(partner)
  } else {
    return null
  }
}

function transformExternal(
  rawData: GetExternalsByPartnerSlugQuery['externals']
): External[] {
  if (!rawData) return []

  return rawData.map((rawExternal) => {
    const id = rawExternal.id
    const link = getExternalPageUrl(rawExternal.id)
    const title = rawExternal.title ?? ''
    const thumb = rawExternal.thumb ?? ''
    const publishedDate = toDisplayDateTimeInTaipei(
      rawExternal.publishedDate ?? ''
    )
    const textContent = rawExternal.brief ?? ''
    const sectionName = DEFAULT_SECTION_NAME
    const sectionColor = DEFAULT_SECTION_COLOR

    return {
      id,
      link,
      title,
      thumb,
      textContent,
      publishedDate,
      sectionName,
      sectionColor,
    }
  })
}

async function fetchExternals({
  slug,
  take,
  skip = 0,
  withAmount = false,
}: {
  slug: string
  take: number
  skip?: number
  withAmount?: boolean
}): Promise<{ posts: External[]; totalAmount?: number }> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching external posts by partner slug: ${slug} on externals page`,
    await getTraceObject()
  )

  const result = await fetchGQLData(
    errorLogger,
    GetExternalsByPartnerSlugDocument,
    {
      skip,
      take,
      slug,
      withAmount,
    }
  )
  if (!result) {
    return {
      posts: [],
      totalAmount: 0,
    }
  }
  const { externals } = result
  const posts = transformExternal(externals)
  if (typeof result.externalsCount === 'number') {
    return {
      posts,
      totalAmount: result.externalsCount,
    }
  } else {
    return {
      posts,
    }
  }
}

export { fetchPartnerInformation, fetchExternals }
