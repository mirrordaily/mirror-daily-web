import HeroSection from '../_components/hero-section'
import RelatedNewsSection from '../_components/related-news-section'
import Article from '../_components/article'
import { fetchPopularPost, fetchLatestPost } from '@/app/actions-general'
import { fetchRelatedPosts } from '../actions'
import { getRandomItems } from '@/utils/common'
import type { Post } from '@/types/story'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import { NonDesktopGptAd } from '@/shared-components/gpt-ad/non-desktop-gpt-ad'
import PopularNewsSection from './popular-news-section'
import LatestNewsSection from './latest-news-section'
import SocialSharePanel from './social-share-panel'
import NewsletterSubscription from '@/shared-components/newsletter-subscription'
import DableWidget from '@/shared-components/dable-widget'

type Props = Post

const MIN_RELATED_POSTS = 6

export default async function ArticleSection({
  warnings,
  apiData,
  apiDataBrief,
  id,
  link,
  shouldShowAd,
  ...heroContent
}: Props) {
  let relatedPosts = await fetchRelatedPosts(id)
  const popularPosts = await fetchPopularPost(20)
  const latestPosts = (await fetchLatestPost(1)).slice(0, 6)
  const popularPostsTopSix = popularPosts.slice(0, 6)

  const adTypeRelated = Math.random() < 0.5 ? 'popIn' : 'dable'
  const adTypeBottom = Math.random() < 0.5 ? 'popIn' : 'dable'

  if (relatedPosts.length < MIN_RELATED_POSTS) {
    const postsToAdd = MIN_RELATED_POSTS - relatedPosts.length
    const relatedIds = new Set(relatedPosts.map((post) => post.postId))
    const remainingPopularPosts = popularPosts
      .slice(6)
      .filter((post) => !relatedIds.has(post.postId))
    const randomPopularPosts = getRandomItems(remainingPopularPosts, postsToAdd)
    relatedPosts = [...relatedPosts, ...randomPopularPosts]
  }

  return (
    <section className="mb-[72px] flex w-full flex-col items-center md:mb-[76px] lg:mb-[92px] lg:flex-row lg:items-start lg:justify-center lg:gap-x-[104px]">
      <div>
        <div className="max-w-screen-sm md:max-w-[600px] lg:max-w-screen-md">
          <HeroSection {...heroContent} />

          <Article content={apiDataBrief} isBrief={true} />
          {/* for dable */}
          <div itemProp="articleBody">
            <Article
              content={apiData}
              isBrief={false}
              shouldShowAd={shouldShowAd}
            />
          </div>
          {warnings.map(({ id, content }) => (
            <p
              key={id}
              className="mt-3 whitespace-pre-wrap px-5 text-lg font-bold leading-loose text-[#212944] md:mt-8 md:px-0"
            >
              {content}
            </p>
          ))}

          {shouldShowAd && (
            <>
              <DesktopGptAd
                mode="normal"
                slotKey="mirrordaily_article_PC_728x90_in2"
                customClasses="my-9 mx-auto"
              />
              <NonDesktopGptAd
                mode="normal"
                slotKey="mirrordaily_article_MW_300x250_in2"
                customClasses="mx-auto my-8"
              />
            </>
          )}

          <NewsletterSubscription />

          <SocialSharePanel link={link} title={heroContent.title} />

          <RelatedNewsSection posts={relatedPosts} />

          {adTypeRelated === 'dable' ? (
            <DableWidget type="related" customClasses="mt-4" />
          ) : (
            <div id="_popIn_recommend_word" className="mt-7"></div>
          )}
          {adTypeBottom === 'dable' ? (
            <DableWidget type="articleBottomPC" customClasses="mt-4" />
          ) : (
            <div id="_popIn_recommend" className="mt-7"></div>
          )}
        </div>
      </div>

      <hr className="my-8 w-full max-w-[238px] border-[0.5px] border-[#7F8493] md:my-12 md:w-[588px] md:max-w-none lg:hidden" />

      <div className="flex flex-col items-center gap-y-[38px] md:gap-y-12 lg:min-w-[300px]">
        <LatestNewsSection posts={latestPosts} shouldShowAd={shouldShowAd} />
        <PopularNewsSection
          posts={popularPostsTopSix}
          shouldShowAd={shouldShowAd}
        />
      </div>
    </section>
  )
}
