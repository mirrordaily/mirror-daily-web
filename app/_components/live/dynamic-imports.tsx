'use client'

import dynamic from 'next/dynamic'

export const LatestVideoList = dynamic(() => import('./latest-video-list'), {
  ssr: false,
})

export const LiveSectionMain = dynamic(() => import('./main'), {
  ssr: false,
})
