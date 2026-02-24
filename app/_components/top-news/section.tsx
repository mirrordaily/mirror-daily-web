'use client'
import { useEffect } from 'react'
import PostList from './post-list'
import type { HeaderData } from '@/types/common'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  selectIsInitialized,
  selectIsPopularInitialized,
  selectLatestPosts,
  selectPopularNews,
} from '@/redux/homepage/selector'
import { initializeData, fetchPopularNews } from '@/redux/homepage/slice'
import Loading from '../loading'

export const TOP_NEWS_LABELS = {
  Latest: '即時新聞',
  Hot: '熱門新聞',
} as const

type Props = {
  headerData: HeaderData[]
}

export default function TopNewsSection({ headerData }: Props) {
  const dispatch = useAppDispatch()
  const isInitialized = useAppSelector(selectIsInitialized)
  const isPopularInitialized = useAppSelector(selectIsPopularInitialized)
  const latestPosts = useAppSelector(selectLatestPosts)
  const popularNews = useAppSelector(selectPopularNews)

  const latestList = latestPosts.slice(0, 10)
  const hotList = popularNews.slice(0, 10)

  useEffect(() => {
    if (!isInitialized) {
      dispatch(initializeData(headerData))
    }
    if (!isPopularInitialized) {
      dispatch(fetchPopularNews(headerData))
    }
  }, [isInitialized, isPopularInitialized, dispatch, headerData])

  const isTopNewsReady = isInitialized && isPopularInitialized

  if (!isTopNewsReady)
    return (
      <div className="h-[80vh] w-full">
        <Loading />
      </div>
    )

  return (
    <section className="section-in-homepage mb-4 mt-7 md:mb-14 lg:mb-9">
      <div className="grid w-full grid-cols-1 gap-y-7 md:grid-cols-2 md:gap-x-2 md:gap-y-0 lg:gap-x-5">
        <div className="w-full">
          {!!latestList.length && (
            <p className="text-center text-lg font-bold leading-[1.2] text-mirror-blue-600 md:text-start lg:inline-block lg:rounded-lg lg:bg-mirror-blue-700 lg:px-2 lg:py-1 lg:text-xl lg:font-normal lg:text-white">
              {TOP_NEWS_LABELS.Latest}
            </p>
          )}
          <div className="mt-7 md:mt-5 md:border-r-[0.5px] md:border-r-primary-800 md:pr-2 lg:mt-4 lg:pr-5">
            <PostList list={latestList} tab="Latest" />
          </div>
        </div>
        <div className="w-full">
          {!!hotList.length && (
            <p className="text-center text-lg font-bold leading-[1.2] text-mirror-blue-600 md:text-start lg:inline-block lg:rounded-lg lg:bg-mirror-blue-700 lg:px-2 lg:py-1 lg:text-xl lg:font-normal lg:text-white">
              {TOP_NEWS_LABELS.Hot}
            </p>
          )}
          <div className="mt-7 md:mt-5 lg:mt-4">
            <PostList list={hotList} tab="Hot" />
          </div>
        </div>
      </div>
    </section>
  )
}
