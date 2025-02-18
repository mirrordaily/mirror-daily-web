'use server'

import { createErrorLogger } from '@/utils/log/common'
import { fetchGQLData } from '@/utils/graphql'
import type { GetTopicBasicInfoQuery } from '@/graphql/__generated__/graphql'
import { GetTopicBasicInfoDocument } from '@/graphql/__generated__/graphql'

async function fetchTopicBasicInfo(
  slug: string
): Promise<GetTopicBasicInfoQuery['topic']> {
  const errorLogger = createErrorLogger(
    `Error occurs while fetching topic basic info (slug: ${slug})`,
    {}
  )

  const result = await fetchGQLData(errorLogger, GetTopicBasicInfoDocument, {
    slug: slug,
  })

  if (result) {
    const { topic } = result
    return topic
  } else {
    return null
  }
}

export { fetchTopicBasicInfo }
