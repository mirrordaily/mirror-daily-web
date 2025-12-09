import Image from 'next/image'
import Link from 'next/link'
import { IMAGE_PATH } from '@/constants/default-path'
import { getTagPageUrl, getSectionPageUrl } from '@/utils/site-urls'
import IconMirrorDaily from '@/public/icons/logos/mirror-daily-black.svg'
import { DEFAULT_SECTION_COLOR, DEFAULT_SECTION_NAME } from '@/constants/misc'
import type { ExternalPost } from '@/types/external'
import SocialShareBar from '@/shared-components/social-share-bar'

type Props = { externalPost: ExternalPost }
export default function ArticleIntro({ externalPost }: Props) {
  return (
    <section className="flex max-w-screen-sm flex-col items-center md:w-[600px] md:max-w-none lg:w-[720px]">
      <figure className="order-1 mb-6 w-full md:mb-2 lg:order-2 lg:mb-4">
        <div className="relative aspect-[3/2] w-full">
          <Image
            src={externalPost.thumb || IMAGE_PATH}
            alt={externalPost.title}
            fill
            style={{ objectFit: 'cover' }}
            unoptimized
          />
        </div>
        <figcaption className="mt-2 flex justify-center px-5 text-[13px] font-normal leading-normal text-[#7F8493] md:px-0 lg:mt-4">
          {externalPost.thumbCaption}
        </figcaption>
      </figure>
      <div className="order-2 w-full px-5 md:px-0 lg:order-1">
        {externalPost.sections.length > 0 ? (
          <ul className="mb-1 flex text-sm/normal lg:mb-4 lg:font-bold lg:leading-none">
            {externalPost.sections.map((section) => (
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
          <div
            style={{ color: DEFAULT_SECTION_COLOR }}
            className="mb-1 text-sm/normal lg:mb-4 lg:font-bold lg:leading-none"
          >{`｜${DEFAULT_SECTION_NAME}`}</div>
        )}
        <h1 className="mb-3 text-2xl font-black leading-[1.2] text-[#212944] lg:mb-4">
          {externalPost.title}
        </h1>
        <div className="fixed bottom-[135px] right-3 z-story-share-bar md:hidden">
          <SocialShareBar title={externalPost.title} direction="vertical" />
        </div>
        <div className="relative mb-3 h-7 w-[58px] lg:mb-4 lg:h-[42px] lg:w-[88px]">
          <Image src={IconMirrorDaily} fill alt="mirror-daily-logo" />
        </div>
        <div className="mb-4 flex flex-col gap-y-1 text-[13px] font-normal leading-normal text-[#7F8493] md:mb-3 lg:mb-4">
          <p>{externalPost.publishedTime}</p>
          {externalPost.partner && (
            <a href={externalPost.externalsLink} target="_blank">
              記者：{externalPost.partner}
            </a>
          )}
        </div>
        {externalPost.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-x-2 gap-y-4 md:mb-6 md:grid-cols-6 md:gap-x-3 lg:mb-4">
            {externalPost.tags.map((tag) => (
              <Link
                prefetch={false}
                href={getTagPageUrl(tag.slug)}
                target="_blank"
                key={tag.slug}
              >
                <div className="flex justify-center rounded bg-[#CCCED4] py-1 pl-[10px] pr-3 text-sm font-normal leading-[24px]">
                  {tag.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
