'use client'

import type { Shorts } from '@/types/common'
import { useState } from 'react'
import ShortsItem from './item'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, Mousewheel } from 'swiper/modules'

import 'swiper/css'
import { useAppSelector } from '@/redux/hooks'
import { selectIsModalOpened } from '@/redux/shorts-upload/selector'

type Props = {
  items: Shorts[]
  shouldChangePathOnSlideChange?: boolean
}

export default function VideoBlock({
  items,
  shouldChangePathOnSlideChange,
}: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [volume, setVolume] = useState(0)
  const isModalOpened = useAppSelector(selectIsModalOpened)

  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        grabCursor={true}
        direction="vertical"
        modules={[Keyboard, Mousewheel]}
        mousewheel={true}
        keyboard={true}
        onInit={(swiper) => {
          setActiveIndex(swiper.realIndex)
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex)
          if (shouldChangePathOnSlideChange) {
            const url = items[swiper.realIndex]?.link
            window.history.replaceState(null, '', url)
          }
        }}
        className="shorts-swiper-in-shorts-page"
        breakpoints={{
          720: {
            spaceBetween: 60,
          },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <ShortsItem
              {...item}
              isActive={activeIndex === index && !isModalOpened}
              volume={volume}
              onPause={() => setActiveIndex(null)}
              onPlay={() => setActiveIndex(index)}
              setVolume={setVolume}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
