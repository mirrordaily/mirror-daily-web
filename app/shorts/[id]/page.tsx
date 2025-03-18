import ShortsLayout from '@/shared-components/shorts/layout'
import { notFound } from 'next/navigation'
import { LATEST_SHORT_PAGES, SITE_NAME } from '@/constants/misc'
import { fetchShortsByTagAndVideoSection, fetchShortsData } from './action'
import type { Metadata } from 'next'
import { getDefaultMetadata } from '@/utils/common'
import { getShortsPageUrl } from '@/utils/site-urls'

type PageProps = {
  params: { id?: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id = '' } = params
  const shortsData = await fetchShortsData(id)

  if (!shortsData) {
    notFound()
  }

  const defaultMetadata = getDefaultMetadata()

  const title = `${shortsData.name} - ${SITE_NAME}`

  const metaData = Object.assign(
    {},
    {
      ...defaultMetadata,
      title,
      openGraph: {
        ...(defaultMetadata.openGraph ?? {}),
        title,
        url: getShortsPageUrl(id),
      },
    }
  )

  return metaData
}

export default async function Page({ params }: PageProps) {
  const videoId = params.id ?? ''
  const shortsData = await fetchShortsData(videoId)

  if (!shortsData) notFound()

  const data = await fetchShortsByTagAndVideoSection(
    videoId,
    shortsData.tagId,
    shortsData.videoSection
  )

  return (
    <ShortsLayout
      tabLinks={LATEST_SHORT_PAGES}
      activeTab={shortsData.videoSection}
      items={data}
      shouldChangePathOnSlideChange={true}
    />
  )
}
