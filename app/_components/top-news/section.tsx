'use client'
import { useEffect, useState } from 'react'
import Selector from './selector'
import PostList from './post-list'
import type { ParameterOfComponent, SectionAndCategory } from '@/types/common'
import { fetchLiveEvent } from '@/app/actions'
import {
  fetchLatestPost,
  fetchPopularPost,
} from '@/utils/client-side-data-fetch'

export const TAB = {
  Latest: '即時新聞',
  Hot: '熱門新聞',
} as const

type Props = {
  sectionData: Pick<SectionAndCategory, 'slug' | 'color'>[]
}

type PostData = Record<
  keyof typeof TAB,
  ParameterOfComponent<typeof PostList>['list']
>

export default function TopNewsSection({ sectionData }: Props) {
  const [isInitialized, setIsInitialized] = useState(false)
  const [tab, setTab] = useState<keyof typeof TAB>('Latest')
  const [postData, setPostData] = useState<PostData>({
    Latest: [undefined],
    Hot: [undefined],
  })

  useEffect(() => {
    const initialize = async () => {
      const liveEvent = await fetchLiveEvent()
      const latestPosts = await fetchLatestPost(sectionData, 1)
      const popularPosts = await fetchPopularPost(sectionData)

      let latestList: PostData['Latest'] = [undefined]

      if (liveEvent) {
        latestList = [liveEvent, ...latestPosts.slice(0, 9)]
      } else {
        const first = latestPosts[0]

        if (first) {
          latestList = [
            {
              postName: first.postName,
              heroImage: first.heroImage,
              link: first.link,
            },
            ...latestPosts.slice(1, 10),
          ]
        }
      }

      let hotList: PostData['Hot'] = [undefined]

      {
        const first = popularPosts[0]

        if (first) {
          hotList = [
            {
              postName: first.postName,
              heroImage: first.heroImage,
              link: first.link,
            },
            ...popularPosts.slice(1, 10),
          ]
        }
      }

      setPostData({
        Latest: latestList,
        Hot: hotList,
      })

      setIsInitialized(true)
    }

    if (!isInitialized) {
      initialize()
    }
  }, [isInitialized, sectionData])

  const posts = postData[tab]

  return (
    <section className="section-in-homepage my-9 md:mt-6 lg:mb-[30px] lg:mt-7">
      <Selector selectedTab={tab} setTab={setTab} />
      <PostList key={tab} list={posts} />
    </section>
  )
}
