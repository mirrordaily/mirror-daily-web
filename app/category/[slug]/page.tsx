import { notFound } from 'next/navigation'
import { fetchCategoryPosts, fetchCategoryInformation } from '../actions'
import ArticlesList from '../../../shared-components/articles-list'
import PopularNewsSection from '@/shared-components/popular-news-section'

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug

  const categoryInfo = await fetchCategoryInformation(slug)
  const posts = await fetchCategoryPosts(1, slug)

  if (!categoryInfo) notFound()

  const color = categoryInfo.color
  const name = categoryInfo.name

  return (
    <main className="mb-10 flex flex-col items-center md:mb-[72px] md:pt-5 lg:mb-[100px] lg:flex-row lg:items-start lg:justify-center lg:gap-x-[128px]">
      <ArticlesList
        initialPosts={posts}
        slug={slug}
        color={color}
        name={name}
        fetchPosts={fetchCategoryPosts}
      />
      <hr className="my-10 hidden w-[670px] border border-[#000928] md:block lg:hidden" />
      <PopularNewsSection />
    </main>
  )
}
