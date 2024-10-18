import { notFound } from 'next/navigation'
import { fetchPost } from '../actions'
import ArticleSection from '../_components/article-section'

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug

  const postData = await fetchPost(slug)
  if (!postData) notFound()

  return (
    <main className="flex flex-col items-center">
      <hr className="hidden w-[680px] border border-[#000000] md:mb-9 md:block lg:mb-12 lg:mt-4 lg:w-[1128px]" />
      <ArticleSection {...postData} slug={slug} />
    </main>
  )
}
