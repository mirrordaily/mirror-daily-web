import { SITE_NAME } from '@/constants/misc'
import type { Metadata } from 'next'
import { fetchTopicListingByPage } from './action'
import TopicList from './_components/topic-list'
import { PAGE_SIZE } from '@/constants/topic-list'
import { getTopicListingPage } from '@/utils/site-urls'
import { getDefaultMetadata } from '@/utils/common'
import { notFound } from 'next/navigation'

// add segment config to prevent data fetch during build
export const dynamic = 'force-dynamic'

const defaultMetadata = getDefaultMetadata()

const title = `專題 - ${SITE_NAME}`

// TODO: fill the blank
export const metadata: Metadata = Object.assign(
  {},
  {
    ...defaultMetadata,
    title,
    openGraph: {
      ...(defaultMetadata.openGraph ?? {}),
      title,
      url: getTopicListingPage(),
    },
  }
)

export default async function Page() {
  const { items, totalAmount = 0 } = await fetchTopicListingByPage({
    take: PAGE_SIZE,
    skip: 0,
    withAmount: true,
  })

  if (!totalAmount) notFound()

  const fetchMoreTopics = async (page: number) => {
    'use server'
    const { items } = await fetchTopicListingByPage({
      take: PAGE_SIZE,
      skip: PAGE_SIZE * (page - 1),
    })
    return items
  }

  return (
    <main className="mb-9 md:mb-[84px] lg:mb-[60px]">
      <h1 className="mb-8 mt-5 text-center text-[20px] font-bold leading-[100%] text-black lg:mt-[60px]">
        精選專題
      </h1>
      <TopicList
        totalAmount={totalAmount}
        initialList={items}
        fetchMoreItems={fetchMoreTopics}
      />
    </main>
  )
}
