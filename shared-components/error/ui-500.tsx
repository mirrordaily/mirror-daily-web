/* eslint-disable filename-rules/match */
'use client'

import { fetchPopularPost } from '@/app/actions-general'
import Image500 from '../../public/images-next/500.svg'
import { useEffect, useState } from 'react'
import type { PopularNews } from '@/types/common'
import PopularNewsSection from './popular-news-section'
import ErrorMessage from './error-massage'

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
    <main className="mb-[72px]">
      <hr className="mt-4 hidden w-[1128px] border border-[#000928] lg:block" />
      <div className="mt-20 flex flex-col items-center gap-y-[72px] md:mt-[92px] md:gap-y-[88px] lg:mt-[104px]">
        <ErrorMessage
          alt="500圖片"
          src={Image500}
          width={204}
          height={92}
          text="這個網頁無法正常運作"
          color="#B2B5BE"
        />
        <PopularNewsSection articles={popularPosts} />
      </div>
    </main>
  )
}
