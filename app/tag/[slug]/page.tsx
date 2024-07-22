import ArticlesSection from '../_components/articles-section'
import PopularNewsSection from '@/shared-components/popular-news-section'
import { fetchTagInformation, fetchTagPosts } from '../actions'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: { slug: string }
}): Promise<JSX.Element> {
  const slug = params.slug

  const tagInfo = await fetchTagInformation(slug)
  if (!tagInfo) notFound()
  const posts = await fetchTagPosts(1, slug)
  if (posts.length === 0) notFound()

  return (
    <main className="flex flex-col items-center pl-[17px] pr-[18px] md:mb-[68px] md:pt-3 lg:flex-row lg:items-start lg:justify-center lg:gap-x-[100px] lg:pt-5">
      <ArticlesSection info={tagInfo} initialList={posts} slug={slug} />
      <PopularNewsSection />
    </main>
  )
}
