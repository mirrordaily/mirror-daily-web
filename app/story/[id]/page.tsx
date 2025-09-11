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
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'

type PageProps = { params: { id: string } }

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
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
  const newsKeywords = [postData.title, SITE_NAME, '新聞', ...tags, ...algoTags]
    .filter(Boolean)
    .join(', ')
  const keywords = [...tags, ...algoTags].filter(Boolean).join(', ')
  const other: Record<string, string> = {
    'article:published_time': new Date(postData.publishedTime).toISOString(),
    'article:section': postData.sectionName || 'UnCategorized',
    'dable:author': postData.writers?.[0]
      ? postData.writers[0].name
      : 'Unknown Author',
    'dable:item_id': postData.id,
    'section:color': postData.sectionColor,
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

export default async function Page({ params }: PageProps) {
  const id = params.id

  const postData = await fetchPost(id)
  if (!postData) notFound()

  const shouldShowAd = postData.shouldShowAd

  const extra = {
    storyId: postData.id,
    storyTitle: postData.title,
    authorNames: postData.writers.map((w) => w.name),
    sectionName: postData.sectionName,
    tags: postData.tags.map((t) => t.name),
    algoTags: postData.algoTags.map((t) => t.name),
    editors: postData.editors.map((e) => e.name),
    mainWriters: postData.mainWriters.map((m) => m.name),
  }

  const author = postData.writers?.[0]
    ? postData.writers.map((writer) => ({ name: writer.name }))
    : [{ name: SITE_NAME }]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: postData.title,
    author: author,
    image:
      postData.postMainImage?.resized?.original || `${SITE_URL}${IMAGE_PATH}`,
    datePublished: new Date(postData.publishedTime).toISOString(),
  }

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
      <main className="flex flex-col items-center">
        {shouldShowAd && <ArticlePageTopAd />}
        <hr className="hidden w-[680px] border border-[#000000] md:mb-9 md:block lg:mb-12 lg:mt-4 lg:w-[1128px]" />
        <MisoPageView productIds={`story_${id}`} />
        <ArticleSection {...postData} id={id} />
        <AdultWarning isAdult={postData.isAdult} />
        {shouldShowAd && (
          <DesktopGptAd
            slotKey="mirrordaily_article_PC_970x90_sticky"
            isStickyAd={true}
          />
        )}
      </main>
    </>
  )
}
