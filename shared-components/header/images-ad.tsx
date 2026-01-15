'use client'
import MirrorTvAd from '@/public/images-next/mirror-tv-ad.gif'
import MirrorTvBuy from '@/public/images-next/mirror-tv-buy.jpg'
import useCarouselIndex from '@/hooks/use-carousel-index'
import { SECOND } from '@/constants/time-unit'
import NextImage from 'next/image'

const images = [
  { src: MirrorTvAd, alt: 'ad', href: 'https://mnews.oen.tw/' },
  { src: MirrorTvBuy, alt: 'buy', href: 'https://buy.mnews.tw/zh-TW' },
]

const DISPLAY_TIMING = SECOND * 5

export default function ImagesAd() {
  const amountOfItems = images.length
  const currentIndex = useCarouselIndex(amountOfItems, DISPLAY_TIMING)

  return (
    <div className="relative h-[60px] w-[200px] lg:my-0 lg:h-8 lg:w-[107px]">
      {images.map((item, index) => (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          key={index + item.alt}
          className={`absolute inset-0 ${index === currentIndex ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <NextImage
            src={item.src}
            alt={item.alt}
            fill
            className="object-contain object-left lg:object-center"
          />
        </a>
      ))}
    </div>
  )
}
