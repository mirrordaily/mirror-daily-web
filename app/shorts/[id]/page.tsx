import ShortsLayout from '@/shared-components/shorts/layout'
import { notFound } from 'next/navigation'
import { LATEST_SHORT_PAGES, SITE_NAME } from '@/constants/misc'
import { fetchShortsRandom, fetchShortsData } from './action'
import type { Metadata } from 'next'
import { getDefaultMetadata } from '@/utils/common'
import { getShortsPageUrl } from '@/utils/site-urls'
import VideoBlock from '@/shared-components/shorts/video-block'
import { IMAGE_PATH } from '@/constants/default-path'
import { SITE_URL } from '@/constants/config'
type PageProps = {
  params: { id?: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id = '' } = params
  const shortsData = await fetchShortsData(id)

  if (!shortsData) {
    notFound()
  }

  const defaultMetadata = getDefaultMetadata()

  const title = `${shortsData.name} - ${SITE_NAME}`
  const image = shortsData.heroImage?.resized?.original || IMAGE_PATH

  const metaData = Object.assign(
    {},
    {
      ...defaultMetadata,
      title,
      openGraph: {
        ...(defaultMetadata.openGraph ?? {}),
        title,
        url: getShortsPageUrl(id),
        images: image,
      },
    }
  )

  return metaData
}

export default async function Page({ params }: PageProps) {
  const videoId = params.id ?? ''
  const shortsData = await fetchShortsData(videoId)

  if (!shortsData) notFound()

  const data = await fetchShortsRandom(videoId, 19, shortsData.videoSection)

  const {
    id,
    name,
    videoSrc,
    youtubeUrl,
    createdAt,
    fileDuration,
    youtubeDuration,
    content,
  } = shortsData
  data.unshift({
    id,
    title: name,
    fileUrl: videoSrc || youtubeUrl || '',
    poster: '',
    link: `/shorts/${id}`,
    contributor: '',
  })

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: name,
    thumbnailUrl:
      shortsData.heroImage?.resized?.original || `${SITE_URL}${IMAGE_PATH}`,
    uploadDate: createdAt,
    duration: fileDuration || youtubeDuration,
    contentUrl: videoSrc || youtubeUrl || '',
    description: content || name,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <ShortsLayout
        tabLinks={LATEST_SHORT_PAGES}
        activeTab={shortsData.videoSection}
        className="touch-none"
      >
        <VideoBlock items={data} />
      </ShortsLayout>
    </>
  )
}
