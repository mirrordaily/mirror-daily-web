import NextImage from 'next/image'
import NextLink from 'next/link'
import { SOCIAL_LINKS } from '@/constants/misc'
import MobileToggleAndNav from './header/mobile-toggle-and-nav'
import DesktopNavList from './header/desktop-nav-list'
import { fetchSectionsAndCategories } from '@/app/action'
import IconSearch from '@/public/icons/search.svg'
import IconLogo from '@/public/icons/logos/mirror-daily-full-color.svg'
import IconFacebook from '@/public/icons/logos/facebook-black.svg'
import IconInstagram from '@/public/icons/logos/instagram-black.svg'
import IconThreads from '@/public/icons/logos/threads-black.svg'
import IconYouTube from '@/public/icons/logos/youtube-black.svg'
import IconLine from '@/public/icons/logos/line-black.svg'
import IconMirrorMedia from '@/public/icons/logos/mirror-media.svg'
import IconMirrorFiction from '@/public/icons/logos/mirror-fiction.png'
import IconMirrorNews from '@/public/icons/logos/mirror-news.svg'

export default async function Header() {
  const ExtendedSocialLinks = [
    {
      ...SOCIAL_LINKS[0],
      icon: IconFacebook,
    },
    {
      ...SOCIAL_LINKS[1],
      icon: IconInstagram,
    },
    {
      ...SOCIAL_LINKS[2],
      icon: IconThreads,
    },
    {
      ...SOCIAL_LINKS[3],
      icon: IconYouTube,
    },
    {
      ...SOCIAL_LINKS[4],
      icon: IconLine,
    },
  ] as const

  const data = await fetchSectionsAndCategories()

  return (
    <header className="flex h-[150px] w-full shrink-0 flex-col items-center md:h-[134px] md:w-[720px] lg:h-[144px] lg:w-[1200px]">
      <div className="flex h-[68px] w-full max-w-[375px] pl-[17px] pr-5 md:max-w-none md:pl-6 lg:h-[82px] lg:pl-5">
        <MobileToggleAndNav data={data} />
        <div className="hidden overflow-hidden lg:order-2 lg:flex lg:grow">
          <DesktopNavList data={data} />
        </div>
        <button className="ml-5 mt-[22px] h-7 shrink-0 rounded-[29px] bg-[#D94141] px-[10px] py-[3px] text-[15px] font-normal leading-[22px] text-white md:ml-[18px] md:mt-6 md:h-5 md:px-[6px] md:py-0 md:text-[13px] md:leading-5 lg:order-3 lg:ml-[26px] lg:mt-[30px] lg:h-7 lg:px-[10px] lg:py-[3px] lg:text-[15px] lg:leading-[22px]">
          我要爆料
        </button>
        <div className="ml-4 mt-[26px] flex shrink-0 md:ml-[18px] md:mt-6 md:gap-x-[5px] lg:order-4 lg:ml-3 lg:mt-[34px] lg:gap-x-[6px]">
          <input
            type="text"
            name="search"
            placeholder="請輸入關鍵字"
            className="hidden h-5 w-[104px] rounded-[7px] border-[0.5px] border-[#000928] bg-[#F6F6FB] px-4 py-px text-xs font-normal leading-normal outline-none placeholder:text-[#7F8493] md:inline-block lg:h-[23px] lg:w-[140px] lg:px-[14px] lg:text-sm"
          />
          <button className="relative inline-block size-[23px] md:h-5 md:w-[18.5px] lg:mt-1 lg:h-4 lg:w-[14.86px]">
            <NextImage src={IconSearch} fill={true} alt="搜尋" />
          </button>
        </div>
        <div className="hidden lg:order-5 lg:ml-3 lg:mt-[39px] lg:flex lg:shrink-0 lg:grow-0 lg:gap-x-2">
          {ExtendedSocialLinks.map(({ name, href, icon }) => (
            <a key={name} href={href} target="_blank">
              <NextImage src={icon} alt={name} />
            </a>
          ))}
        </div>
        <NextLink
          href="/"
          className="relative ml-[18px] mt-4 h-9 w-[157px] md:ml-auto md:mt-5 md:h-12 md:w-[206px] lg:order-1 lg:ml-0 lg:mr-4 lg:mt-7 lg:h-[50px] lg:w-[214] lg:shrink-0"
        >
          <NextImage
            src={IconLogo}
            fill={true}
            alt="Logo"
            className="aspect-[157/18] md:aspect-auto"
          />
        </NextLink>
      </div>
      <hr className="h-px w-full bg-[#ccced4] md:hidden" />
      <div className="flex w-full max-w-[375px] grow items-start px-[23px] pb-1 pt-[18px] text-sm md:max-w-none md:items-end md:px-5 md:pb-[10px] md:pt-0 lg:pb-2 lg:text-base">
        <p className="ml-[13px] mr-8 shrink-0 font-bold leading-normal text-[#D94141] md:ml-0 md:mr-2 lg:ml-[17px] lg:mr-3">
          快訊
        </p>
        {/* 快訊清單*/}
        <div className="mb-[2px] ml-[22px] hidden shrink-0 gap-x-3 md:flex lg:mb-[6px]">
          <a target="_blank" href="https://www.mirrormedia.mg/">
            <NextImage
              src={IconMirrorMedia}
              width={37.85}
              height={16}
              alt="鏡週刊"
            />
          </a>
          <a target="_blank" href="https://www.mirrorfiction.com/">
            <NextImage
              src={IconMirrorFiction}
              width={66}
              height={16}
              alt="鏡文學"
            />
          </a>
          <a target="_blank" href="https://www.mnews.tw/">
            <NextImage
              src={IconMirrorNews}
              width={52}
              height={16}
              alt="鏡電視"
            />
          </a>
        </div>
      </div>
    </header>
  )
}
