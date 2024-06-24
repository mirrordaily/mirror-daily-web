'use client'
import type { LatestPost } from '@/types/homepage'
import { useState } from 'react'
import Selector from './selector'
import PostList from './post-list'

export const TAB = {
  Latest: '即時新聞',
  Hot: '熱門新聞',
} as const

type Props = {
  postsOfTab: Record<keyof typeof TAB, LatestPost[]>
}

export default function TopNewsMain({ postsOfTab }: Props) {
  const [tab, setTab] = useState<keyof typeof TAB>('Latest')

  const posts = postsOfTab[tab]

  return (
    <>
      <Selector selectedTab={tab} setTab={setTab} />
      <PostList list={posts} />
    </>
  )
}
