import { notFound } from 'next/navigation'
import { fetchPost } from '../actions'
import ArticleSection from '../_components/article-section'
import type { Metadata } from 'next'
import { SITE_NAME } from '@/constants/misc'
import { getFirstParagraphFromApiData } from '@/utils/data-process'
import { IMAGE_PATH } from '@/constants/default-path'
import { getStoryPageUrl } from '@/utils/site-urls'

type PageProps = { params: { slug: string } }

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params
  const postData = await fetchPost(slug)

  if (!postData) {
    notFound()
  }

  const title = `${postData.title} - ${SITE_NAME}`
  const description = getFirstParagraphFromApiData(postData.apiDataBrief) || ''
  const image = postData.postMainImage?.resized?.original || IMAGE_PATH

  return {
    title,
    description,
    openGraph: {
      siteName: SITE_NAME,
      title,
      description,
      url: getStoryPageUrl(slug),
      images: image,
    },
  }
}

export default async function Page({ params }: PageProps) {
  const slug = params.slug

  const postData = await fetchPost(slug)
  if (!postData) notFound()

  return (
    <main className="flex flex-col items-center">
      <hr className="hidden w-[680px] border border-[#000000] md:mb-9 md:block lg:mb-12 lg:mt-4 lg:w-[1128px]" />
      <ArticleSection {...postData} slug={slug} />
    </main>
  )
}
