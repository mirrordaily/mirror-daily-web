import { notFound } from 'next/navigation'
import { fetchPost } from '../actions'
import ArticleSection from '../_components/article-section'
import type { Metadata } from 'next'
import { SITE_NAME } from '@/constants/misc'
import { getFirstParagraphFromApiData } from '@/utils/data-process'
import { IMAGE_PATH } from '@/constants/default-path'
import { getDefaultMetadata } from '@/utils/common'
import { Suspense } from 'react'
import PageLogger from '@/shared-components/page-logger'
import AdultWarning from '../_components/adult-warning'
import MisoPageView from '@/shared-components/miso-pageview'
import { ENV, SITE_URL } from '@/constants/config'
import ArticlePageTopAd from '@/shared-components/top-ads/article-page-top-ad'
import { getSectionPageUrl } from '@/utils/site-urls'
import { getCategoryPageUrl } from '@/utils/site-urls'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import { NonDesktopGptAd } from '@/shared-components/gpt-ad/non-desktop-gpt-ad'
import StoryInfiniteArticles from '../_components/story-infinite-articles'
import { fetchLatestPost, fetchPopularPost } from '@/app/actions-general'
import StorySidebar from '../_components/story-sidebar'
import FullScreenAd from '@/shared-components/gpt-ad/full-screen-ad'

type PageProps = { params: Promise<{ id: string }> }

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const { id } = params
  const postData = await fetchPost(id)

  if (!postData) {
    notFound()
  }

  const defaultMetadata = getDefaultMetadata()

  const title = `${postData.title} - ${SITE_NAME}`
  const description = getFirstParagraphFromApiData(postData.apiDataBrief) || ''
  const image = postData.postMainImage?.resized?.original || IMAGE_PATH
  const tags = postData.tags.map((tag) => tag.name)
  const algoTags = postData.algoTags.map((tag) => tag.name)
  const newsKeywords = [
    postData.title,
    SITE_NAME,
    '新聞',
    '今日新聞',
    ...tags,
    ...algoTags,
  ]
    .filter(Boolean)
    .join(', ')
  const keywords = [...tags, ...algoTags].filter(Boolean).join(', ')
  const publishedTime = postData.publishedTimeIso
  const updatedTime = postData.updatedTimeIso
  const other: Record<string, string> = {
    ...(publishedTime && {
      pubdate: publishedTime,
      'article:published_time': publishedTime,
    }),
    ...(updatedTime && {
      lastmod: updatedTime,
      'article:modified_time': updatedTime,
    }),
    'article:section': postData.sections?.[0]?.name || 'UnCategorized',
    'dable:author': postData.writers?.[0]
      ? postData.writers[0].name
      : 'Unknown Author',
    'dable:item_id': postData.id,
    'section:color': postData.sections?.[0]?.color || '#000000',
    news_keywords: newsKeywords,
    keywords: keywords,
  }

  if (ENV !== 'prod') {
    other['product:availability'] = 'oos'
  }

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
        url: postData.link,
        images: image,
        type: 'website',
      },
      other,
    }
  )

  return metaData
}

export default async function Page(props: PageProps) {
  const params = await props.params
  const id = params.id

  const postData = await fetchPost(id)
  if (!postData) notFound()

  const shouldShowAd = postData.shouldShowAd
  const latestPosts = (await fetchLatestPost(1))
    .filter((post) => post.postId !== postData.id)
    .slice(0, 6)
  const popularPosts = await fetchPopularPost(20)
  const popularPostsTopSix = popularPosts.slice(0, 6)

  const extra = {
    storyId: postData.id,
    storyTitle: postData.title,
    authorNames: postData.writers.map((w) => w.name),
    sectionName: postData.sections?.[0]?.name || '',
    tags: postData.tags.map((t) => t.name),
    algoTags: postData.algoTags.map((t) => t.name),
    editors: postData.editors.map((e) => e.name),
    mainWriters: postData.mainWriters.map((m) => m.name),
  }

  const author =
    postData.writers && postData.writers.length > 0
      ? postData.writers.map((writer) => ({
          '@type': 'Person',
          name: writer.name,
          url: `${SITE_URL}${writer.link}`,
        }))
      : {
          '@type': 'Organization',
          name: SITE_NAME,
          url: SITE_URL,
        }

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: postData.title,
      author: author,
      image:
        postData.postMainImage?.resized?.original || `${SITE_URL}${IMAGE_PATH}`,
      ...(postData.publishedTimeIso && {
        datePublished: postData.publishedTimeIso,
      }),
      ...(postData.updatedTimeIso && {
        dateModified: postData.updatedTimeIso,
      }),
    },
    ...postData.sections.map((section) => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '首頁',
          item: `${SITE_URL}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: section.name,
          item: `${SITE_URL}${getSectionPageUrl(section.slug)}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: postData.title,
        },
      ],
    })),
    ...postData.categories.map((category) => ({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '首頁',
          item: `${SITE_URL}`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: category.name,
          item: `${SITE_URL}${getCategoryPageUrl(category.slug)}`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: postData.title,
        },
      ],
    })),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <Suspense>
        <PageLogger extra={extra} />
      </Suspense>
      <main className="mb-[60px] flex flex-col items-center">
        {shouldShowAd && <ArticlePageTopAd />}
        <FullScreenAd slotKey="homepage_mw" />
        <NonDesktopGptAd
          mode="normal"
          slotKey="mirrordaily_home_MW_1x1_incover_AD2"
          customClasses="!w-px !min-h-px overflow-visible"
        />
        <hr className="hidden w-[680px] border border-[#000000] md:mb-9 md:block lg:mb-12 lg:w-[1128px]" />
        <MisoPageView productIds={`story_${id}`} />
        <div className="w-full lg:flex lg:items-start lg:justify-center lg:gap-x-[104px]">
          <div className="mb-[60px] flex w-full flex-col items-center">
            <ArticleSection
              postData={postData}
              id={id}
              latestPosts={latestPosts}
              popularPosts={popularPosts}
            />
            <StoryInfiniteArticles
              initialPost={postData}
              popularPosts={popularPosts}
              maxFetch={3}
            />
          </div>
          <aside>
            <StorySidebar
              latestPosts={latestPosts}
              popularPosts={popularPostsTopSix}
              shouldShowAd={shouldShowAd}
              className="mb-[92px]"
            />
          </aside>
        </div>
        <AdultWarning isAdult={postData.isAdult} />
        <NonDesktopGptAd mode="sticky" pageType="article_mw" />
        <DesktopGptAd mode="sticky" pageType="article_pc" />
      </main>
    </>
  )
}
