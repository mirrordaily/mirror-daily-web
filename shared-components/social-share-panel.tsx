'use client'
import NextImage from 'next/image'
import { SOCIAL_LINKS } from '@/constants/misc'
import IconFacebook from '@/public/icons/logos/facebook-blue-square.svg'
import IconLine from '@/public/icons/logos/line-green-square.svg'
import IconThreads from '@/public/icons/logos/threads-dark-black.svg'
import IconYouTube from '@/public/icons/logos/youtube-red.svg'
import IconShare from '@/public/icons/share-purple.svg'
import { SHARE_URL_FACEBOOK, SHARE_URL_LINE } from '@/constants/misc'
import { useState, useEffect } from 'react'
import { useShareHandler } from '@/hooks/use-share-handler'

enum SOCIAL_TYPE {
  SHARE = 'share',
  COPY = 'copy',
  FOLLOW = 'follow',
}

const ExtendedSocialLinks = [
  {
    type: SOCIAL_TYPE.SHARE,
    size: { width: 24, height: 24 },
    text: '分享臉書',
    href: SHARE_URL_FACEBOOK,
    name: 'FacebookShare',
    icon: IconFacebook,
  },
  {
    type: SOCIAL_TYPE.SHARE,
    size: { width: 24, height: 24 },
    text: '分享 LINE',
    href: SHARE_URL_LINE,
    name: 'LineShare',
    icon: IconLine,
  },
  {
    type: SOCIAL_TYPE.COPY,
    size: { width: 24, height: 24 },
    text: '複製連結',
    name: 'copyLink',
    icon: IconShare,
    href: '',
  },
  {
    type: SOCIAL_TYPE.FOLLOW,
    ...SOCIAL_LINKS[0],
    size: { width: 20, height: 20 },
    text: '加好友',
    icon: IconLine,
  },
  {
    type: SOCIAL_TYPE.FOLLOW,
    ...SOCIAL_LINKS[1],
    size: { width: 20, height: 20 },
    text: '追蹤',
    icon: IconFacebook,
  },
  {
    type: SOCIAL_TYPE.FOLLOW,
    ...SOCIAL_LINKS[3],
    size: { width: 18, height: 20 },
    text: '追蹤',
    icon: IconThreads,
  },
  {
    type: SOCIAL_TYPE.FOLLOW,
    ...SOCIAL_LINKS[4],
    size: { width: 20, height: 15 },
    text: '訂閱',
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

  const encodedUrl = encodeURIComponent(url)

  const href =
    item.type === SOCIAL_TYPE.SHARE ? `${item.href}${encodedUrl}` : item.href

  return (
    <a
      className={`${item.type === SOCIAL_TYPE.SHARE ? 'px-3 py-2' : 'px-2 py-1'} flex items-center gap-x-1 rounded border border-[#CCCED4] md:min-h-[42px]`}
      rel="noopener noreferrer"
      target="_blank"
      href={href}
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

function CopyLinkButton({
  item,
  link,
  title,
}: {
  item: (typeof ExtendedSocialLinks)[number]
  link: string
  title: string
}) {
  const [url, setUrl] = useState('')
  useEffect(() => {
    if (!link) setUrl(window.location.href)
    else setUrl(window.location.origin + link)
  }, [link])
  const { write, getPopupJsx } = useShareHandler()

  return (
    <div className="flex items-center rounded border border-[#CCCED4] px-2 py-1">
      <button
        onClick={() => {
          write({
            title,
            url,
          })
        }}
        className="flex items-center gap-x-1"
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
      </button>
      {getPopupJsx({ children: undefined })}
    </div>
  )
}

export default function SocialSharePanel({
  link,
  title,
  hideShareButtons = false,
}: {
  link: string
  title: string
  hideShareButtons?: boolean
}) {
  const filteredLinks = hideShareButtons
    ? ExtendedSocialLinks.filter((item) => item.type == SOCIAL_TYPE.FOLLOW)
    : ExtendedSocialLinks

  return (
    <div className="mx-auto mt-8 flex flex-col items-center justify-center gap-y-3 md:max-w-none">
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-3">
        {filteredLinks.map((item, index) => {
          if (item.type === SOCIAL_TYPE.COPY) {
            return (
              <CopyLinkButton
                key={item.name}
                item={item}
                link={link}
                title={title}
              />
            )
          }

          return <SocialButton key={index} item={item} link={link} />
        })}
      </div>
    </div>
  )
}
