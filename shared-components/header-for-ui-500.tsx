/* eslint-disable filename-rules/match */
'use client'

import { fetchFlashNews } from '@/app/actions'
import { fetchSectionsAndCategories } from '@/app/actions-general'
import { useState, useEffect } from 'react'
import type { SectionAndCategory } from '@/types/common'
import type { FlashNews } from '@/types/homepage'
import UiHeader from './header/ui-header'

export default function Header() {
  const [data, setData] = useState<SectionAndCategory[]>([])
  const [flashNews, setFlashNews] = useState<FlashNews[]>([])

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchSectionsAndCategories()
        setData(result)
      } catch (err) {
        console.error(err)
      }
    }

    const getFlashNews = async () => {
      try {
        const posts = await fetchFlashNews()
        setFlashNews(posts)
      } catch (err) {
        console.error(err)
      }
    }

    getData()
    getFlashNews()
  }, [])

  return <UiHeader data={data} flashNews={flashNews} />
}
