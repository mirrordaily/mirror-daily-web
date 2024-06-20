import PopularNewsSection from '@/shared-components/popular-news-section'
import ArticlesList from '../_components/articles-list'
import { fetchSectionPosts } from '../_components/action'

export default async function Page({
  params,
}: {
  params: { slug: string }
}): Promise<JSX.Element> {
  const current = 1
  const INITIAL_POSTS = 13
  const slug = params.slug

  const posts = await fetchSectionPosts(current, INITIAL_POSTS, slug)

  return (
    <main className="mb-10 flex flex-col items-center md:mb-[72px] lg:mb-[100px] lg:flex-row lg:items-start lg:justify-center lg:gap-x-[128px]">
      <ArticlesList initialPosts={posts} slug={slug} />
      <hr className="my-10 hidden w-[670px] border border-[#000928] md:block lg:hidden" />
      <PopularNewsSection />
    </main>
  )
}
