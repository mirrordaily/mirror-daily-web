import { notFound } from 'next/navigation'
import { fetchCategoryPosts, fetchCategoryInformation } from '../action'
import ArticlesList from '../_components/articles-list'
import PopularNewsSection from '@/shared-components/popular-news-section'

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug

  const category = await fetchCategoryInformation(slug)
  const posts = await fetchCategoryPosts(1, slug)
  console.log(category)

  if (!category) notFound()

  const color = category.sections?.[0]?.color
  const name = category.name

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
