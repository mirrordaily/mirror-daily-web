'use client'

import { twMerge } from 'tailwind-merge'
import NextImage from 'next/image'
import { useRef, useState } from 'react'
import ShortsItem from './item'
import type { SwiperRef } from 'swiper/react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation } from 'swiper/modules'
import IconPrev from '@/public/icons/slide-prev.svg'
import IconNext from '@/public/icons/slide-next.svg'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import type { Shorts } from '@/types/homepage'

type Props = {
  items: Shorts[]
  customColor: string
  customClass?: string
}

export default function ShortsList({
  items,
  customColor,
  customClass = '',
}: Props) {
  const swiperRef = useRef<SwiperRef>(null)
  const slideNextRef = useRef<HTMLButtonElement>(null)
  const slidePrevRef = useRef<HTMLButtonElement>(null)
  const [swiperIsBegining, setSwiperIsBegining] = useState(true)
  const [swiperIsEnd, setSwiperIsEnd] = useState(false)
  const [swiperActiveIndex, setSwiperActiveIndex] = useState(0)

  return (
    <div
      className={twMerge(
        'relative w-screen max-w-[1440px] overflow-x-scroll sm:translate-x-[calc(theme(screens.sm)/2-50%)] md:translate-x-[calc(theme(screens.md)/2-50%)] lg:translate-x-[calc(theme(screens.lg)/2-50%)]',
        customClass
      )}
    >
      <Swiper
        ref={swiperRef}
        slidesPerView={'auto'}
        modules={[FreeMode, Navigation]}
        freeMode={{
          enabled: true,
          sticky: true,
        }}
        centeredSlides={true}
        breakpoints={{
          320: {
            spaceBetween: 16,
          },
          1200: {
            spaceBetween: 36,
          },
        }}
        onInit={(
          swiper: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
        ) => {
          /** @see https://stackoverflow.com/a/78325429 */

          swiper.params.navigation.nextEl = slideNextRef.current!
          swiper.params.navigation.prevEl = slidePrevRef.current!
          swiper.navigation.init()
          swiper.navigation.update()
          setSwiperActiveIndex(swiper.realIndex)
        }}
        onSlideChange={(swiper) => {
          setSwiperIsBegining(swiper.isBeginning)
          setSwiperIsEnd(swiper.isEnd)
          setSwiperActiveIndex(swiper.realIndex)
        }}
        className="shorts-swiper-in-homepage"
      >
        {items.map((item, index) => (
          <>
            <SwiperSlide key={index}>
              <ShortsItem
                {...item}
                isActive={swiperActiveIndex === index}
                customColor={customColor}
              />
            </SwiperSlide>
          </>
        ))}
      </Swiper>
      <button
        className={`shorts-swiper-button right-4 ${swiperIsEnd ? 'hidden' : ''}`}
        ref={slideNextRef}
      >
        <NextImage src={IconNext} width={40} height={40} alt="下一筆" />
      </button>
      <button
        className={`shorts-swiper-button left-4 ${swiperIsBegining ? 'hidden' : ''}`}
        ref={slidePrevRef}
      >
        <NextImage src={IconPrev} width={40} height={40} alt="上一筆" />
      </button>
    </div>
  )
}
