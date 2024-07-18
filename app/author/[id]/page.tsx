import ArticlesSection from '../_components/articles-section'
import { fetchAuthorPosts, fetchAuthorInformation } from '../actions'
import { notFound } from 'next/navigation'
import PopularNewsSection from '@/shared-components/popular-news-section'

export default async function Home({ params }: { params: { id: string } }) {
  const id = params.id

  const authorInfo = await fetchAuthorInformation(id)
  if (!authorInfo) notFound()
  const posts = await fetchAuthorPosts(1, id)
  if (posts.length == 0) notFound()

  return (
    <main className="flex flex-col items-center pl-[17px] pr-[18px] md:mb-[68px] md:pt-3 lg:flex-row lg:items-start lg:justify-center lg:gap-x-[100px] lg:pt-5">
      <ArticlesSection info={authorInfo} initialList={posts} id={id} />
      <PopularNewsSection />
    </main>
  )
}
