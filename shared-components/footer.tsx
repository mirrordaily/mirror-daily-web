import NextImage from 'next/image'
import NextLink from 'next/link'
import {
  SOCIAL_LINKS,
  PAGE_LINKS,
  CONTACT_LINKS,
  SITE_LINKS,
} from '@/constants/misc'
import IconMirrorDaily from '@/public/icons/logos/mirror-daily-full-color.svg'
import IconFacebook from '@/public/icons/logos/facebook-white.svg'
import IconInstagram from '@/public/icons/logos/instagram-white.svg'
import IconThreads from '@/public/icons/logos/threads-white.svg'
import IconYouTube from '@/public/icons/logos/youtube-white.svg'
import IconLine from '@/public/icons/logos/line-white.svg'
import { Fragment, type ReactElement } from 'react'
import IconMirrorMedia from '@/public/icons/logos/mirror-media-white.svg'
import IconMirrorFiction from '@/public/icons/logos/mirror-fiction.png'
import IconMirrorNews from '@/public/icons/logos/mirror-news-white.svg'

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

const SocialLinksList = () => {
  return (
    <div className="flex flex-row items-center gap-x-4">
      {ExtendedSocialLinks.map(({ name, href, icon }) => (
        <a key={name} href={href} target="_blank">
          <NextImage src={icon} alt={name} />
        </a>
      ))}
    </div>
  )
}

export default function Footer(): ReactElement {
  return (
    <footer className="flex w-full flex-col bg-[#3B1E86]">
      <div className="flex w-full max-w-screen-lg flex-col items-center self-center lg:flex-row lg:gap-y-0">
        <NextLink href="/" className="order-1 mt-5 md:mt-7 lg:ml-5 lg:mt-0">
          <NextImage
            src={IconMirrorDaily}
            alt="Mirror Daily"
            width={120}
            height={32}
          />
        </NextLink>
        <section className="order-2 mt-[15px] text-center text-sm font-normal leading-[20px] tracking-[0.5px] md:mt-4 lg:ml-[33px] lg:mt-0 lg:space-x-2">
          {CONTACT_LINKS.map(({ name, href, text }) => (
            <Fragment key={name}>
              <p className="text-[#a6a6a6] lg:inline-block">{name}</p>
              <a href={href} className="text-white lg:inline-block">
                {text}
              </a>
            </Fragment>
          ))}
          {/* TODO: 連結 */}
          <p className="hidden text-xs leading-loose text-white lg:block">
            本網頁使用
            <a href="/" className="text-[#1C7CED]">
              {' '}
              YouTube API 服務
            </a>
            ，詳見
            <a href="/" className="text-[#1C7CED]">
              {' '}
              YouTube 服務條款
            </a>
            、
            <a href="/" className="text-[#1C7CED]">
              {' '}
              Google 隱私權與條款
            </a>
          </p>
          <div className="hidden lg:mt-2 lg:block">
            <SocialLinksList />
          </div>
        </section>
        {/* TODO: 距離未設 */}
        <section className="order-3 mt-[35px] flex md:mt-[49px] lg:ml-[189px] lg:mt-0">
          <a target="_blank" href={SITE_LINKS[0].href}>
            <NextImage
              src={IconMirrorMedia}
              width={57.49}
              height={24.39}
              alt={SITE_LINKS[0].name}
            />
          </a>
          <a target="_blank" href={SITE_LINKS[1].href}>
            <NextImage
              src={IconMirrorFiction}
              width={99}
              height={24}
              alt={SITE_LINKS[1].name}
            />
          </a>
          <a target="_blank" href={SITE_LINKS[2].href}>
            <NextImage
              src={IconMirrorNews}
              width={76}
              height={24}
              alt={SITE_LINKS[2].name}
            />
          </a>
        </section>
        <hr className="order-4 mb-[14px] mt-[29px] block h-px w-[200px] bg-[#a6a6a6] md:mb-[15px] md:mt-[30px] lg:order-4 lg:mb-[42px] lg:ml-[26px] lg:mt-[38px] lg:h-[76px] lg:w-px lg:bg-white" />
        <section className="relative order-5 text-center text-sm font-normal leading-[20px] text-white lg:order-5 lg:my-[38px] lg:ml-[10.5px]">
          {PAGE_LINKS.map(({ name, href, isExternal }) => (
            <NextLink
              className="block"
              key={name}
              href={href}
              target={isExternal ? '_blank' : '_self'}
            >
              {name}
            </NextLink>
          ))}
        </section>
        <section className="order-6 my-5 md:mb-[28px] md:mt-[15px] lg:hidden">
          <SocialLinksList />
        </section>
      </div>
    </footer>
  )
}
