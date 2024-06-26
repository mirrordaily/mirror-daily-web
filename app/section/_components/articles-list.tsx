'use client'
import type { ReactElement } from 'react'
import MainArticleCard from './main-article-card'
import SecondaryArticleCard from './secondary-article-card'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import { fetchSectionPosts } from '../action'
import type { Posts } from '@/types/section'
import { notFound } from 'next/navigation'

type SectionColors = {
  [key: string]: { border: string; bg: string; color: string }
}

const sectionColors: SectionColors = {
  fight: {
    border: 'border-[#B867B9]',
    bg: 'bg-[#B867B9]',
    color: 'text-[#B867B9]',
  },
  art: {
    border: 'border-[#FF800A]',
    bg: 'bg-[#FF800A]',
    color: 'text-[#FF800A]',
  },
  weird: {
    border: 'border-[#6DB01E]',
    bg: 'bg-[#6DB01E]',
    color: 'text-[#6DB01E]',
  },
  food: {
    border: 'border-[#01D3F0]',
    bg: 'bg-[#01D3F0]',
    color: 'text-[#01D3F0]',
  },
  health: {
    border: 'border-[#03C121]',
    bg: 'bg-[#03C121]',
    color: 'text-[#03C121]',
  },
  short: {
    border: 'border-[#FF69BA]',
    bg: 'bg-[#FF69BA]',
    color: 'text-[#FF69BA]',
  },
  test: {
    border: 'border-[#FF5A36]',
    bg: 'bg-[#FF5A36]',
    color: 'text-[#FF5A36]',
  },
}

type Props = {
  initialPosts: Posts | null
  slug: string
}
/* TODO:
  1. change section name
 */
export default function ArticlesList({
  initialPosts,
  slug,
}: Props): ReactElement {
  const PAGE_SIZE = 12
  const [firstPost, ...otherPosts] = initialPosts ?? []

  const fetchMorePosts = async (page: number) => {
    const posts = await fetchSectionPosts(page, slug)
    return posts || []
  }

  const colors = sectionColors[slug]

  if (!firstPost) notFound()

  return (
    <div className="flex flex-col items-center">
      <div className="mb-5 md:mb-7">
        <h1 className="mb-3 text-xl font-bold leading-[1.3] lg:text-2xl">
          section name
        </h1>
        <hr
          className={`w-[342px] border-4 ${colors?.border} md:w-[670px] lg:w-[740px]`}
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="mb-10 md:mb-[50px]">
          <MainArticleCard postItem={firstPost} colors={colors} />
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
                  postItem={post}
                  colors={colors}
                />
              ))
            }
          </InfiniteScrollList>
        </div>
      </div>
    </div>
  )
}
