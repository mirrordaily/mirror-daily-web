import NextImage from 'next/image'
import { CONTACT_LINKS, SOCIAL_LINKS } from '@/constants/misc'
import MobileToggleAndNav from './mobile-toggle-and-nav'
import DesktopNavList from './desktop-nav-list'
import FlashNewsList from './flash-news-list'
import IconSearch from '@/public/icons/miso-search-white.svg'
import IconLogo from '@/public/icons/logos/mirror-daily.svg'
import IconFacebook from '@/public/icons/logos/facebook-black.svg'
import IconInstagram from '@/public/icons/logos/instagram-black.svg'
import IconThreads from '@/public/icons/logos/threads-black.svg'
import IconYouTube from '@/public/icons/logos/youtube-black.svg'
import IconLine from '@/public/icons/logos/line-black.svg'
import IconChevronRight from '@/public/icons/chevron-right.svg'
import type { HeaderData } from '@/types/common'
import { getTopicPageUrl } from '@/utils/site-urls'
import { isSectionItem } from '@/utils/common'
import type { FlashNews } from '@/types/homepage'
import { headerGtmEvents } from '@/constants/gtm'

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
  return (
    <header className="flex w-full shrink-0 flex-col items-center">
      <div className="flex h-[64px] w-full justify-center bg-mirror-blue-700 md:h-[95px] lg:h-[80px]">
        <div className="flex w-full max-w-screen-sm pl-4 pr-6 md:max-w-screen-md md:pl-5 lg:max-w-screen-lg lg:px-9">
          <a
            href="/"
            className={`${headerGtmEvents.logo} relative mt-2 h-12 w-[161px] md:mt-5 md:h-[58px] md:w-[120px] lg:mt-3 lg:shrink-0`}
          >
            <NextImage
              src={IconLogo}
              fill
              alt="Logo"
              className="aspect-[150/42] md:aspect-auto"
            />
          </a>

          <div className="flex w-full justify-end">
            <div className="ml-auto mr-4 mt-5 flex shrink-0 md:mt-10 md:gap-x-[5px] lg:mr-0 lg:mt-8 lg:gap-x-[7px]">
              <a
                className={`${headerGtmEvents.search} flex h-[26px] w-24 items-center justify-center gap-x-[10px] rounded-[29px] border-2 border-white text-sm leading-normal text-white md:w-[124px]`}
                href="/search"
              >
                <span className="md:hidden">AI 搜尋</span>
                <span className="hidden md:block">AI 智慧搜尋</span>
                <span className="relative inline-block size-5">
                  <NextImage src={IconSearch} fill={true} alt="搜尋" />
                </span>
              </a>
            </div>
            {CONTACT_LINKS_WITHOUT_FIRST.map((contactLink) => {
              return (
                <a
                  key={contactLink.href + contactLink.name}
                  className={`${
                    headerGtmEvents[contactLink?.gtmKey] || ''
                  } header-submit-button ml-3 first:ml-0`}
                  href={contactLink.href}
                >
                  {contactLink.headerSubmitButtonName}
                </a>
              )
            })}
          </div>
          <MobileToggleAndNav data={data} />
        </div>
      </div>
      <hr className="h-px w-full bg-[#ccced4] md:hidden" />
      <div className="flex w-full max-w-screen-sm grow pb-[3px] pl-[17px] pr-[23px] pt-4 md:max-w-screen-md md:pb-[9px] md:pl-5 md:pr-6 md:pt-2 lg:max-w-screen-lg lg:flex-col lg:px-9 lg:pb-[17px] lg:pt-[13px]">
        <div className="flex">
          <div className="hidden gap-x-4 overflow-hidden text-[22px] font-medium leading-[26px] text-[#2B2B2B] lg:flex lg:grow">
            {data
              .filter((item) => !isSectionItem(item))
              .map((item) => {
                return (
                  <a
                    key={item.slug}
                    href={getTopicPageUrl(item.slug)}
                    className={`inline-block truncate ${headerGtmEvents.topic}`}
                  >
                    {item.name}
                  </a>
                )
              })}
            <a
              href="/topic"
              className="inline-flex items-center whitespace-nowrap text-primary-500"
            >
              看所有專題
              <NextImage
                src={IconChevronRight}
                alt="右鍵"
                className="shrink-0"
              />
            </a>
          </div>
          <div className="hidden lg:flex lg:shrink-0 lg:grow-0 lg:gap-x-2">
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
                  <NextImage src={icon} alt={name} width={width} height={24} />
                </a>
              )
            })}
          </div>
        </div>
        <div className="mt-[14px] hidden lg:flex">
          <DesktopNavList data={data} />
        </div>
        <div className="flex w-full grow items-start text-lg md:text-base lg:mt-[9px]">
          <p className="mr-[18px] mt-1 shrink-0 font-bold leading-none text-[#FF5457] md:mr-[7px] lg:mr-3">
            快訊
          </p>
          <FlashNewsList items={flashNews} />
        </div>
      </div>
    </header>
  )
}
