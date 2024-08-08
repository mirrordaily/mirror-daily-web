'use client'

import type { Shorts } from '@/types/common'
import type { ChangeEvent, CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import NextImage from 'next/image'
import ReactPlayer from 'react-player/lazy'
import IconShare from '@/public/icons/shorts/share.svg'
import IconShareWhite from '@/public/icons/shorts/share-white.svg'
import IconPlay from '@/public/icons/shorts/play.svg'
import IconPause from '@/public/icons/shorts/pause.svg'
import IconVolume from '@/public/icons/shorts/volume.svg'

type Props = Shorts & {
  isActive: boolean
  volume: number
  onPlay: () => void
  onPause: () => void
  setVolume: (volume: number) => void
}

export default function ShortsItem({
  title,
  fileUrl,
  poster,
  contributor,
  isActive,
  volume,
  onPlay,
  onPause,
  setVolume,
}: Props) {
  const [isClientSide, setIsClientSide] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const volumeSliderRef = useRef<HTMLElement>(null)

  useOnClickOutside(volumeSliderRef, () => {
    if (showVolumeSlider) setShowVolumeSlider(false)
  })

  useEffect(() => {
    setIsClientSide(true)
  }, [])

  const volumeChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value, 10) / 100
    setVolume(newVolume)
  }

  return (
    <div className="relative h-full">
      <div className="shorts-container">
        {isClientSide && (
          <ReactPlayer
            url={fileUrl}
            width="100%"
            height="100%"
            controls={false}
            loop={true}
            volume={volume}
            playing={isActive}
            playsinline={true}
            config={{
              file: {
                attributes: {
                  poster,
                },
              },
            }}
          />
        )}
        <section
          className="absolute inset-x-7 top-4 flex gap-x-3"
          ref={volumeSliderRef}
        >
          {isActive ? (
            <button className="control shrink-0" onClick={onPause}>
              <NextImage src={IconPause} width={8} height={10} alt="暫停" />
            </button>
          ) : (
            <button className="control shrink-0" onClick={onPlay}>
              <NextImage src={IconPlay} width={10} height={10} alt="播放" />
            </button>
          )}

          <div className="flex items-center gap-x-3">
            <button
              className={`control ${showVolumeSlider ? '!bg-[#E5E6E9]' : ''}`}
              onClick={() => setShowVolumeSlider(!showVolumeSlider)}
            >
              <NextImage src={IconVolume} width={9} height={9} alt="音量控制" />
            </button>
            {showVolumeSlider && (
              <input
                className="volume-slider"
                type="range"
                min={0}
                max={100}
                step={1}
                value={Math.floor(volume * 100)}
                onChange={volumeChangeHandler}
                style={
                  {
                    '--shorts-volume': `${volume * 100}%`,
                  } as CSSProperties
                }
              />
            )}
          </div>
        </section>
        <div className="absolute inset-x-0 bottom-0 h-[135px] bg-[linear-gradient(180deg,transparent_0%,#ADADAD_80.00%,#2D2D2D_99.35%)]">
          <div className="absolute inset-x-6 bottom-5 text-sm leading-normal text-white md:text-base">
            {!!contributor && (
              <div className="mb-2 flex max-w-[min(273px,100%)] items-center md:max-w-[min(320px,100%)]">
                <p className="whitespace-nowrap font-bold">投稿人</p>
                &nbsp;
                <p className="line-clamp-1 break-all font-normal md:font-bold">
                  {contributor}
                </p>
              </div>
            )}
            <p className="line-clamp-2 max-w-[240px] break-all font-normal md:max-w-[320px]">
              {title}
            </p>
          </div>
        </div>
        <button className="absolute -right-4 bottom-0 hidden translate-x-full rounded-full bg-[#E5E6E9] p-[7px] hover:bg-[#CCCED4] md:inline-block">
          <NextImage src={IconShare} width={20} height={20} alt="分享" />
        </button>
      </div>

      <button className="absolute bottom-[19px] right-[19px] inline-block rounded-full bg-[#7F8493] p-[7px] hover-or-active:bg-[#B2B5BE] md:hidden">
        <NextImage src={IconShareWhite} width={20} height={20} alt="分享" />
      </button>
    </div>
  )
}
