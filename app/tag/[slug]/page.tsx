import ArticlesSection from '../_components/articles-section'
import PopularNewsSection from '@/shared-components/popular-news-section'
import { fetchTagInformation, fetchTagPosts } from '../actions'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SITE_NAME } from '@/constants/misc'
import { getTagPageUrl } from '@/utils/site-urls'
import { getDefaultMetadata } from '@/utils/common'

type PageProps = {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params
  const tagInfo = await fetchTagInformation(slug)

  if (!tagInfo) {
    notFound()
  }

  const defaultMetadata = getDefaultMetadata()

  const title = `${tagInfo.name} - ${SITE_NAME}`

  const metaData = Object.assign(
    {},
    {
      ...defaultMetadata,
      title,
      openGraph: {
        ...(defaultMetadata.openGraph ?? {}),
        title,
        url: getTagPageUrl(slug),
      },
    }
  )

  return metaData
}

export default async function Page({
  params,
}: PageProps): Promise<JSX.Element> {
  const slug = params.slug

  const tagInfo = await fetchTagInformation(slug)
  if (!tagInfo) notFound()
  const posts = await fetchTagPosts(1, slug)
  if (posts.length === 0) notFound()

  return (
    <main className="flex flex-col items-center pl-[17px] pr-[18px] md:mb-[68px] md:pt-3 lg:flex-row lg:items-start lg:justify-center lg:gap-x-[100px] lg:pt-5">
      <ArticlesSection info={tagInfo} initialList={posts} slug={slug} />
      <PopularNewsSection />
    </main>
  )
}
