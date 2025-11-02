'use client'
import { useCallback, useMemo, useState } from 'react'
import { flushSync } from 'react-dom'
import SearchInput from './search-input'
import SearchResultsList from './search-results-list'
import SearchResultsHeader from './search-results-header'

type SearchItem = {
  id: string | number
  title: string
  url: string
  cover_image?: string
  published_at?: string
  snippet?: string
  sections?: { name: string; color: string; slug: string }[]
}

const SEARCH_API_ENDPOINT = '/api/miso/search'

export default function MisoSearchByApi() {
  const [inputQuery, setInputQuery] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<SearchItem[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [cachedResults, setCachedResults] = useState<
    Record<string, { items: SearchItem[]; total: number }>
  >({})
  const size = 24

  const sortOptions = useMemo(
    () => [
      { field: 'relevance', text: '關聯性', default: true },
      { field: 'published_at', text: '由新到舊' },
    ],
    []
  )
  const [activeSort, setActiveSort] = useState<string>('relevance')

  const runSearch = useCallback(
    async (q: string, sort: string, pageNum = 1, append = false) => {
      if (!q?.trim()) return
      setError(null)
      if (pageNum === 1 && !append) {
        setIsLoading(true)
      }
      try {
        const url = `${SEARCH_API_ENDPOINT}?q=${encodeURIComponent(q)}&page=${pageNum}&size=${size}&sort=${encodeURIComponent(sort)}`
        const res = await fetch(url, {
          headers: { Accept: 'application/json' },
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        const list: SearchItem[] = (json?.items ||
          json?.data ||
          []) as SearchItem[]
        const totalCount =
          typeof json?.total === 'number' ? json.total : list.length

        setItems((prev) => (append ? [...prev, ...list] : list))
        setTotal(totalCount)
        setIsLoading(false)

        if (pageNum === 1 && !append) {
          const cacheKey = `${q}|${sort}`
          setCachedResults((prev) => ({
            ...prev,
            [cacheKey]: { items: list, total: totalCount },
          }))
        }
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : '搜尋失敗'
        setError(message)
        setIsLoading(false)
      }
    },
    []
  )

  const fetchListInPage = useCallback(
    async (pageNum: number) => {
      if (!searchQuery.trim()) return [] as SearchItem[]

      if (pageNum === 1) {
        const cacheKey = `${searchQuery}|${activeSort}`
        const cached = cachedResults[cacheKey]
        if (cached) {
          setItems([...cached.items])
          setTotal(cached.total)
          setIsLoading(false)
          return cached.items
        }
        setIsLoading(true)
      }

      try {
        const url = `${SEARCH_API_ENDPOINT}?q=${encodeURIComponent(searchQuery)}&page=${pageNum}&size=${size}&sort=${encodeURIComponent(activeSort)}`
        const res = await fetch(url, {
          headers: { Accept: 'application/json' },
        })
        if (!res.ok) {
          if (pageNum === 1) {
            setIsLoading(false)
          }
          return []
        }
        const json = await res.json()
        const list: SearchItem[] = (json?.items ||
          json?.data ||
          []) as SearchItem[]
        if (pageNum === 1) {
          setTotal(typeof json?.total === 'number' ? json.total : list.length)
          setIsLoading(false)
        }
        return list
      } catch {
        if (pageNum === 1) {
          setIsLoading(false)
        }
        return []
      }
    },
    [searchQuery, activeSort, cachedResults]
  )

  return (
    <div className="mx-auto p-4 md:max-w-[598px] md:p-0 lg:max-w-[1240px]">
      <SearchInput
        query={inputQuery}
        onQueryChange={setInputQuery}
        onSearch={(q) => {
          setCachedResults({})
          setItems([])
          setTotal(null)
          setError(null)
          setIsLoading(true)
          setActiveSort('relevance')
          setSearchQuery(q)
          runSearch(q, 'relevance', 1, false)
        }}
      />

      {!!searchQuery.trim() && (
        <SearchResultsHeader
          query={searchQuery}
          total={total}
          itemsCount={items.length}
          isLoading={isLoading}
          sortOptions={sortOptions}
          activeSort={activeSort}
          onSortChange={(sort) => {
            if (searchQuery.trim()) {
              const cacheKey = `${searchQuery}|${sort}`
              const cached = cachedResults[cacheKey]
              flushSync(() => {
                setItems([])
                setActiveSort(sort)
              })
              if (!cached) {
                runSearch(searchQuery, sort, 1, false)
              } else {
                setIsLoading(false)
              }
            }
          }}
        />
      )}

      <div>
        {error && <div className="py-2 text-sm text-red-600">{error}</div>}
        {!error && (
          <SearchResultsList
            items={items}
            query={searchQuery}
            activeSort={activeSort}
            pageSize={size}
            fetchListInPage={fetchListInPage}
          />
        )}
      </div>
    </div>
  )
}
