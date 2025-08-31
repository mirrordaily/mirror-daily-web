import { notFound } from 'next/navigation'
import { fetchExternal, fetchRelatedPosts } from '../action'
import ArticleIntro from './components/article-intro'
import Article from './components/article'
import RelatedNewsList from './components/related-news-list'
import { fetchPopularPost, fetchLatestPost } from '@/app/actions-general'
import FeatureNewsList from './components/feature-news-list'
import type { Metadata } from 'next'
import { SITE_NAME } from '@/constants/misc'
import { IMAGE_PATH } from '@/constants/default-path'
import { getDefaultMetadata, getRandomItems } from '@/utils/common'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import { MobileGptAd } from '@/shared-components/gpt-ad/mobile-gpt-ad'
import MisoPageView from '@/shared-components/miso-pageview'
import DableWidget from '@/shared-components/dable-widget'
import ArticlePageTopAd from '@/shared-components/top-ads/article-page-top-ad'
import SocialSharePanel from '@/app/story/_components/social-share-panel'

type PageProps = { params: { id: string } }

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = params
  const externalPost = await fetchExternal(id)

  if (!externalPost) {
    notFound()
  }

  const defaultMetadata = getDefaultMetadata()

  const title = `${externalPost.title} - ${SITE_NAME}`
  const description = externalPost.brief
  const image = externalPost.thumb || IMAGE_PATH

  const metaData = Object.assign(
    {},
    {
      ...defaultMetadata,
      title,
      description,
      openGraph: {
        ...(defaultMetadata.openGraph ?? {}),
        title,
        description,
        url: externalPost.link,
        images: image,
        type: 'website',
      },
    }
  )

  return metaData
}

const MIN_RELATED_POSTS = 6

export default async function Page({ params }: PageProps) {
  const id = params.id
  const externalPost = await fetchExternal(id)
  if (!externalPost) notFound()

  let relatedPosts = await fetchRelatedPosts(id)
  const popularPosts = await fetchPopularPost(20)
  const popularPostsTopSix = popularPosts.slice(0, 6)
  const latestPosts = (await fetchLatestPost(1)).slice(0, 6)

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

  const { brief, content, link, ...intro } = externalPost

  return (
    <main className="flex flex-col items-center">
      <MisoPageView productIds={`external_${id}`} />
      <ArticlePageTopAd />
      <hr className="hidden w-[680px] border border-[#000000] md:mb-9 md:block lg:mb-12 lg:mt-4 lg:w-[1128px]" />
      <section className="mb-[72px] mt-5 flex flex-col items-center md:mb-[76px] md:mt-9 lg:mb-[92px] lg:mt-[6px] lg:flex-row lg:items-start lg:justify-center lg:gap-x-[104px]">
        <div className="max-w-screen-sm md:max-w-[600px] lg:max-w-screen-md">
          <ArticleIntro {...intro} />
          <Article brief={brief} content={content} />

          <DesktopGptAd
            slotKey="mirrordaily_article_PC_728x90_in2"
            customClasses="mt-9 mx-auto"
          />
          <MobileGptAd
            slotKey="mirrordaily_article_MW_300x250_in2"
            customClasses="mt-8 mx-auto"
          />

          <SocialSharePanel link={link} title={intro.title} />

          <RelatedNewsList posts={relatedPosts} />

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

        <hr className="hidden h-px w-full bg-[#CCCED4] md:my-12 md:block md:w-[588px] lg:hidden" />
        <div className="flex flex-col gap-y-[46px] md:gap-y-12 lg:min-w-[300px] lg:gap-y-[60px]">
          <div>
            <FeatureNewsList
              title="最新新聞"
              posts={latestPosts}
              type="latest"
            />
            <DesktopGptAd
              slotKey="mirrordaily_article_PC_300x600_r2"
              customClasses="mt-5"
            />
          </div>
          <div>
            <FeatureNewsList title="熱門新聞" posts={popularPostsTopSix} />
            <DesktopGptAd
              slotKey="mirrordaily_article_PC_300x600_r3"
              customClasses="mt-5"
            />
          </div>
        </div>
      </section>
    </main>
  )
}
