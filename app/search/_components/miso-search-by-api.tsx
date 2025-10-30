'use client'
import { useCallback, useMemo, useState } from 'react'
import { dateFormatter } from '@/utils/data-process'
import '@/shared-styles/search.css'
import { searchGtmEvents } from '@/constants/gtm'

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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [items, setItems] = useState<SearchItem[]>([])

  const sortOptions = useMemo(
    () => [
      { field: 'relevance', text: '關聯性', default: true },
      { field: 'published_at', text: '由新到舊' },
    ],
    []
  )
  const [activeSort, setActiveSort] = useState<string>('relevance')

  const runSearch = useCallback(async (q: string, sort: string) => {
    if (!q?.trim()) return
    setLoading(true)
    setError(null)
    try {
      const url = `${SEARCH_API_ENDPOINT}?q=${encodeURIComponent(q)}&page=1&size=10&sort=${encodeURIComponent(sort)}`
      const res = await fetch(url, { headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      // 期望 json.items 為陣列；若 mesh-next 回傳結構不同，這裡可調整映射
      const list: SearchItem[] = (json?.items ||
        json?.data ||
        []) as SearchItem[]
      setItems(list)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '搜尋失敗'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <div className="miso-hybrid-search-combo">
      {/* 搜尋框（沿用 Miso 結構與 class） */}
      <div className="miso-hybrid-search-combo__question">
        <div className="miso-hybrid-search-combo__query-container">
          <div className="miso-search-box">
            <div className="miso-search-box__input-group">
              <input
                type="search"
                placeholder="搜尋"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') runSearch(query, activeSort)
                }}
                className="miso-search-box__input"
              />
              <button
                type="button"
                className="miso-search-box__button"
                onClick={() => runSearch(query, activeSort)}
                aria-label="搜尋"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 排序（沿用你現有樣式） */}
      <div className="miso-hybrid-search-combo__search-results-filters__right">
        <div className="miso-hybrid-search-combo__search-results-filters__sort-header">
          排序依
        </div>
        <div className="miso-hybrid-search-combo__search-results-filters__sort-options-container">
          {sortOptions.map((opt) => (
            <button
              key={opt.field}
              className={`miso-hybrid-search-combo__search-results-filters__sort-option${activeSort === opt.field ? 'active' : ''}`}
              onClick={() => {
                setActiveSort(opt.field)
                if (query.trim()) runSearch(query, opt.field)
              }}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      {/* 結果列表（貼齊你現有 DOM 與樣式） */}
      <div className="miso-hybrid-search-combo__search-results">
        <div className="miso-hybrid-search-combo__search-results-container">
          {loading && <div style={{ padding: 12 }}>載入中…</div>}
          {error && <div style={{ padding: 12, color: '#c00' }}>{error}</div>}
          {!loading && !error && (
            <div className="miso-list__list">
              {items.map((product, idx) => (
                <div className="miso-list__item" key={`${product.id}-${idx}`}>
                  <a
                    className={`miso-list__item-body ${searchGtmEvents.article}`}
                    data-role="item"
                    data-miso-product-id={`${product.id}`}
                    href={product.url}
                    target="_blank"
                    rel="noopener"
                  >
                    <div className="miso-list__item-cover-image-container">
                      {product.cover_image ? (
                        <img
                          className="miso-list__item-cover-image"
                          src={product.cover_image}
                        />
                      ) : null}
                    </div>
                    <div className="miso-list__item-info-container">
                      <div className="miso-list__item-time">
                        {product.published_at
                          ? dateFormatter(product.published_at)
                          : ''}
                      </div>
                      <div className="miso-list__item-title">
                        {product.title}
                      </div>
                      <div className="miso-list__item-snippet">
                        {product.snippet || ''}
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
