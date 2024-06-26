import PopularNewsSection from '@/shared-components/popular-news-section'
import ArticlesList from '../_components/articles-list'
import { fetchSectionPosts, fetchSectionsSlugAndName } from '../action'

export default async function Page({
  params,
}: {
  params: { slug: string }
}): Promise<JSX.Element> {
  const slug = params.slug

  const sections = await fetchSectionsSlugAndName(0)
  const posts = await fetchSectionPosts(1, slug)

  const IsSectionExist = sections?.some((section) => section.slug === slug)
  //TODO: redirect to a 404 page
  return (
    <main className="mb-10 flex flex-col items-center md:mb-[72px] lg:mb-[100px] lg:flex-row lg:items-start lg:justify-center lg:gap-x-[128px]">
      {IsSectionExist ? (
        <ArticlesList initialPosts={posts} slug={slug} />
      ) : (
        <p>Page not found</p>
      )}

      <hr className="my-10 hidden w-[670px] border border-[#000928] md:block lg:hidden" />
      <PopularNewsSection />
    </main>
  )
}
