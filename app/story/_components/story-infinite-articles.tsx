'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { Post } from '@/types/story'
import { StoryScrollSpy } from './story-scroll-spy'
import ArticleSectionClient from './story-infinite-article-section-client'
import { fetchNextPostBySameSectionAction } from '../actions'
import { PopInRecommendWord, DableArticleBottomPC, PopInRecommend } from './ads'

const articleAds = [
  <PopInRecommend key="popin-recommend" />,
  <PopInRecommendWord key="popin-word" />,
  <DableArticleBottomPC key="dable-bottom" />,
]

export default function StoryInfiniteArticles({
  initialPost,
  maxFetch = 3,
}: {
  initialPost: Post
  maxFetch?: number
}) {
  const slug =
    initialPost.sections?.[1]?.slug || initialPost.sections?.[0]?.slug
  const [cursorPublishedDate, setCursorPublishedDate] = useState(
    initialPost.publishedDateRaw
  )
  const [posts, setPosts] = useState<Post[]>([])
  const [fetchCount, setFetchCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const articlesForSpy = useMemo(
    () => [
      { id: initialPost.id, title: initialPost.title },
      ...posts.map((p) => ({ id: p.id, title: p.title })),
    ],
    [initialPost.id, initialPost.title, posts]
  )

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
      <StoryScrollSpy articles={articlesForSpy} />

      {/* sentinel：滑到底時觸發下一篇 */}
      <div ref={sentinelRef} className="h-px w-full" />

      {posts.map((post, index) => {
        const AdComponent = articleAds[index]

        return (
          <ArticleSectionClient
            postData={post}
            key={post.id}
            AdComponent={AdComponent}
          />
        )
      })}
    </>
  )
}
