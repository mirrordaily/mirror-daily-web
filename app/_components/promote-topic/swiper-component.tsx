'use client'

import PromoteTopicItem from './item'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import type { PromoteTopicData } from '@/types/homepage'
import { useEffect, useState } from 'react'
import IConClose from '@/public/icons/close.svg'
import NextImage from 'next/image'
import { usePathname } from 'next/navigation'
import { z } from 'zod'
import { promoteTopicSchema } from '@/utils/data-schema'
import { transformRawPromoteTopic } from '@/utils/transform-homepage'
import { URL_STATIC_PROMOTE_TOPICS } from '@/constants/config'

export default function SwiperComponent() {
  // 預設不顯示，抓到資料後才渲染
  const [list, setList] = useState<PromoteTopicData[]>([])
  const [visible, setVisible] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const schema = z.object({
          promoteTopics: z.array(promoteTopicSchema),
        })

        const resp = await fetch(URL_STATIC_PROMOTE_TOPICS)
        if (!resp.ok) {
          throw new Error(
            `Failed to fetch ${URL_STATIC_PROMOTE_TOPICS}: ${resp.status}`
          )
        }
        const raw = await schema.parseAsync(await resp.json())
        const updated = raw.promoteTopics.map(transformRawPromoteTopic)

        setList(updated)
      } catch (err) {
        // 抓取失敗時維持不顯示
        console.error(err)
      }
    }

    fetchLatest()
  }, [])

  const isSearchPage = pathname.startsWith('/search')
  const validList = list.filter((item) => item.topics)

  if (!visible || !validList.length || isSearchPage) return null

  return (
    <div className="fixed right-[20px] top-1/4 z-promote-topic w-[124px] lg:top-[45%]">
      <NextImage
        onClick={() => setVisible(false)}
        width={20}
        height={20}
        alt="promote-topic 關閉按鈕"
        src={IConClose}
        className="absolute right-0 top-0 z-promote-topic-close-button -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full shadow-[0_2.47px_2.47px_0_#00000040]"
      />
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
        className="relative overflow-hidden rounded-[10px] shadow-[0_2.47px_2.47px_0_#00000040]"
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
