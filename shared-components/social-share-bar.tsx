'use client'
import IconShare from '@/public/icons/share-gray.svg'
import NextImage from 'next/image'
import { useShareHandler } from '@/hooks/use-share-handler'
import { useEffect, useState } from 'react'
import type { shortsGtmEvents } from '@/constants/gtm'
import IconLine from '@/public/icons/logos/line-green.svg'
import IconFacebook from '@/public/icons/logos/facebook-blue.svg'
import {
  SHARE_URL_FACEBOOK,
  SHARE_URL_LINE,
  SHARE_BAR_ICON_SIZE,
} from '@/constants/misc'

type Props = {
  title: string
  link?: string
  direction?: 'vertical' | 'horizontal'
  gtmEvents?: typeof shortsGtmEvents
}

export default function SocialShareBar({
  title,
  link,
  direction = 'horizontal',
  gtmEvents,
}: Props) {
  const { write, getPopupJsx } = useShareHandler()
  const [url, setUrl] = useState('')
  useEffect(() => {
    if (!link) setUrl(window.location.href)
    else setUrl(window.location.origin + link)
  }, [link])

  const handleLineShare = () => {
    const shareUrl = `${SHARE_URL_LINE}${encodeURIComponent(url)}`
    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <div
        className={
          direction === 'horizontal'
            ? `flex flex-row items-start gap-x-2`
            : `flex flex-col items-center gap-y-2`
        }
      >
        <a
          target="_blank"
          href={`${SHARE_URL_FACEBOOK}${url}`}
          className={`${gtmEvents ? gtmEvents.facebookShare : ''}`}
        >
          <NextImage
            src={IconFacebook}
            width={SHARE_BAR_ICON_SIZE}
            height={SHARE_BAR_ICON_SIZE}
            alt="Facebook 分享"
          />
        </a>
        <button
          onClick={handleLineShare}
          className={`${gtmEvents ? gtmEvents.lineShare : ''}`}
        >
          <NextImage
            src={IconLine}
            width={SHARE_BAR_ICON_SIZE}
            height={SHARE_BAR_ICON_SIZE}
            alt="Line 分享"
          />
        </button>
        <button
          onClick={() => {
            write({
              title,
              url,
            })
          }}
          className={`${gtmEvents ? gtmEvents.copyUrl : ''}`}
        >
          <NextImage
            src={IconShare}
            width={SHARE_BAR_ICON_SIZE}
            height={SHARE_BAR_ICON_SIZE}
            alt="分享連結"
          />
        </button>
      </div>
      {getPopupJsx({ children: undefined })}
    </>
  )
}
