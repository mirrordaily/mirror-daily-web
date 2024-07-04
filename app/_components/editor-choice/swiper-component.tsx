'use client'

import CustomImage from '@/shared-components/custom-image'
import NextLink from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, Keyboard } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import type { EditorChoice } from '@/types/homepage'

export default function SwiperComponent() {
  const list: EditorChoice[] = [
    {
      postName: '蕭秀琴專欄／客家元素（五）　仙草茶與桔醬作為基本盤',
      postSlug: 'hakka_112849',
      heroImage: {
        resized: {
          original:
            'https://hakkanews.tw/wp-content/uploads/2024/04/hakkanews.tw-2024-04-15_17-41-05_170255-jpg.webp',
        },
      },
      link: '/external/hakka_112849',
    },
    {
      postName:
        '精準醫療時代來臨！女性該如何對抗卵巢癌？　 基因檢測讓卵巢癌迎來精準治療！',
      postSlug: 'healthnews_60623',
      heroImage: {
        resized: {
          original:
            'https://www.healthnews.com.tw/./imageFile/202401/b67821717a1af60f7a967232586784df_l.jpg',
        },
      },
      link: '/external/healthnews_60623',
    },
    {
      postName: '自然科實驗起火3人傷　13歲國中女恐毀容',
      postSlug: 'setn_1454410',
      heroImage: {
        resized: {
          original:
            'https://attach.setn.com/newsimages/2024/04/16/4609885-PH.jpg',
        },
      },
      link: '/external/setn_1454410',
    },
    {
      postName: '超商見祖孫吃即期品　球星1善舉感動萬人',
      postSlug: 'setn_1454407',
      heroImage: {
        resized: {
          original:
            'https://attach.setn.com/newsimages/2018/07/02/1427330-PH.jpg',
        },
      },
      link: '/external/setn_1454407',
    },
    {
      postName: '今第5震！規模4.3極淺層地震、8縣市有感',
      postSlug: 'setn_1454409',
      heroImage: {
        resized: {
          original:
            'https://attach.setn.com/newsimages/2024/04/16/4609884-PH.jpg',
        },
      },
      link: '/external/setn_1454409',
    },
    {
      postName: '板橋惡火3鐵皮屋全毀　新北4區注意空汙',
      postSlug: 'setn_1454405',
      heroImage: {
        resized: {
          original:
            'https://attach.setn.com/newsimages/2024/04/16/4609876-PH.jpg',
        },
      },
      link: '/external/setn_1454405',
    },
    {
      postName: '愛莉莎莎白飯倒垃圾桶挨轟　槓酸民「以後吃不完寄你家」',
      postSlug: 'mnews_20240416nm002',
      heroImage: {
        resized: {
          original:
            'https://statics.mnews.tw/assets/images/clv1nb5c7007y10mggp87erfr.jpg',
        },
      },
      link: '/external/mnews_20240416nm002',
    },
    {
      postName: '花蓮規模4.2「極淺層地震」　最大震度3級',
      postSlug: 'setn_1454402',
      heroImage: {
        resized: {
          original:
            'https://attach.setn.com/newsimages/2024/04/16/4609866-PH.jpg',
        },
      },
      link: '/external/setn_1454402',
    },
    {
      postName: '他曝藍白強推國會擴權法案現場：每條碾壓',
      postSlug: 'setn_1454403',
      heroImage: {
        resized: {
          original:
            'https://attach.setn.com/newsimages/2024/04/16/4609868-PH.jpg',
        },
      },
      link: '/external/setn_1454403',
    },
    {
      postName: '山豬生前罹不死癌！最後遺願求友「餵吃生魚片」　原因惹淚崩',
      postSlug: 'tvbs_2456849',
      heroImage: {
        resized: {
          original:
            'https://cc.tvbs.com.tw/img/upload/2024/04/15/20240415173608-1e889f42.jpg',
        },
      },
      link: '/external/tvbs_2456849',
    },
  ]

  return (
    <Swiper
      modules={[Pagination, Autoplay, Keyboard]}
      pagination={{
        clickable: true,
        el: '.custom-swiper-pagination',
        bulletClass: 'homepage-editor-choice-bullet',
        bulletActiveClass: 'homepage-editor-choice-bullet-active',
        horizontalClass: 'homepage-editor-choice-pagination-horizontal',
        renderBullet(index, className) {
          return `<span class="${className}">${index + 1}</span>`
        },
      }}
      slidesPerView={1}
      autoplay={{
        delay: 5000,
      }}
      keyboard={true}
      className="relative w-full md:rounded"
    >
      {list.map((item) => {
        const { postSlug, postName, heroImage, link } = item
        return (
          <SwiperSlide
            key={postSlug}
            className="relative w-full max-w-[375px] md:max-w-none"
          >
            <>
              <CustomImage
                images={heroImage.resized}
                className="aspect-[375/208] w-full md:aspect-[680/379] lg:aspect-[1127/628]"
              />
              <NextLink
                href={link}
                target="_blank"
                className="mx-6 mt-4 line-clamp-3 h-[84px] text-xl font-bold leading-normal text-[#000928] md:absolute md:bottom-3 md:left-5 md:m-0 md:line-clamp-2 md:h-auto md:max-h-[58px] md:w-[440px] md:text-white lg:bottom-7 lg:left-7 lg:max-h-[69px] lg:w-[654px] lg:text-2xl lg:font-black"
              >
                {postName}
              </NextLink>
            </>
          </SwiperSlide>
        )
      })}
      <div className="custom-swiper-pagination" />
    </Swiper>
  )
}
