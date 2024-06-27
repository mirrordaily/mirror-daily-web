'use client'
import type { ReactElement } from 'react'
import MainArticleCard from './main-article-card'
import SecondaryArticleCard from './secondary-article-card'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import { fetchSectionPosts } from '../action'
import type { Posts } from '@/types/section'
import { notFound } from 'next/navigation'

type Props = {
  initialPosts: Posts | null
  slug: string
  color: string | undefined | null
}
/* TODO:
  1. change section name
 */
export default function ArticlesList({
  initialPosts,
  slug,
  color,
}: Props): ReactElement {
  const PAGE_SIZE = 12
  const [firstPost, ...otherPosts] = initialPosts ?? []

  const fetchMorePosts = async (page: number) => {
    const posts = await fetchSectionPosts(page, slug)
    return posts || []
  }

  // const colors = sectionColors[slug]
  if (!firstPost) notFound()

  return (
    <div className="flex flex-col items-center">
      <div className="mb-5 md:mb-7">
        <h1
          style={{ color: color || '#FF5A36' }}
          className="mb-3 text-xl font-bold leading-[1.3] lg:text-2xl"
        >
          section name
        </h1>
        <hr className={`w-[342px] border-4 md:w-[670px] lg:w-[740px]`} />
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-10 md:mb-[50px]">
          <MainArticleCard color={color} postItem={firstPost} />
        </div>
        <div className="flex w-[330px] flex-col gap-y-5 md:w-[670px] md:gap-y-8 lg:w-[725px]">
          <InfiniteScrollList
            initialList={otherPosts}
            pageSize={PAGE_SIZE}
            fetchListInPage={fetchMorePosts}
            isAutoFetch={false}
            loader={
              <div className="mt-4 flex justify-center md:mt-12">
                <button className="h-9 rounded border-[1.5px] px-[33px] py-[4.5px] text-lg font-bold leading-[1.3] text-[#7F8493] hover-or-active:border-[#119CC7] hover-or-active:text-[#119CC7]">
                  看更多
                </button>
              </div>
            }
          >
            {(posts) =>
              posts.map((post) => (
                <SecondaryArticleCard
                  key={post.title}
                  color={color}
                  postItem={post}
                />
              ))
            }
          </InfiniteScrollList>
        </div>
      </div>
    </div>
  )
}
