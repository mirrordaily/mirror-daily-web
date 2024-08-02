/* eslint-disable filename-rules/match */
'use client'

import { fetchPopularPost } from '@/app/actions-general'
import PopularNewsCard from './popular-news-card'
import Image500 from '../../public/images-next/500.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { PopularNews } from '@/types/common'

export default function Custom500() {
  const [popularPosts, setPopularPosts] = useState<PopularNews[]>([])
  useEffect(() => {
    const getPosts = async () => {
      const result = await fetchPopularPost(6)
      setPopularPosts(result)
    }
    getPosts()
  }, [])

  return (
    <main className="mb-[72px] flex flex-col items-center">
      <hr className="mt-4 hidden w-[1128px] border border-[#000928] lg:block" />
      <div className="mt-20 flex flex-col items-center gap-y-[72px] md:mt-[92px] md:gap-y-[88px] lg:mt-[104px]">
        <div className="flex flex-col items-center gap-y-6">
          <Image alt="500圖片" src={Image500} width={204} height={92} />
          <p className="text-xl font-bold text-[#B2B5BE]">
            這個網頁無法正常運作
          </p>
        </div>

        <section className="flex max-w-[240px] flex-col items-center gap-y-[19px] md:w-[588px] md:max-w-none md:gap-y-8">
          <h2 className="text-lg font-bold leading-normal text-[#119CC7]">
            熱門新聞
          </h2>
          <div className="grid grid-cols-1 gap-y-5 md:grid-cols-2 md:gap-7">
            {popularPosts &&
              popularPosts.map((item) => (
                <PopularNewsCard {...item} key={item.postSlug} />
              ))}
          </div>
        </section>
      </div>
    </main>
  )
}
