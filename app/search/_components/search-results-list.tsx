'use client'
import InfiniteScrollList from '@readr-media/react-infinite-scroll-list'
import { toDisplayDateTimeInTaipei } from '@/utils/date'
import { searchGtmEvents } from '@/constants/gtm'
import { IMAGE_PATH } from '@/constants/default-path'

type SearchItem = {
  id: string | number
  title: string
  url: string
  cover_image?: string
  published_at?: string
  snippet?: string
  sections?: { name: string; color: string; slug: string }[]
}

type SearchResultsListProps = {
  items: SearchItem[]
  query: string
  activeSort: string
  pageSize: number
  fetchListInPage: (pageNum: number) => Promise<SearchItem[]>
}

export default function SearchResultsList({
  items,
  query,
  activeSort,
  pageSize,
  fetchListInPage,
}: SearchResultsListProps) {
  return (
    <div className="mx-auto grid grid-cols-1 gap-3 p-4 md:max-w-[598px] md:grid-cols-2 md:gap-x-7 md:gap-y-3 md:p-0 lg:max-w-[1024px] lg:grid-cols-3 lg:gap-x-6 lg:gap-y-10">
      <InfiniteScrollList<SearchItem>
        key={`${query}|${activeSort}`}
        initialList={items}
        pageSize={pageSize}
        fetchListInPage={fetchListInPage}
        isAutoFetch={true}
        loader={<div className="py-2 text-sm text-gray-500">載入中…</div>}
      >
        {(list) =>
          list.map((product, idx) => (
            <div
              className="overflow-hidden bg-white hover:shadow"
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
                <div className="aspect-[16/9] w-full overflow-hidden rounded bg-gray-100">
                  <img
                    className="size-full rounded object-cover"
                    src={product.cover_image || IMAGE_PATH}
                    alt={product.title}
                    loading="lazy"
                  />
                </div>
                <div className="p-2.5">
                  <div className="mt-2 font-['Noto_Sans_CJK_TC'] text-sm font-normal leading-normal tracking-[0.5px] text-[#2B2B2B] [font-feature-settings:'liga'_off,'clig'_off]">
                    {product.published_at
                      ? toDisplayDateTimeInTaipei(product.published_at)
                      : ''}
                  </div>
                  <div className="mt-3 line-clamp-2 text-justify font-['Noto_Sans_CJK_TC'] text-lg font-bold leading-normal text-[#4A4A4A] [font-feature-settings:'liga'_off,'clig'_off]">
                    {product.title}
                  </div>
                  <div className="mt-2 line-clamp-2 text-justify font-['Noto_Sans_CJK_TC'] text-sm font-medium leading-normal text-[#4A4A4A] [font-feature-settings:'liga'_off,'clig'_off]">
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
  )
}
