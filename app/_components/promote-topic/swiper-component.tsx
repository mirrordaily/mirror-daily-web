'use client'

import PromoteTopicItem from './item'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import type { PromoteTopicData } from '@/types/homepage'
import { useState } from 'react'

type Props = {
  list: PromoteTopicData[]
}

export default function SwiperComponent({ list }: Props) {
  const [visible, setVisible] = useState(true)
  const validList = list.filter((item) => item.topics)

  if (!visible || !validList.length) return null

  return (
    <div className="fixed right-[20px] top-1/2 z-promote-topic w-[75px] lg:w-[120px]">
      <button
        onClick={() => setVisible(false)}
        className="absolute right-0 top-0 z-20 flex size-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-mirror-blue-200 p-[5px] text-black shadow-[0_2.47px_2.47px_0_#00000040]"
      >
        X
      </button>
      <Swiper
        modules={[Autoplay, Pagination]}
        pagination={{
          clickable: true,
          el: '.promote-topic-pagination',
          bulletClass: 'promote-topic-swiper-bullet',
          bulletActiveClass: 'promote-topic-swiper-bullet-active',
          horizontalClass: 'promote-topic-swiper-pagination-horizontal',
        }}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
        }}
        loop={validList.length > 1}
        className="relative"
      >
        {validList.map((item) => (
          <SwiperSlide key={item.id} className="relative">
            <PromoteTopicItem post={item} />
          </SwiperSlide>
        ))}
        <div className="promote-topic-pagination" />
      </Swiper>
    </div>
  )
}
