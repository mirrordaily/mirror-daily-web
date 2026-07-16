'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Post } from '@/types/story'
import type { PopularNews } from '@/types/common'
import { StoryScrollSpy } from './story-scroll-spy'
import ArticleSectionClient from './story-infinite-article-section-client'
import { fetchNextPostBySameSectionAction } from '../actions'
import { DableWordSecond, PopInRecommendWord } from './ads'
import BottomAd from '@/shared-components/bottom-ad'
import SocialShareBar from '@/shared-components/social-share-bar'
import PreferredSourceIcon from '@/app/_components/preferred-source/preferred-source-icon'

const articleAds = [
  <PopInRecommendWord key="popin-word" />,
  <DableWordSecond key="dable-word-second" />,
  <BottomAd key="bottom-ad" />,
]

export default function StoryInfiniteArticles({
  initialPost,
  popularPosts,
  maxFetch = 3,
}: {
  initialPost: Post
  popularPosts: PopularNews[]
  maxFetch?: number
}) {
  const slug = initialPost.sections[1]?.slug || initialPost.sections[0]?.slug
  const [cursorPublishedDate, setCursorPublishedDate] = useState(
    initialPost.publishedDateRaw
  )
  const [posts, setPosts] = useState<Post[]>([])
  const [fetchCount, setFetchCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [activeArticleId, setActiveArticleId] = useState(initialPost.id)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const articlesForSpy = useMemo(
    () => [
      { id: initialPost.id, title: initialPost.title },
      ...posts.map((p) => ({ id: p.id, title: p.title })),
    ],
    [initialPost.id, initialPost.title, posts]
  )

  const activePost = posts.find((p) => p.id === activeArticleId) ?? initialPost

  useEffect(() => {
    if (!sentinelRef.current) return
    if (!slug) return
    if (!cursorPublishedDate) return
    if (fetchCount >= maxFetch) return

    const fetchNext = async () => {
      if (!slug) return
      if (!cursorPublishedDate) return
      if (isLoading) return
      if (fetchCount >= maxFetch) return

      setIsLoading(true)

      try {
        const nextPost = await fetchNextPostBySameSectionAction(
          initialPost.id,
          slug,
          cursorPublishedDate
        )

        if (!nextPost) {
          setFetchCount(maxFetch)
          return
        }

        setPosts((prev) => {
          if (prev.some((p) => p.id === nextPost.id)) return prev
          return [...prev, nextPost]
        })

        if (nextPost.publishedDateRaw) {
          setCursorPublishedDate(nextPost.publishedDateRaw)
        }

        setFetchCount((c) => c + 1)
      } finally {
        setIsLoading(false)
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return
        fetchNext()
      },
      { rootMargin: '400px' }
    )

    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [
    cursorPublishedDate,
    fetchCount,
    initialPost.id,
    isLoading,
    maxFetch,
    slug,
  ])

  return (
    <>
      <StoryScrollSpy
        articles={articlesForSpy}
        onActiveIdChange={setActiveArticleId}
      />

      {/* 分享按鈕 fixed 在 viewport 上，統一渲染一份，分享目前捲動到的文章 */}
      <div className="fixed bottom-[135px] right-3 z-story-share-bar space-y-2 [filter:drop-shadow(0px_1px_2px_#0000004D)_drop-shadow(0px_2px_8px_#0000001A)] md:hidden">
        <PreferredSourceIcon variant="mobile" />
        <SocialShareBar
          title={activePost.title}
          link={activePost.link}
          direction="vertical"
        />
      </div>

      {/* sentinel：滑到底時觸發下一篇 */}
      <div ref={sentinelRef} className="h-px w-full" />

      {posts.map((post, index) => {
        const AdComponent = articleAds[index]

        return (
          <ArticleSectionClient
            postData={post}
            key={post.id}
            AdComponent={AdComponent}
            popularPosts={popularPosts}
          />
        )
      })}
    </>
  )
}
