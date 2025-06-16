'use client'

import type { SHORTS_TYPE, Shorts } from '@/types/common'
import VideoBlock from '@/shared-components/shorts/video-block'

type Props = {
  items: Shorts[]
  videoSection: SHORTS_TYPE
}

export default function DataSourceWrapperForShortpage({ items }: Props) {
  return (
    <>
      <VideoBlock items={items} />
    </>
  )
}
