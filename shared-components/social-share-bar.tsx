'use client'
import IconShare from '@/public/icons/share-gray.svg'
import NextImage from 'next/image'
import { useShareHandler } from '@/hooks/use-share-handler'
import { useEffect, useState } from 'react'
import type { shortsGtmEvents } from '@/constants/gtm'
import { FacebookShareButton, LineShareButton } from 'react-share'
import { FacebookIcon, LineIcon } from 'react-share'

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

  return (
    <>
      <div
        className={
          direction === 'horizontal'
            ? `flex flex-row items-start gap-x-2`
            : `flex flex-col items-center gap-y-2`
        }
      >
        <FacebookShareButton url={url}>
          <FacebookIcon size={35} round />
        </FacebookShareButton>

        <LineShareButton url={url}>
          <LineIcon size={35} round />
        </LineShareButton>

        <button
          onClick={() => {
            write({
              title,
              url,
            })
          }}
          className={`${gtmEvents ? gtmEvents.copyUrl : ''}`}
        >
          <NextImage src={IconShare} width={35} height={35} alt="分享連結" />
        </button>
      </div>
      {getPopupJsx({ children: undefined })}
    </>
  )
}
