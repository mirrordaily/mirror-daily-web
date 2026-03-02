'use client'

import PromoteTopicItem from './item'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import type { PromoteTopicData } from '@/types/homepage'
import { useState } from 'react'

type Props = {
  list: PromoteTopicData[]
}

export default function SwiperComponent({ list }: Props) {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="fixed right-[20px] top-1/2 z-promote-topic">
      <button
        onClick={() => setVisible(false)}
        className="absolute right-0 top-0 z-20 flex size-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-mirror-blue-200 p-[5px] text-black shadow-[0_2.47px_2.47px_0_#00000040]"
      >
        X
      </button>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
        }}
        loop={true}
        className="relative"
      >
        {list
          .filter((item) => item.topics)
          .map((item) => (
            <SwiperSlide key={item.id} className="relative">
              <PromoteTopicItem post={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  )
}
