import ArticlesSection from '../_components/articles-section'
import PopularNewsSection from '@/shared-components/popular-news-section'
import { fetchTagInformation, fetchTagPosts } from '../actions'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SITE_NAME } from '@/constants/misc'
import { getTagPageUrl } from '@/utils/site-urls'
import { getDefaultMetadata } from '@/utils/common'
import { tagClickGtmEvents } from '@/constants/gtm'
import { getDescriptionFromTagPosts } from '@/utils/data-process'

type PageProps = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const { slug } = params
  const tagInfo = await fetchTagInformation(slug)

  if (!tagInfo) {
    notFound()
  }

  const { totalAmount, posts } = await fetchTagPosts({
    take: 3,
    skip: 0,
    slug,
    withAmount: true,
  })

  const defaultMetadata = getDefaultMetadata()
  const robotsMetaData =
    (totalAmount ?? 0) < 4
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}

  const title = `${tagInfo.name} - ${SITE_NAME}`
  const description = getDescriptionFromTagPosts(posts)

  const metaData = Object.assign(
    {},
    {
      ...defaultMetadata,
      ...robotsMetaData,
      title,
      ...(description && { description }),
      openGraph: {
        ...(defaultMetadata.openGraph ?? {}),
        title,
        url: getTagPageUrl(slug),
        ...(description && { description }),
      },
    }
  )

  return metaData
}

const PAGE_SIZE = 12

export default async function Page(props: PageProps): Promise<JSX.Element> {
  const params = await props.params
  const slug = params.slug

  const tagInfo = await fetchTagInformation(slug)
  if (!tagInfo) notFound()
  const { posts, totalAmount = 0 } = await fetchTagPosts({
    take: PAGE_SIZE,
    skip: 0,
    slug,
    withAmount: true,
  })
  if (!totalAmount) notFound()
  const fetchMorePosts = async (page: number) => {
    'use server'
    const { posts } = await fetchTagPosts({
      slug,
      take: PAGE_SIZE,
      skip: PAGE_SIZE * (page - 1),
    })
    return posts
  }

  return (
    <main className="flex flex-col items-center pl-[17px] pr-[18px] md:mb-[68px] md:pt-3 lg:flex-row lg:items-start lg:justify-center lg:gap-x-[100px] lg:pt-5">
      <ArticlesSection
        info={tagInfo}
        initialList={posts}
        totalAmount={totalAmount}
        fetchMorePosts={fetchMorePosts}
      />
      <PopularNewsSection gtmClassName={tagClickGtmEvents.popularArticle} />
    </main>
  )
}
