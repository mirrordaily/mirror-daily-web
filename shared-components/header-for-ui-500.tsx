'use client'

import { fetchLatestPost, fetchHeaderData } from '@/app/actions-general'
import { fetchHotNews } from '@/app/actions'
import { useState, useEffect } from 'react'
import type { HeaderData } from '@/types/common'
import UiHeader from './header/ui-header'
import type { FlashNews } from '@/types/homepage'
import { FLASH_NEWS_COUNT } from '@/constants/misc'

export default function Header() {
  const [data, setData] = useState<HeaderData[]>([])
  const [latestPosts, setLatestPosts] = useState<FlashNews[]>([])

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchHeaderData()
        setData(result)
      } catch (err) {
        console.error(err)
      }
    }

    const getFlashNews = async () => {
      try {
        const hotNews = await fetchHotNews()
        const latestPosts = await fetchLatestPost()
        const flashNews = [...hotNews, ...latestPosts].slice(
          0,
          FLASH_NEWS_COUNT
        )
        setLatestPosts(flashNews)
      } catch (err) {
        console.error(err)
      }
    }

    getData()
    getFlashNews()
  }, [])

  return <UiHeader data={data} flashNews={latestPosts} />
}
