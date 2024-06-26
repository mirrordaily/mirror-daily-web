'use client'
import { useState } from 'react'
import Selector from './selector'
import PostList from './post-list'
import type { ParameterOfComponent } from '@/types/common'

export const TAB = {
  Latest: '即時新聞',
  Hot: '熱門新聞',
} as const

type Props = {
  postsOfTab: Record<
    keyof typeof TAB,
    ParameterOfComponent<typeof PostList>['list']
  >
}

export default function TopNewsSection({ postsOfTab }: Props) {
  const [tab, setTab] = useState<keyof typeof TAB>('Latest')

  const posts = postsOfTab[tab]

  return (
    <section className="section-in-homepage my-9 md:mt-6 lg:mb-[30px] lg:mt-7">
      <Selector selectedTab={tab} setTab={setTab} />
      <PostList list={posts} />
    </section>
  )
}
