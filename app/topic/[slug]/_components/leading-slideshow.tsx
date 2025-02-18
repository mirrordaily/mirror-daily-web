'use client'

import { useRef } from 'react'
import NextImage from 'next/image'
import CustomImage from '@/shared-components/custom-image'
import type { SwiperRef } from 'swiper/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import type { GetTopicBasicInfoQuery } from '@/graphql/__generated__/graphql'
import { getUrlFromTopicKeywords } from '@/utils/topic'

import IconPrev from '@/public/icons/topic-slide-prev.svg'
import IconNext from '@/public/icons/topic-slide-next.svg'

type Item = NonNullable<
  NonNullable<GetTopicBasicInfoQuery['topic']>['slideshow_images']
>[0]

type Props = {
  heroUrl: NonNullable<GetTopicBasicInfoQuery['topic']>['heroUrl']
  list: Item[]
  orderList: NonNullable<
    NonNullable<GetTopicBasicInfoQuery['topic']>['manualOrderOfSlideshowImages']
  >
}

export default function LeadingSlideshow({ heroUrl, list, orderList }: Props) {
  const swiperRef = useRef<SwiperRef>(null)
  const slideNextRef = useRef<HTMLButtonElement>(null)
  const slidePrevRef = useRef<HTMLButtonElement>(null)

  let sortedList = list

  if (Array.isArray(orderList)) {
    const itemMap = new Map<string, Item>()

    list.forEach((item) => {
      const id = item.id
      itemMap.set(id, item)
    })

    sortedList = []
    orderList.forEach((orderItem) => {
      const id = orderItem.id
      const item = itemMap.get(id)

      if (item) sortedList.push(item)
    })
  }

  return (
    <div className="leading-slideshow">
      <Swiper
        className="relative size-full bg-black md:h-[calc(100%-24px)]"
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, Keyboard]}
        navigation={{
          nextEl: slideNextRef.current,
          prevEl: slidePrevRef.current,
        }}
        pagination={{
          clickable: true,
          el: '.pagination-container',
        }}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
        }}
        keyboard={true}
        loop={true}
      >
        {sortedList.map((item) => {
          const { name, topicKeywords, resizedWebp, resized } = item
          const altText = `${name} 的首圖`
          const url = getUrlFromTopicKeywords(topicKeywords) || heroUrl

          return (
            <SwiperSlide key={name} className="slide">
              {url ? (
                <a target="_blank" href={url}>
                  <CustomImage
                    images={resized}
                    imagesWebP={resizedWebp}
                    objectFit="contain"
                    alt={altText}
                  />
                </a>
              ) : (
                <CustomImage
                  images={resized}
                  imagesWebP={resizedWebp}
                  objectFit="contain"
                  alt={altText}
                />
              )}
            </SwiperSlide>
          )
        })}
        <button
          className="navigation-button right-3 lg:right-6"
          onClick={() => swiperRef.current?.swiper?.slideNext()}
        >
          <NextImage src={IconNext} width={20} height={20} alt="下一筆" />
        </button>
        <button
          className="navigation-button left-3 lg:left-6"
          onClick={() => swiperRef.current?.swiper?.slidePrev()}
        >
          <NextImage src={IconPrev} width={20} height={20} alt="上一筆" />
        </button>
      </Swiper>
      <div className="pagination-container" />
    </div>
  )
}
