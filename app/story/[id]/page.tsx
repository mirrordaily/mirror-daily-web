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
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import { MobileGptAd } from '@/shared-components/gpt-ad/mobile-gpt-ad'
import MisoPageView from '@/shared-components/miso-pageview'
import { ENV } from '@/constants/config'

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
  const other: Record<string, string> = {
    'article:published_time': new Date(postData.publishedTime).toISOString(),
    'article:section': postData.sectionName || 'UnCategorized',
    'dable:author': postData.writers?.[0]
      ? postData.writers[0].name
      : 'Unknown Author',
    'dable:item_id': postData.id,
    'section:color': postData.sectionColor,
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

  return (
    <>
      <Suspense>
        <PageLogger extra={extra} />
      </Suspense>
      <main className="flex flex-col items-center">
        <div className="hidden min-h-[306px] lg:flex lg:items-center">
          <DesktopGptAd
            slotKey="mirrordaily_article_PC_970x250_top"
            customClasses="mt-5 mb-9"
          />
        </div>
        <div className="block min-h-[286px] md:hidden">
          <MobileGptAd
            slotKey="mirrordaily_article_MW_300x250_top"
            customClasses="mb-9"
          />
        </div>
        <hr className="hidden w-[680px] border border-[#000000] md:mb-9 md:block lg:mb-12 lg:mt-4 lg:w-[1128px]" />
        <MisoPageView productIds={`story_${id}`} />
        <ArticleSection {...postData} id={id} />
        <AdultWarning isAdult={postData.isAdult} />
        <MobileGptAd
          slotKey="mirrordaily_article_MW_300x250_in2"
          customClasses="fixed bottom-0 z-10"
        />
      </main>
    </>
  )
}
