/* eslint-disable filename-rules/match */
'use client'

import { fetchPopularPost } from '@/app/actions-general'
import Image500 from '../../public/images-next/500.svg'
import { useEffect, useState } from 'react'
import type { PopularNews } from '@/types/common'
import PopularNewsSection from './popular-news-section'
import ErrorMessage from './error-massage'
import ErrorAndNewsSection from './error-and-news-section'
import Image from 'next/image'

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
      <ErrorAndNewsSection>
        <ErrorMessage text="這個網頁無法正常運作" color="#B2B5BE">
          <Image alt="500圖片" src={Image500} width={204} height={92} />
        </ErrorMessage>
        <PopularNewsSection articles={popularPosts} />
      </ErrorAndNewsSection>
    </main>
  )
}
