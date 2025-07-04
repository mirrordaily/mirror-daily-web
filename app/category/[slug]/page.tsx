import { notFound } from 'next/navigation'
import {
  fetchCategoryPosts,
  fetchCategoryPostsFromJSON,
  fetchCategoryInformation,
} from '../actions'
import ArticlesList from '../../../shared-components/articles-list'
import PopularNewsSection from '@/shared-components/popular-news-section'
import type { Metadata } from 'next'
import { SITE_NAME } from '@/constants/misc'
import { getCategoryPageUrl } from '@/utils/site-urls'
import { getDefaultMetadata } from '@/utils/common'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import { MobileGptAd } from '@/shared-components/gpt-ad/mobile-gpt-ad'
import { PAGE_SIZE, JSON_ITEMS_COUNT } from '@/constants/category'

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

  return (
    <>
      <div className="hidden min-h-[306px] lg:flex lg:items-center">
        <DesktopGptAd
          slotKey="mirrordaily_section_PC_970x250_top"
          customClasses="mt-5 mb-9 mx-auto"
        />
      </div>
      <div className="block min-h-[286px] md:hidden">
        <MobileGptAd
          slotKey="mirrordaily_section_MW_300x250_top"
          customClasses="mb-9 mx-auto"
        />
      </div>
      <main className="mb-10 flex flex-col items-center md:mb-[72px] md:pt-5 lg:mb-[100px] lg:flex-row lg:items-start lg:gap-x-[128px] lg:px-9">
        <ArticlesList
          initialPosts={initialPosts}
          color={color}
          name={name}
          fetchMorePosts={fetchMorePosts}
          totalAmount={totalAmount}
        />
        <hr className="my-10 hidden w-[670px] border border-[#000928] md:block lg:hidden" />
        <PopularNewsSection />
      </main>
      <MobileGptAd
        slotKey="mirrordaily_section_MW_300x250_list4"
        customClasses="mt-8 mb-9 mx-auto z-[5]"
      />
    </>
  )
}
