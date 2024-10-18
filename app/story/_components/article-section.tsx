import HeroSection from '../_components/hero-section'
import FeaturedNewsSection from '../_components/featured-news-section'
import RelatedNewsSection from '../_components/related-news-section'
import Article from '../_components/article'
import { fetchPopularPost, fetchLatestPost } from '@/app/actions-general'
import { fetchRelatedPosts } from '../actions'
import type { Post } from '@/types/story-page'

type Props = Post & { slug: string }

export default async function ArticleSection({
  apiData,
  apiDataBrief,
  slug,
  ...heroContent
}: Props) {
  const relatedPosts = await fetchRelatedPosts(slug)
  const popularPosts = await fetchPopularPost(6)
  const latestPosts = (await fetchLatestPost(0)).slice(0, 6)

  return (
    <section className="mb-[72px] flex w-full flex-col items-center md:mb-[76px] lg:mb-[92px] lg:flex-row lg:items-start lg:justify-center lg:gap-x-[104px]">
      <div>
        <HeroSection {...heroContent} />
        <div className="mb-7 md:mb-9">
          <Article content={apiDataBrief} isBrief={true} />
          <Article content={apiData} isBrief={false} />
        </div>
        {relatedPosts.length > 0 && <RelatedNewsSection posts={relatedPosts} />}
      </div>

      <hr className="mb-12 mt-11 w-full max-w-[238px] border-[0.5px] border-[#7F8493] md:my-12 md:w-[588px] md:max-w-none lg:hidden" />

      <div className="flex flex-col gap-y-20 md:gap-y-12">
        {latestPosts.length > 0 && (
          <FeaturedNewsSection title="最新新聞" posts={latestPosts} />
        )}
        {popularPosts.length > 0 && (
          <FeaturedNewsSection title="熱門新聞" posts={popularPosts} />
        )}
      </div>
    </section>
  )
}
