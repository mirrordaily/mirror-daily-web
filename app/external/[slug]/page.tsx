import { notFound } from 'next/navigation'
import { fetchExternal, fetchRelatedPosts } from '../action'
import ArticleIntro from './components/article-intro'
import Article from './components/article'
import RelatedNewsList from './components/related-news-list'
import { fetchPopularPost, fetchLatestPost } from '@/app/actions-general'
import FeatureNewsList from './components/feature-news-list'

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug
  const externalPost = await fetchExternal(slug)
  const relatedPosts = await fetchRelatedPosts(slug)
  const popularPosts = await fetchPopularPost(6)
  const latestPosts = (await fetchLatestPost(0)).slice(0, 6)

  if (!externalPost) notFound()

  const { brief, content, ...intro } = externalPost

  return (
    <main className="mt-5 flex flex-col items-center md:mt-9 lg:mt-[6px] lg:flex-row lg:items-start lg:justify-center lg:gap-x-[104px]">
      <div>
        <ArticleIntro {...intro} />
        <Article brief={brief} content={content} />
        <RelatedNewsList posts={relatedPosts} />
      </div>

      <hr className="hidden h-px w-full bg-[#CCCED4] md:my-12 md:block md:w-[588px] md:max-w-none lg:hidden" />

      <div className="flex flex-col gap-y-[46px] md:gap-y-12 lg:gap-y-[60px]">
        <FeatureNewsList title="最新新聞" posts={latestPosts} />
        <FeatureNewsList title="熱門新聞" posts={popularPosts} />
      </div>
    </main>
  )
}
