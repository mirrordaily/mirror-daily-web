import PopularNewsSection from '@/shared-components/popular-news-section'
import ArticlesList from '../_components/articles-list'
import { fetchSectionPosts, fetchSectionInformation } from '../action'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: { slug: string }
}): Promise<JSX.Element> {
  const slug = params.slug

  const sectionInfo = await fetchSectionInformation(slug)
  const posts = await fetchSectionPosts(1, slug)

  if (!sectionInfo) notFound()

  const color = sectionInfo.color
  const name = sectionInfo.name

  return (
    <main className="mb-10 flex flex-col items-center md:mb-[72px] md:pt-5 lg:mb-[100px] lg:flex-row lg:items-start lg:justify-center lg:gap-x-[128px]">
      <ArticlesList
        initialPosts={posts}
        slug={slug}
        color={color}
        name={name}
      />
      <hr className="my-10 hidden w-[670px] border border-[#000928] md:block lg:hidden" />
      <PopularNewsSection />
    </main>
  )
}
