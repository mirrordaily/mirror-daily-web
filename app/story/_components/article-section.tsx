import HeroSection from '../_components/hero-section'
import RelatedNewsSection from '../_components/related-news-section'
import Article from '../_components/article'
import { fetchRelatedPosts } from '../actions'
import { enrichRelatedPosts } from '@/utils/related-posts'
import type { Post } from '@/types/story'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import { NonDesktopGptAd } from '@/shared-components/gpt-ad/non-desktop-gpt-ad'
import SocialSharePanel from '@/shared-components/social-share-panel'
import NewsletterSubscription from '@/shared-components/newsletter-subscription'
import { SECTION_FORUM_SLUG } from '@/constants/misc'
import { DableWordFirst } from './ads'
import type { LatestPost, PopularNews } from '@/types/common'

type Props = {
  postData: Post
  id: string
  latestPosts: LatestPost[]
  popularPosts: PopularNews[]
}

export default async function ArticleSection({
  postData,
  id,
  popularPosts,
}: Props) {
  const rawRelatedPosts = await fetchRelatedPosts(id)
  const relatedPosts = enrichRelatedPosts(rawRelatedPosts, popularPosts)

  const hasBrief =
    postData.apiDataBrief.length > 0 && !!postData.apiDataBrief[0]?.content[0]

  return (
    <section
      className="flex w-full flex-col items-center lg:flex-row lg:items-start lg:justify-center"
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
    </section>
  )
}
