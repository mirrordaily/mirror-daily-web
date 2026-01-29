import HeroSection from '../_components/hero-section'
import RelatedNewsSection from '../_components/related-news-section'
import Article from '../_components/article'
import { fetchRelatedPosts } from '../actions'
import { getRandomItems } from '@/utils/common'
import type { Post } from '@/types/story'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import { NonDesktopGptAd } from '@/shared-components/gpt-ad/non-desktop-gpt-ad'
import SocialSharePanel from '@/shared-components/social-share-panel'
import NewsletterSubscription from '@/shared-components/newsletter-subscription'
import { SECTION_FORUM_SLUG } from '@/constants/misc'
import { DableWordFirst } from './ads'
import type { LatestPost, PopularNews } from '@/types/common'
import StorySidebar from './story-sidebar'

type Props = {
  postData: Post
  id: string
  latestPosts: LatestPost[]
  popularPosts: PopularNews[]
}

const MIN_RELATED_POSTS = 6

export default async function ArticleSection({
  postData,
  id,
  latestPosts,
  popularPosts,
}: Props) {
  let relatedPosts = await fetchRelatedPosts(id)
  const popularPostsTopSix = popularPosts.slice(0, 6)

  if (relatedPosts.length < MIN_RELATED_POSTS) {
    const postsToAdd = MIN_RELATED_POSTS - relatedPosts.length
    const relatedIds = new Set(relatedPosts.map((post) => post.postId))
    const remainingPopularPosts = popularPosts
      .slice(6)
      .filter((post) => !relatedIds.has(post.postId))
    const randomPopularPosts = getRandomItems(remainingPopularPosts, postsToAdd)
    relatedPosts = [...relatedPosts, ...randomPopularPosts]
  }

  const hasBrief =
    postData.apiDataBrief.length > 0 && !!postData.apiDataBrief[0]?.content[0]

  return (
    <section
      className="flex w-full flex-col items-center lg:mb-[92px] lg:flex-row lg:items-start lg:justify-center lg:gap-x-[104px]"
      data-story-id={postData.id}
    >
      <div>
        <div className="max-w-screen-sm md:max-w-[600px] lg:max-w-screen-md">
          <HeroSection postData={postData} />

          <Article content={postData.apiDataBrief} isBrief={true} />
          {/* for dable */}
          <div itemProp="articleBody">
            <Article
              content={postData.apiData}
              isBrief={false}
              shouldShowAd={postData.shouldShowAd}
              hasBrief={hasBrief}
            />
          </div>
          {postData.warnings.map(({ id, content }) => (
            <p
              key={id}
              className="mt-3 whitespace-pre-wrap px-5 text-lg font-bold leading-loose text-[#212944] md:mt-8 md:px-0"
            >
              {content}
            </p>
          ))}

          {postData.shouldShowAd && (
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
          {postData.sections.some(
            ({ slug }) => slug === SECTION_FORUM_SLUG
          ) && <NewsletterSubscription />}
          <div className="md:hidden">
            <SocialSharePanel
              link={postData.link}
              hideShareButtons
              title={postData.title}
            />
          </div>
          <div className="hidden md:block">
            <SocialSharePanel link={postData.link} title={postData.title} />
          </div>

          <RelatedNewsSection posts={relatedPosts} />
          <DableWordFirst />
        </div>
      </div>

      <hr className="my-8 w-full max-w-[238px] border-[0.5px] border-[#7F8493] md:my-12 md:w-[588px] md:max-w-none lg:hidden" />

      <StorySidebar
        className="mb-[72px] lg:hidden"
        latestPosts={latestPosts}
        popularPosts={popularPostsTopSix}
        shouldShowAd={postData.shouldShowAd}
      />
    </section>
  )
}
