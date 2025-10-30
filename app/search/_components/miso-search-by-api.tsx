'use client'
import { useCallback, useMemo, useState } from 'react'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import { dateFormatter } from '@/utils/data-process'
import { searchGtmEvents } from '@/constants/gtm'
// Tailwind-only UI (separate from SDK styles)

type SearchItem = {
  id: string | number
  title: string
  url: string
  cover_image?: string
  published_at?: string
  snippet?: string
}

const SEARCH_API_ENDPOINT = '/api/miso/search'

export default function MisoSearchByApi() {
  const [query, setQuery] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<SearchItem[]>([])
  const [total, setTotal] = useState<number | null>(null)
  const size = 10

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
      try {
        const url = `${SEARCH_API_ENDPOINT}?q=${encodeURIComponent(q)}&page=${pageNum}&size=${size}&sort=${encodeURIComponent(sort)}`
        const res = await fetch(url, {
          headers: { Accept: 'application/json' },
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        // 期望 json.items 為陣列；若 mesh-next 回傳結構不同，這裡可調整映射
        const list: SearchItem[] = (json?.items ||
          json?.data ||
          []) as SearchItem[]
        setItems((prev) => (append ? [...prev, ...list] : list))
        setTotal(typeof json?.total === 'number' ? json.total : list.length)
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : '搜尋失敗'
        setError(message)
      }
    },
    []
  )

  const fetchListInPage = useCallback(
    async (pageNum: number) => {
      if (!query.trim()) return [] as SearchItem[]
      try {
        const url = `${SEARCH_API_ENDPOINT}?q=${encodeURIComponent(query)}&page=${pageNum}&size=${size}&sort=${encodeURIComponent(activeSort)}`
        const res = await fetch(url, {
          headers: { Accept: 'application/json' },
        })
        if (!res.ok) return []
        const json = await res.json()
        const list: SearchItem[] = (json?.items ||
          json?.data ||
          []) as SearchItem[]
        if (pageNum === 1) {
          setTotal(typeof json?.total === 'number' ? json.total : list.length)
        }
        return list
      } catch {
        return []
      }
    },
    [query, activeSort]
  )

  return (
    <div className="mx-auto max-w-4xl p-4">
      <div className="mb-3">
        <div className="relative flex h-10 w-full items-center rounded-full border border-gray-300 bg-white pl-4 pr-10 shadow-sm transition focus-within:border-mirror-blue-700 focus-within:shadow-md focus-within:ring-2 focus-within:ring-mirror-blue-700/80">
          <input
            type="search"
            placeholder="搜尋"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') runSearch(query, activeSort, 1, false)
            }}
            className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
          <button
            type="button"
            className="absolute right-1 inline-flex size-8 items-center justify-center rounded-full bg-mirror-blue-700 text-white hover:bg-mirror-blue-800"
            onClick={() => runSearch(query, activeSort, 1, false)}
            aria-label="搜尋"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 104.473 8.605l3.211 3.211a.75.75 0 101.06-1.06l-3.21-3.212A5.5 5.5 0 009 3.5zm-4 5.5a4 4 0 118 0 4 4 0 01-8 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {!!items.length && (
        <div className="mb-2 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            共有 {total ?? items.length} 篇
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-500">排序依</span>
            {sortOptions.map((opt) => (
              <button
                key={opt.field}
                className={`rounded-full border px-2.5 py-1 text-xs ${
                  activeSort === opt.field
                    ? 'border-mirror-blue-700 bg-mirror-blue-700 text-white hover:border-mirror-blue-800 hover:bg-mirror-blue-800'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                }`}
                onClick={() => {
                  setActiveSort(opt.field)
                  if (query.trim()) runSearch(query, opt.field, 1, false)
                }}
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        {error && <div className="py-2 text-sm text-red-600">{error}</div>}
        {!error && (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <InfiniteScrollList<SearchItem>
              key={`${query}|${activeSort}`}
              initialList={items}
              pageSize={size}
              fetchListInPage={fetchListInPage}
              loader={<div className="py-2 text-sm text-gray-500">載入中…</div>}
            >
              {(list) =>
                list.map((product, idx) => (
                  <div
                    className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-sm hover:shadow"
                    key={`${product.id}-${idx}`}
                  >
                    <a
                      className={`block ${searchGtmEvents.article}`}
                      data-role="item"
                      data-miso-product-id={`${product.id}`}
                      href={product.url}
                      target="_blank"
                      rel="noopener"
                    >
                      {product.cover_image ? (
                        <div className="aspect-[16/9] w-full overflow-hidden bg-gray-100">
                          <img
                            className="size-full object-cover"
                            src={product.cover_image}
                            alt={product.title}
                            loading="lazy"
                          />
                        </div>
                      ) : null}
                      <div className="p-2.5">
                        <div className="mb-0.5 text-[11px] leading-4 text-gray-500">
                          {product.published_at
                            ? dateFormatter(product.published_at)
                            : ''}
                        </div>
                        <div className="line-clamp-2 text-sm font-medium">
                          {product.title}
                        </div>
                        <div className="mt-0.5 line-clamp-2 text-xs leading-5 text-gray-600">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: product.snippet || '',
                            }}
                          />
                        </div>
                      </div>
                    </a>
                  </div>
                ))
              }
            </InfiniteScrollList>
          </div>
        )}
      </div>
    </div>
  )
}
