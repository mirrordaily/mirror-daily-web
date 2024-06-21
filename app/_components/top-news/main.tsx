'use client'
import { useState } from 'react'
import Selector from './selector'
import PostList from './post-list'

export const TAB = {
  Latest: '即時新聞',
  Hot: '熱門新聞',
} as const

export default function TopNewsMain() {
  const [tab, setTab] = useState<keyof typeof TAB>('Latest')

  return (
    <>
      <Selector selectedTab={tab} setTab={setTab} />
      <PostList />
    </>
  )
}
