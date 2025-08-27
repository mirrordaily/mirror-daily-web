'use client'
import NextImage from 'next/image'
import { SOCIAL_LINKS } from '@/constants/misc'
import IconFacebook from '@/public/icons/logos/facebook-blue-square.svg'
import IconLine from '@/public/icons/logos/line-green-square.svg'
import IconThreads from '@/public/icons/logos/threads-dark-black.svg'
import IconYouTube from '@/public/icons/logos/youtube-red.svg'
import { SHARE_URL_FACEBOOK, SHARE_URL_LINE } from '@/constants/misc'
import { useState, useEffect } from 'react'

const ExtendedSocialLinks = [
  {
    size: { width: 24, height: 24 },
    text: '分享臉書',
    href: SHARE_URL_FACEBOOK,
    isShare: true,
    name: 'Facebook share',
    icon: IconFacebook,
  },
  {
    size: { width: 24, height: 24 },
    text: '分享 LINE',
    href: SHARE_URL_LINE,
    isShare: true,
    name: 'Line share',
    icon: IconLine,
  },
  {
    ...SOCIAL_LINKS[0],
    size: { width: 20, height: 20 },
    text: '加好友',
    isShare: false,
    icon: IconLine,
  },
  {
    ...SOCIAL_LINKS[1],
    size: { width: 20, height: 20 },
    text: '追蹤',
    isShare: false,
    icon: IconFacebook,
  },
  {
    ...SOCIAL_LINKS[3],
    size: { width: 18, height: 20 },
    text: '追蹤',
    isShare: false,
    icon: IconThreads,
  },
  {
    ...SOCIAL_LINKS[4],
    size: { width: 20, height: 15 },
    text: '訂閱',
    isShare: false,
    icon: IconYouTube,
  },
] as const

function SocialButton({
  item,
  link,
}: {
  item: (typeof ExtendedSocialLinks)[number]
  link: string
}) {
  const [url, setUrl] = useState('')
  useEffect(() => {
    if (!link) setUrl(window.location.href)
    else setUrl(window.location.origin + link)
  }, [link])
  return (
    <a
      className={`${item.isShare ? 'px-3 py-2' : 'px-2 py-1'} flex items-center gap-x-1 rounded border border-[#CCCED4]`}
      target="_blank"
      href={item.isShare ? `${item.href}${url}` : item.href}
    >
      <NextImage
        src={item.icon}
        width={item.size.width}
        height={item.size.height}
        alt={item.name}
      />
      <p className="text-sm font-normal leading-6 tracking-normal text-[#212944]">
        {item.text}
      </p>
    </a>
  )
}

export default function SocialSharePanel({ link }: { link: string }) {
  return (
    <div className="mx-auto mt-8 flex flex-col items-center justify-center gap-y-3 md:max-w-none">
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-3">
        {ExtendedSocialLinks.map((item, index) => (
          <SocialButton key={index} item={item} link={link} />
        ))}
      </div>
    </div>
  )
}
