'use client'

import { useEffect, useState } from 'react'
import DableWidget from './dable-widget'
import type { AdType } from '@/types/common'

export default function BottomAd() {
  const [adType, setAdType] = useState<AdType | null>(null)

  useEffect(() => {
    setAdType(Math.random() < 0.5 ? 'popIn' : 'dable')
  }, [])

  if (!adType) return null

  return adType === 'dable' ? (
    <DableWidget type="articleBottomPC" customClasses="mt-4" />
  ) : (
    <div id="_popIn_recommend" className="mt-7" />
  )
}
