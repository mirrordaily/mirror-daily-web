'use client'
import { useState } from 'react'
import Selector from './selector'

export const TAB = {
  Latest: '即時新聞',
  Hot: '熱門新聞',
} as const

export default function TopNewsMain() {
  const [tab, setTab] = useState<keyof typeof TAB>('Latest')

  return (
    <>
      <Selector selectedTab={tab} setTab={setTab} />
      <div>{/* 新聞清單 */}</div>
    </>
  )
}
