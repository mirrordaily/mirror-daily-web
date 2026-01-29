'use client'

import { useEffect, useState } from 'react'
import type { AdType } from '@/types/common'
import {
  DableArticleBottomPC,
  PopInRecommend,
} from '@/app/story/_components/ads'

export default function BottomAd() {
  const [adType, setAdType] = useState<AdType | null>(null)

  useEffect(() => {
    setAdType(Math.random() < 0.5 ? 'popIn' : 'dable')
  }, [])

  if (!adType) return null

  return adType === 'dable' ? <DableArticleBottomPC /> : <PopInRecommend />
}
