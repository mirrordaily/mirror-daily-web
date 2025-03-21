import ShortsLayout from '@/shared-components/shorts/layout'
import { SHORTS_TYPE } from '@/types/common'
import { notFound } from 'next/navigation'
import { LATEST_SHORT_PAGES, SITE_NAME } from '@/constants/misc'
import type { Metadata } from 'next'
import { getDefaultMetadata } from '@/utils/common'
import { fetchShortsForShortpage } from '@/utils/client-side-data-fetch'
import DataSourceWrapperForShortpage from '../_components/data-source-wrapper-for-shortpage'

// add segment config to prevent data fetch during build
export const dynamic = 'force-dynamic'

const defaultMetadata = getDefaultMetadata()

const title = `短影音–新聞 - ${SITE_NAME}`

export const metadata: Metadata = Object.assign(
  {},
  {
    ...defaultMetadata,
    title,
    openGraph: {
      ...(defaultMetadata.openGraph ?? {}),
      title,
      url: LATEST_SHORT_PAGES.news,
    },
  }
)

export default async function Page() {
  const data = await fetchShortsForShortpage(SHORTS_TYPE.NEWS, 1)

  if (!data) notFound()

  return (
    <ShortsLayout tabLinks={LATEST_SHORT_PAGES} activeTab={SHORTS_TYPE.NEWS}>
      <DataSourceWrapperForShortpage
        items={data}
        videoSection={SHORTS_TYPE.NEWS}
      />
    </ShortsLayout>
  )
}
