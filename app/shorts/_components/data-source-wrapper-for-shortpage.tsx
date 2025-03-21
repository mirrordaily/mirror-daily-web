'use client'

import type { SHORTS_TYPE, Shorts } from '@/types/common'
import VideoBlock from '@/shared-components/shorts/video-block'
import { fetchShortsForShortpage } from '@/utils/client-side-data-fetch'

type Props = {
  items: Shorts[]
  videoSection: SHORTS_TYPE
}

export default function DataSourceWrapperForShortpage({
  items,
  videoSection,
}: Props) {
  return (
    <>
      <VideoBlock
        items={items}
        fetchMore={async (page: number) => {
          return await fetchShortsForShortpage(videoSection, page)
        }}
      />
    </>
  )
}
