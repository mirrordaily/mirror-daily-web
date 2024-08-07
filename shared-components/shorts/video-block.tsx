'use client'

import type { Shorts } from '@/types/homepage'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard } from 'swiper/modules'

import 'swiper/css'

type Props = {
  items: Shorts[]
}

export default function VideoBlock({ items }: Props) {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        grabCursor={true}
        direction="vertical"
        modules={[Keyboard]}
        keyboard={true}
        onInit={(swiper) => {
          setActiveIndex(swiper.realIndex)
        }}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper.realIndex)
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
            {/* Item */}
            {JSON.stringify(item)}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
