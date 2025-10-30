'use client'
import { useEffect, useState } from 'react'
import MisoSearch from './miso-search'
import MisoSearchByApi from './miso-search-by-api'

export default function MisoSearchGate() {
  const [hasMiso, setHasMiso] = useState<boolean | null>(null)

  useEffect(() => {
    const check = () => {
      const w = window as unknown as { MisoClient?: unknown }
      return typeof w.MisoClient === 'function'
    }
    if (check()) {
      setHasMiso(true)
      return
    }
    // 再給 SDK 一個緩衝時間
    const t = setTimeout(() => setHasMiso(check()), 800)
    return () => clearTimeout(t)
  }, [])

  if (hasMiso === true) return <MisoSearch />
  // 無 SDK：改用後端代理 API 的版本
  return <MisoSearchByApi />
}
