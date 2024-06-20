import NextImage from 'next/image'
import NextLink from 'next/link'
import { SOCIAL_LINKS, type SocialLinks } from '@/constants/misc'
import IconMirrorDaily from '@/public/icons/logos/mirror-daily.svg'
import IconFacebook from '@/public/icons/logos/facebook-white.svg'
import IconInstagram from '@/public/icons/logos/instagram-white.svg'
import IconThreads from '@/public/icons/logos/threads-white.svg'
import IconYouTube from '@/public/icons/logos/youtube-white.svg'
import IconLine from '@/public/icons/logos/line-white.svg'
import { Fragment, type ReactElement } from 'react'

type PageLink = SocialLinks & {
  isExternal?: boolean
}

type ContactLink = SocialLinks & {
  text: string
}

export default function Footer(): ReactElement {
  // TODO: update url values
  const PAGE_LINKS: PageLink[] = [
    {
      name: '廣告業務',
      href: '/',
    },
    {
      name: '內容授權',
      href: '/',
    },
    {
      name: '下載APP',
      href: '/',
    },
    {
      name: '新聞自律',
      href: '/',
    },
  ]

  const CONTACT_LINKS: ContactLink[] = [
    {
      name: '鏡報客服',
      href: 'tel:+886(02)7737-4683',
      text: '(02)7737-4683',
    },
    {
      name: '客服信箱',
      href: 'mailto:movieservice@nexttv.com.tw',
      text: 'movieservice@nexttv.com.tw',
    },
  ]

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

  return (
    <footer className="flex w-full flex-col bg-[#212944]">
      <div className="flex w-full max-w-screen-lg flex-col items-center gap-y-5 self-center lg:flex-row lg:gap-y-0">
        <NextLink href="/">
          <NextImage
            className="order-1 mt-[34px] md:mt-[37px] lg:ml-10 lg:mt-0"
            src={IconMirrorDaily}
            alt="Mirror Daily"
            width={60}
            height={49}
          />
        </NextLink>
        <section className="order-2 text-center text-sm font-normal leading-[19px] tracking-[0.5px] lg:ml-9 lg:space-x-2 lg:leading-7">
          {CONTACT_LINKS.map(({ name, href, text }) => (
            <Fragment key={name}>
              <p className="text-[#a6a6a6] lg:inline-block">{name}</p>
              <a href={href} className="text-white lg:inline-block">
                {text}
              </a>
            </Fragment>
          ))}
        </section>
        <hr className="order-3 block h-px w-[200px] bg-[#a6a6a6] lg:order-4 lg:ml-[56.5px] lg:h-[76px] lg:w-px lg:bg-white" />
        <section
          className={`relative order-4 text-center text-sm font-normal leading-normal text-white lg:order-5 lg:my-9 lg:ml-[10.5px] lg:mr-[79px]`}
        >
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
        <section className="order-5 mb-5 mt-[26px] flex flex-row items-center gap-x-4 md:mb-[51px] md:mt-5 lg:order-3 lg:my-0 lg:ml-auto">
          {ExtendedSocialLinks.map(({ name, href, icon }) => (
            <a key={name} href={href}>
              <NextImage src={icon} alt={name} />
            </a>
          ))}
        </section>
      </div>
    </footer>
  )
}
