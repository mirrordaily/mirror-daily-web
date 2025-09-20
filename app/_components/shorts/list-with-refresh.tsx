'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ShortsList from './list'
import type { Shorts } from '@/types/common'
import { SHORTS_TYPE } from '@/types/common'
import { z } from 'zod'
import { latestShortsSchema } from '@/utils/data-schema'
import { transformLatestShorts } from '@/utils/data-process'
import { URL_STATIC_LATEST_SHORTS } from '@/constants/config'

type Props = {
  items: Shorts[]
  type: SHORTS_TYPE
  customClass?: string
}

export default function ShortsListWithRefresh({ items, type, customClass }: Props) {
  const [data, setData] = useState<Shorts[]>(items)
  const isFetchingRef = useRef(false)

  const fetchAndMaybeUpdate = useCallback(async () => {
    if (isFetchingRef.current) return
    isFetchingRef.current = true
    try {
      const schema = z.object({
        [SHORTS_TYPE.NEWS]: z.array(latestShortsSchema),
        [SHORTS_TYPE.DERIVATIVE]: z.array(latestShortsSchema),
      })

      const resp = await fetch(URL_STATIC_LATEST_SHORTS, { cache: 'no-store' })
      const raw = await schema.parseAsync(await resp.json())
      const updated = raw[type].map(transformLatestShorts)

      // 比對 id 是否有變化（長度或順序變更都更新）
      const prevIds = data.map((s) => s.id).join(',')
      const nextIds = updated.map((s) => s.id).join(',')
      if (prevIds !== nextIds) {
        setData(updated)
      }
    } catch (err) {
      // 靜默失敗
      console.error(err)
    } finally {
      isFetchingRef.current = false
    }
  }, [data, type])

  useEffect(() => {
    // 聚焦與網路恢復時嘗試更新
    const onFocus = () => fetchAndMaybeUpdate()
    const onOnline = () => fetchAndMaybeUpdate()
    window.addEventListener('focus', onFocus)
    window.addEventListener('online', onOnline)

    // 初次進入後延遲更新一次，避免阻塞水合
    const t = setTimeout(fetchAndMaybeUpdate, 1500)

    // 週期性更新（可視需要調整頻率）
    const interval = setInterval(fetchAndMaybeUpdate, 180000)

    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('online', onOnline)
      clearTimeout(t)
      clearInterval(interval)
    }
  }, [type, fetchAndMaybeUpdate])

  const list = useMemo(() => data, [data])

  return <ShortsList items={list} type={type} customClass={customClass} />
}


