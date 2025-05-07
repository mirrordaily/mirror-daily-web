import { fetchPartnerInformation, fetchExternals } from '../actions'
import ArticleSection from '../_components/articles-section'
import PopularNewsSection from '@/shared-components/popular-news-section'
import { notFound } from 'next/navigation'

const PAGE_SIZE = 12

type Props = {
  params: {
    slug: string
  }
}
export default async function Page({ params }: Props) {
  const { slug } = params
  const partnerName = await fetchPartnerInformation(slug)
  if (!partnerName) notFound()

  const { posts, totalAmount = 0 } = await fetchExternals({
    take: PAGE_SIZE,
    slug,
    skip: 0,
    withAmount: true,
  })
  if (!totalAmount) notFound()

  const fetchMoreExternals = async (page: number) => {
    'use server'
    const { posts } = await fetchExternals({
      slug,
      take: PAGE_SIZE,
      skip: PAGE_SIZE * (page - 1),
    })
    return posts
  }

  return (
    <main className="flex flex-col items-center pl-[17px] pr-[18px] md:mb-[68px] md:pt-3 lg:flex-row lg:items-start lg:justify-center lg:gap-x-[100px] lg:pt-5">
      <ArticleSection
        partnerName={partnerName}
        initialList={posts}
        fetchMorePosts={fetchMoreExternals}
        totalAmount={totalAmount}
      />
      <PopularNewsSection />
    </main>
  )
}
