import NextImage from 'next/image'
import { CONTACT_LINKS, SOCIAL_LINKS } from '@/constants/misc'
import MobileToggleAndNav from './mobile-toggle-and-nav'
import NavList from './nav-list'
import FlashNewsList from './flash-news-list'
import IconSearch from '@/public/icons/miso-search-white.svg'
import IconLogo from '@/public/icons/logos/mirror-daily.svg'
import IconFacebook from '@/public/icons/header/facebook.svg'
import IconInstagram from '@/public/icons/header/instagram.svg'
import IconThreads from '@/public/icons/header/threads.svg'
import IconYouTube from '@/public/icons/header/youtube.svg'
import IconLine from '@/public/icons/header/line.svg'
import type { HeaderData, HeaderSection, HeaderTopic } from '@/types/common'
import type { FlashNews } from '@/types/homepage'
import { headerGtmEvents } from '@/constants/gtm'
import { isSectionItem } from '@/utils/common'
import ImagesAd from './images-ad'

const ExtendedSocialLinks = [
  {
    ...SOCIAL_LINKS[0],
    icon: IconLine,
  },
  {
    ...SOCIAL_LINKS[1],
    icon: IconFacebook,
  },
  {
    ...SOCIAL_LINKS[2],
    icon: IconInstagram,
  },
  {
    ...SOCIAL_LINKS[3],
    icon: IconThreads,
  },
  {
    ...SOCIAL_LINKS[4],
    icon: IconYouTube,
  },
] as const

const iconSizes: Record<(typeof ExtendedSocialLinks)[number]['name'], number> =
  {
    Facebook: 24,
    Threads: 22,
    Instagram: 24,
    YouTube: 32,
    LINE: 24,
  }

const [, ...CONTACT_LINKS_WITHOUT_FIRST] = CONTACT_LINKS

export default function UiHeader({
  data,
  flashNews,
}: {
  data: HeaderData[]
  flashNews: FlashNews[]
}) {
  const { sections, topics } = data.reduce<{
    sections: HeaderSection[]
    topics: HeaderTopic[]
  }>(
    (acc, item) => {
      if (isSectionItem(item)) {
        acc.sections.push(item)
      } else {
        acc.topics.push(item)
      }
      return acc
    },
    { sections: [], topics: [] }
  )

  return (
    <header className="w-full">
      <div className="flex h-[64px] items-center justify-center bg-mirror-blue-700 md:h-[68px] lg:h-[101px]">
        <div className="flex flex-1 items-center justify-between pl-4 pr-[21px] md:max-w-[1000px] md:pl-5 lg:max-w-screen-lg lg:px-9">
          <a
            href="/"
            className={`${headerGtmEvents.logo} relative h-12 w-[100px] md:h-[42px] md:w-[88px] lg:h-[77px] lg:w-[160px] lg:shrink-0`}
          >
            <NextImage
              src={IconLogo}
              fill
              alt="Logo"
              className="aspect-[150/42] md:aspect-auto"
            />
          </a>
          <div className="ml-auto lg:ml-[initial]">
            <div className="ml-auto mr-5 flex lg:mr-0">
              <a
                className={`${headerGtmEvents.search} flex h-[26px] w-24 items-center justify-center gap-x-[10px] rounded-[29px] border-2 border-white text-sm leading-normal text-white md:w-[124px] lg:w-full`}
                href="/search"
              >
                <span className="md:hidden">AI 搜尋</span>
                <span className="hidden md:block">AI 智慧搜尋</span>
                <span className="relative inline-block size-5">
                  <NextImage src={IconSearch} fill={true} alt="搜尋" />
                </span>
              </a>
            </div>
            <div className="mt-[13px] hidden items-center justify-between lg:flex">
              <div className="flex items-center space-x-[18px] lg:mr-[18px]">
                <ImagesAd />
                {CONTACT_LINKS_WITHOUT_FIRST.map((contactLink) => {
                  return (
                    <a
                      key={contactLink.href + contactLink.name}
                      className={`${
                        headerGtmEvents[contactLink?.gtmKey] || ''
                      } header-submit-button`}
                      href={contactLink.href}
                    >
                      {contactLink.headerSubmitButtonName}
                    </a>
                  )
                })}
              </div>
              <div className="flex lg:shrink-0 lg:grow-0 lg:gap-x-2">
                {ExtendedSocialLinks.map(({ name, href, icon }) => {
                  const width = iconSizes[name] || 24
                  return (
                    <a
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${headerGtmEvents[name]}`}
                    >
                      <NextImage
                        src={icon}
                        alt={name}
                        width={width}
                        height={24}
                      />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
          <MobileToggleAndNav sections={sections} />
        </div>
      </div>
      <hr className="h-px w-full bg-[#ccced4] md:hidden" />
      <div className="mx-auto pb-[3px] md:max-w-[1000px] md:pb-[9px] lg:max-w-screen-lg lg:pb-[17px]">
        <div className="mt-2 w-full overflow-x-auto overflow-y-hidden pl-4 pr-0 md:pl-5 lg:mt-[15px] lg:overflow-visible lg:px-9">
          <NavList sections={sections} topics={topics} />
        </div>
        <div className="mt-[14px] flex w-full grow items-start pl-4 text-lg md:mt-[7px] md:pl-5 md:text-base lg:mt-3 lg:px-9">
          <p className="mr-[18px] mt-1 shrink-0 font-bold leading-none text-[#FF5457] md:mr-[7px] lg:mr-3">
            快訊
          </p>
          <FlashNewsList items={flashNews} />
        </div>
      </div>
    </header>
  )
}
