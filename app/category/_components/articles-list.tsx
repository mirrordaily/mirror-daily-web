'use client'
import type { ReactElement } from 'react'
import MainArticleCard from '../../../shared-components/main-article-card'
import SecondaryArticleCard from '../../../shared-components/secondary-article-card'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import { fetchCategoryPosts } from '../actions'
import { notFound } from 'next/navigation'
import type { CategoryPost } from '@/types/category-page'

type Props = {
  initialPosts: CategoryPost[]
  slug: string
  color: string | undefined | null
  name: string | undefined | null
}

export default function ArticlesList({
  initialPosts,
  slug,
  color,
  name,
}: Props): ReactElement {
  const PAGE_SIZE = 12
  const [firstPost, ...otherPosts] = initialPosts ?? []

  const fetchMorePosts = async (page: number) => {
    const posts = await fetchCategoryPosts(page, slug)
    return posts
  }

  if (!firstPost) notFound()

  return (
    <div className="flex flex-col items-center">
      <div className="mb-5 w-full pl-[23px] pr-[22px] md:mb-7 md:px-0">
        <h1
          style={{ color: color || '#FF5A36' }}
          className="mb-3 text-xl font-bold leading-[1.3] lg:text-2xl"
        >
          {name}
        </h1>
        <hr
          style={{ borderColor: color || '#FF5A36' }}
          className="max-w-[342px] border-4 md:max-w-[670px] lg:max-w-[740px]"
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-10 md:mb-[50px]">
          <MainArticleCard color={color} postItem={firstPost} />
        </div>
        <div className="pl-[23px] pr-[22px] md:px-0">
          <div className="flex max-w-[330px] flex-col gap-y-5 md:max-w-[670px] md:gap-y-8 lg:max-w-[725px]">
            {otherPosts.length !== 0 && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
