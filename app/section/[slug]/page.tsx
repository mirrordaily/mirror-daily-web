import PopularNewsSection from '@/shared-components/popular-news-section'
import ArticlesList from '../_components/articles-list'
import { fetchSectionPosts, fetchSectionsSlugAndName } from '../action'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: { slug: string }
}): Promise<JSX.Element> {
  const slug = params.slug

  const sections = await fetchSectionsSlugAndName(0)
  const posts = await fetchSectionPosts(1, slug)

  const color = sections && sections?.find((item) => slug === item.slug)?.color

  const name = sections && sections?.find((item) => slug === item.slug)?.name

  const IsSectionExist = sections?.some((section) => section.slug === slug)

  if (!IsSectionExist) notFound()

  return (
    <main className="mb-10 flex flex-col items-center md:mb-[72px] lg:mb-[100px] lg:flex-row lg:items-start lg:justify-center lg:gap-x-[128px]">
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
