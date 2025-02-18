import '@/shared-styles/topic.css'
import type { Metadata } from 'next'
import { fetchTopicBasicInfo } from '../action'
import {
  getHeroImage,
  selectMainImage,
  getImageSrc,
  getFirstParagraphFromApiData,
} from '@/utils/data-process'
import { SITE_NAME } from '@/constants/misc'
import { IMAGE_PATH } from '@/constants/default-path'
import { SITE_URL } from '@/constants/config'
import { notFound } from 'next/navigation'
import { TOPIC_LEADING } from '@/types/topic'
import type { ImageKeys } from '@/utils/data-schema'
import LeadingVideo from './_components/leading-video'
import CustomImage from '@/shared-components/custom-image'
import LeadingSlideshow from './_components/leading-slideshow'

type PageProps = {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = params
  const topic = await fetchTopicBasicInfo(slug)

  if (!topic || topic.state !== 'published') {
    notFound()
  }

  const title = `${topic.og_title || topic.name} -${SITE_NAME}`
  const description =
    topic.og_description ||
    getFirstParagraphFromApiData(topic.apiDataBrief) ||
    ''
  const heroImage = getHeroImage(topic.heroImage)
  const ogImage = getHeroImage(topic.og_image)
  const mainImage = selectMainImage(heroImage, ogImage)
  const image = mainImage.resized?.original || IMAGE_PATH

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    openGraph: {
      siteName: SITE_NAME,
      title,
      description,
      images: image,
    },
  }
}

export default async function Page({
  params,
}: PageProps): Promise<JSX.Element> {
  const { slug } = params
  const topic = await fetchTopicBasicInfo(slug)

  if (!topic || topic.state !== 'published') {
    notFound()
  }

  const {
    leading,
    heroUrl,
    heroVideo,
    heroImage,
    style,
    slideshow_images,
    manualOrderOfSlideshowImages,
  } = topic

  let leadingJsx: React.ReactNode

  switch (leading) {
    case TOPIC_LEADING.VIDEO: {
      const pickedSize: ImageKeys[] = ['w1600', 'w1200', 'w800', 'original']
      const isExternalVideoSrc = Boolean(heroUrl)

      // external video has higher precedence
      if (isExternalVideoSrc) {
        const poster =
          getImageSrc(heroImage?.resizedWebp, pickedSize) ||
          getImageSrc(heroImage?.resized, pickedSize) ||
          ''

        leadingJsx = (
          <div className="leading-wrapper">
            <LeadingVideo poster={poster} fileUrl={heroUrl!} />
          </div>
        )
      } else {
        if (!heroVideo || !heroVideo.videoSrc) {
          throw new Error(
            `topic page (slug: ${slug}) with leading (${TOPIC_LEADING.VIDEO}) without valid video source`
          )
        }

        const poster =
          getImageSrc(heroVideo.heroImage?.resizedWebp, pickedSize) ||
          getImageSrc(heroVideo.heroImage?.resized, pickedSize) ||
          ''

        leadingJsx = (
          <div className="leading-wrapper">
            <LeadingVideo poster={poster} fileUrl={heroVideo.videoSrc} />
          </div>
        )
      }
      break
    }
    case TOPIC_LEADING.SLIDESHOW: {
      if (slideshow_images) {
        leadingJsx = (
          <div className="leading-wrapper bg-transparent">
            <LeadingSlideshow
              heroUrl={heroUrl}
              list={slideshow_images}
              orderList={manualOrderOfSlideshowImages}
            />
          </div>
        )
      } else {
        leadingJsx = null
      }
      break
    }
    case TOPIC_LEADING.IMAGE:
    default: {
      if (heroImage) {
        const images = getHeroImage(heroImage)

        if (heroUrl) {
          leadingJsx = (
            <a target="_blank" href={heroUrl} className="leading-wrapper">
              <CustomImage
                images={images.resized}
                imagesWebP={images.resizedWebp}
                objectFit="contain"
                alt="topic 首圖"
              />
            </a>
          )
        } else {
          leadingJsx = (
            <div className="leading-wrapper">
              <CustomImage
                className="leading-image"
                images={images.resized}
                imagesWebP={images.resizedWebp}
                objectFit="contain"
                alt="topic 首圖"
              />
            </div>
          )
        }
      } else {
        leadingJsx = null
      }
      break
    }
  }

  return (
    <>
      {/* custom styles */}
      {style && <style>{style}</style>}
      <main className="topic">{leadingJsx}</main>
    </>
  )
}
