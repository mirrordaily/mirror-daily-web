import PopularNewsSection from '@/shared-components/popular-news-section'
import ArticlesList from '../../../shared-components/articles-list'
import {
  fetchSectionPosts,
  fetchSectionInformation,
  fetchSectionPostsFromJSON,
} from '../actions'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SITE_NAME } from '@/constants/misc'
import { getSectionPageUrl } from '@/utils/site-urls'
import { getDefaultMetadata } from '@/utils/common'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import { MobileGptAd } from '@/shared-components/gpt-ad/mobile-gpt-ad'
import { PAGE_SIZE, JSON_ITEMS_COUNT } from '@/constants/section'
import { ENV } from '@/constants/config'
import { ENVIRONMENT } from '@/constants/misc'

const isStagingOrProd =
  ENV === ENVIRONMENT.STAGING || ENV === ENVIRONMENT.PRODUCTION

type PageProps = { params: { slug: string } }

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params
  const sectionInfo = await fetchSectionInformation(slug)

  if (!sectionInfo) {
    notFound()
  }

  const defaultMetadata = getDefaultMetadata()

  const title = `${sectionInfo.name} - ${SITE_NAME}`

  const metaData = Object.assign(
    {},
    {
      ...defaultMetadata,
      title,
      openGraph: {
        ...(defaultMetadata.openGraph ?? {}),
        title,
        url: getSectionPageUrl(slug),
      },
    }
  )

  return metaData
}

export default async function Page({
  params,
}: PageProps): Promise<JSX.Element> {
  const slug = params.slug

  const sectionInfo = await fetchSectionInformation(slug)
  if (!sectionInfo) notFound()
  const color = sectionInfo.color
  const name = sectionInfo.name

  const { postsData: initialPosts, jsonPostsCount } =
    await fetchSectionPostsFromJSON({ slug })

  const fetchMorePosts = async (page: number) => {
    'use server'

    const JSON_PAGE_LIMIT = Math.ceil(jsonPostsCount / JSON_ITEMS_COUNT)

    if (page <= JSON_PAGE_LIMIT) {
      const { postsData } = await fetchSectionPostsFromJSON({ slug, page })
      if (postsData.length) return postsData
    }

    const gqlPage = page - JSON_PAGE_LIMIT
    if (gqlPage < 1) return []

    const { posts } = await fetchSectionPosts({
      slug,
      take: PAGE_SIZE,
      skip: PAGE_SIZE * (gqlPage - 1),
    })
    return posts
  }

  const { amount: postsCount = 0 } = await fetchSectionPosts({
    take: PAGE_SIZE,
    skip: 0,
    slug,
    withAmount: true,
  })

  const totalAmount = jsonPostsCount + postsCount

  return (
    <>
      {isStagingOrProd ? (
        <>
          <div className="hidden min-h-[306px] lg:block">
            <DesktopGptAd
              slotKey="mirrordaily_home_PC_970x250_1"
              customClasses="mt-5 mb-9 mx-auto"
            />
          </div>
          <div className="block min-h-[352px] md:hidden">
            <MobileGptAd
              slotKey="mirrordaily_list_MW_336x280_HD"
              customClasses="my-9 mx-auto"
            />
          </div>
        </>
      ) : (
        <>
          <div className="hidden min-h-[306px] lg:flex lg:items-center">
            <DesktopGptAd
              slotKey="mirrordaily_section_PC_970x250_top"
              customClasses="mt-5 mb-9 mx-auto"
              pageKey={slug}
            />
          </div>
          <div className="block min-h-[286px] md:hidden">
            <MobileGptAd
              slotKey="mirrordaily_section_MW_300x250_top"
              customClasses="mb-9 mx-auto"
              pageKey={slug}
            />
          </div>
        </>
      )}

      <main className="mb-10 flex flex-col items-center md:mb-[72px] md:pt-5 lg:mb-[100px] lg:flex-row lg:items-start lg:gap-x-[128px] lg:px-9">
        <ArticlesList
          initialPosts={initialPosts}
          totalAmount={totalAmount}
          color={color}
          name={name}
          fetchMorePosts={fetchMorePosts}
          slug={slug}
        />
        <hr className="my-10 hidden w-[670px] border border-[#000928] md:block lg:hidden" />
        <PopularNewsSection slug={slug} />
        {isStagingOrProd && (
          <MobileGptAd
            slotKey="mirrordaily_list_MW_320x100_FIX"
            customClasses="fixed bottom-0 auto z-[9999]"
          />
        )}
      </main>
      {!isStagingOrProd && (
        <MobileGptAd
          slotKey="mirrordaily_section_MW_300x250_list4"
          customClasses="mt-8 mb-9 mx-auto"
          pageKey={slug}
        />
      )}
      {isStagingOrProd && (
        <DesktopGptAd
          slotKey="mirrordaily_list_970x250"
          customClasses="my-[80px] mx-auto"
        />
      )}
      {isStagingOrProd && (
        <MobileGptAd
          slotKey="mirrordaily_list_MW_336x280_FT"
          customClasses="mt-8 mb-9 mx-auto z-[5]"
        />
      )}
    </>
  )
}
