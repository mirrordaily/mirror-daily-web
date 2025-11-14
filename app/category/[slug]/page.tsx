import { notFound } from 'next/navigation'
import {
  fetchCategoryPosts,
  fetchCategoryPostsFromJSON,
  fetchCategoryInformation,
} from '../actions'
import ArticlesList from '@/shared-components/list/articles-list'
import PopularNewsSection from '@/shared-components/popular-news-section'
import type { Metadata } from 'next'
import { SITE_NAME } from '@/constants/misc'
import { getCategoryPageUrl } from '@/utils/site-urls'
import { getDefaultMetadata } from '@/utils/common'
import { MobileGptAd } from '@/shared-components/gpt-ad/mobile-gpt-ad'
import { PAGE_SIZE, JSON_ITEMS_COUNT } from '@/constants/category'
import { categoryGtmEvents } from '@/constants/gtm'
import ListPageTopAd from '@/shared-components/top-ads/list-page-top-ad'
import { SITE_URL } from '@/constants/config'
import { IMAGE_PATH } from '@/constants/default-path'

type PageProps = { params: { slug: string } }

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params
  const categoryInfo = await fetchCategoryInformation(slug)

  if (!categoryInfo) {
    notFound()
  }

  const defaultMetadata = getDefaultMetadata()

  const title = `${categoryInfo.name} - ${SITE_NAME}`

  const metaData = Object.assign(
    {},
    {
      ...defaultMetadata,
      title,
      openGraph: {
        ...(defaultMetadata.openGraph ?? {}),
        title,
        url: getCategoryPageUrl(slug),
      },
    }
  )

  return metaData
}

export default async function Page({ params }: PageProps) {
  const slug = params.slug

  const categoryInfo = await fetchCategoryInformation(slug)
  if (!categoryInfo) notFound()
  const color = categoryInfo.color
  const name = categoryInfo.name

  const { postsData: initialPosts, jsonPostsCount } =
    await fetchCategoryPostsFromJSON({ slug })

  const fetchMorePosts = async (page: number) => {
    'use server'

    const JSON_PAGE_LIMIT = Math.ceil(jsonPostsCount / JSON_ITEMS_COUNT)

    if (page <= JSON_PAGE_LIMIT) {
      const { postsData } = await fetchCategoryPostsFromJSON({ slug, page })
      if (postsData.length) return postsData
    }

    const gqlPage = page - JSON_PAGE_LIMIT
    if (gqlPage < 1) return []

    const { posts } = await fetchCategoryPosts({
      slug,
      take: PAGE_SIZE,
      skip: PAGE_SIZE * (gqlPage - 1),
    })
    return posts
  }

  const { amount: postsCount = 0 } = await fetchCategoryPosts({
    take: PAGE_SIZE,
    skip: 0,
    slug,
    withAmount: true,
  })

  const totalAmount = jsonPostsCount + postsCount

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: initialPosts.map((post, index) => {
      let imageUrl: string | undefined
      if (typeof post.postMainImage === 'string') {
        imageUrl = post.postMainImage
      } else {
        imageUrl = post.postMainImage.resized?.original
      }
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'NewsArticle',
          name: post.title,
          image: imageUrl || `${SITE_URL}${IMAGE_PATH}`,
          dateCreated: new Date(post.formattedDate).toISOString(),
          description: post.brief,
          url: `${SITE_URL}${post.link}`,
        },
      }
    }),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <ListPageTopAd slug={slug} />

      <main className="mb-10 flex flex-col items-center md:mb-[72px] md:pt-5 lg:mb-[100px] lg:flex-row lg:items-start lg:gap-x-[128px] lg:px-9">
        <ArticlesList
          initialPosts={initialPosts}
          color={color}
          name={name}
          fetchMorePosts={fetchMorePosts}
          totalAmount={totalAmount}
          slug={slug}
          gtm={categoryGtmEvents}
        />
        <hr className="my-10 hidden w-[670px] border border-[#000928] md:block lg:hidden" />
        <PopularNewsSection
          slug={slug}
          gtmClassName={categoryGtmEvents.popularArticle}
        />
      </main>
      <MobileGptAd
        mode="normal"
        slotKey="mirrordaily_section_MW_300x250_list4"
        customClasses="mt-8 mb-9 mx-auto"
        targetingId={slug}
      />
    </>
  )
}
