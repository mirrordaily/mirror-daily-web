import ShortsLayout from '@/shared-components/shorts/layout'
import { notFound } from 'next/navigation'
import { LATEST_SHORT_PAGES } from '@/constants/misc'
import { fetchShortsByTagAndVideoSection, fetchShortsData } from './action'

type PageProps = {
  params: { id?: string }
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
