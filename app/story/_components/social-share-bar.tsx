'use client'
import { SHARE_URL_FACEBOOK, SHARE_URL_LINE } from '@/constants/misc'
import IconFacebook from '@/public/icons/logos/facebook-blue.svg'
import IconLine from '@/public/icons/logos/line-green.svg'
import IconShare from '@/public/icons/share-gray.svg'
import NextImage from 'next/image'
import { useShareHandler } from '@/hooks/use-share-handler'

type Props = {
  title: string
  storyLink: string
}

export default function SocialShareBar({ title, storyLink }: Props) {
  const url = window.location.origin + storyLink

  return (
    <div className="flex flex-row items-start gap-x-2">
      <a target="_blank" href={`${SHARE_URL_FACEBOOK}${url}`}>
        <button>
          <NextImage src={IconFacebook} width={35} height={35} alt="分享" />
        </button>
      </a>

      <a target="_blank" href={`${SHARE_URL_LINE}${url}`}>
        <button>
          <NextImage src={IconLine} width={35} height={35} alt="分享" />
        </button>
      </a>

      <button onClick={useShareHandler(title, url)}>
        <NextImage src={IconShare} width={35} height={35} alt="分享" />
      </button>
    </div>
  )
}
