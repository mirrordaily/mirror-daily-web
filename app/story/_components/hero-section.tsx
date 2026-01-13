import CustomImage from '@/shared-components/custom-image'
import type { ReactNode } from 'react'
import Link from 'next/link'
import type { Contact } from '@/types/story'
import { getTagPageUrl, getSectionPageUrl } from '@/utils/site-urls'
import IconMirrorDaily from '@/public/icons/logos/mirror-daily-black.svg'
import NextImage from 'next/image'
import { storyGtmEvents } from '@/constants/gtm'
import type { Post } from '@/types/story'
import { DEFAULT_SECTION_COLOR, DEFAULT_SECTION_NAME } from '@/constants/misc'
import SocialShareBar from '@/shared-components/social-share-bar'

type Props = {
  postData: Post
}

export default function HeroSection({ postData }: Props) {
  const getAuthorsContent = (authors: Contact[]) => {
    const dotSeparator = (
      <span className="mx-1 inline-block size-0.5 bg-[#000928] align-middle opacity-20" />
    )
    const elements: ReactNode[] = []

    authors.forEach((author, index) => {
      const authorLink = (
        <Link prefetch={false} href={author.link} target="_blank">
          {author.name}
        </Link>
      )
      elements.push(authorLink)
      if (index < authors.length - 1) {
        elements.push(dotSeparator)
      }
    })
    return elements
  }

  const displayTags = [...postData.tags, ...postData.algoTags]

  return (
    <section className="mb-4 flex max-w-screen-sm flex-col items-center md:mb-6 md:w-[600px] md:max-w-none lg:mb-4 lg:w-[720px] lg:items-start">
      <figure className="order-1 mb-6 flex w-full flex-col lg:order-2 lg:mb-0">
        <div className="relative aspect-[375/250] w-full overflow-hidden md:aspect-auto md:h-[400px] lg:h-[480px]">
          <CustomImage
            images={postData.postMainImage.resized}
            imagesWebP={postData.postMainImage.resizedWebp}
            alt={postData.title}
          />
        </div>
        <figcaption className="mt-2 flex justify-center px-5 text-[13px] font-normal leading-normal text-[#7F8493] md:px-0 lg:mt-4">
          {postData.heroCaption}
        </figcaption>
      </figure>

      <div className="order-2 w-full px-5 md:px-0 lg:order-1">
        {postData.sections.length > 0 ? (
          <ul className="mb-1 flex text-sm/normal lg:mb-4 lg:font-bold lg:leading-none">
            {postData.sections.map((section) => (
              <Link
                prefetch={false}
                href={getSectionPageUrl(section.slug)}
                target="_blank"
                key={section.slug}
              >
                <li key={section.name} style={{ color: section.color }}>
                  {`｜${section.name}`}
                </li>
              </Link>
            ))}
          </ul>
        ) : (
          <p
            style={{ color: DEFAULT_SECTION_COLOR }}
            className="mb-1 text-sm/normal lg:mb-4 lg:font-bold lg:leading-none"
          >{`｜${DEFAULT_SECTION_NAME}`}</p>
        )}
        <h1 className="mb-3 break-all text-[32px] font-normal leading-[45px] text-[#212944] md:mb-1 lg:mb-4">
          {postData.title}
        </h1>
        <h2 className="mb-3 text-xl font-bold leading-[1.4] text-[#212944] lg:mb-4">
          {postData.subtitle}
        </h2>

        <div className="fixed bottom-[135px] right-3 z-story-share-bar md:hidden">
          <SocialShareBar
            title={postData.title}
            link={postData.link}
            direction="vertical"
          />
        </div>

        <div className="relative mb-3 h-7 w-[58px] lg:mb-4 lg:h-[42px] lg:w-[88px]">
          <NextImage src={IconMirrorDaily} fill alt="mirror-daily-logo" />
        </div>

        <div className="mb-4 flex flex-col gap-y-1 text-[13px] font-normal leading-normal text-[#7F8493] md:mb-3 lg:mb-4">
          <p>{postData.publishedTime}</p>
          {!!postData.writers.length && (
            <div className="flex">
              <p className="shrink-0">記者：</p>
              <p
                className={`flex flex-wrap items-center break-all ${storyGtmEvents.author}`}
              >
                {getAuthorsContent(postData.writers)}
              </p>
            </div>
          )}
          {!!postData.photographers.length && (
            <div className="flex">
              <p className="shrink-0">攝影：</p>
              <p
                className={`flex flex-wrap items-center break-all ${storyGtmEvents.photographer}`}
              >
                {getAuthorsContent(postData.photographers)}
              </p>
            </div>
          )}
          {!!postData.editors.length && (
            <div className="flex">
              <p className="shrink-0">編輯：</p>
              <p
                className={`flex flex-wrap items-center break-all ${storyGtmEvents.editor}`}
              >
                {getAuthorsContent(postData.editors)}
              </p>
            </div>
          )}
          {!!postData.mainWriters.length && (
            <div className="flex">
              <p
                className={`flex flex-wrap items-center break-all ${storyGtmEvents.writer}`}
              >
                {getAuthorsContent(postData.mainWriters)}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-x-2 gap-y-4 md:grid-cols-6 md:gap-x-3 lg:mb-4">
          {displayTags.map((item) => (
            <Link
              prefetch={false}
              href={getTagPageUrl(item.slug)}
              target="_blank"
              key={item.slug}
              className={`${storyGtmEvents.tag}`}
            >
              <div className="flex justify-center rounded bg-[#CCCED4] py-1 pl-[10px] pr-3 text-sm font-normal leading-[24px]">
                {item.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
