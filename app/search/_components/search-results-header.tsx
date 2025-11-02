'use client'

type SortOption = {
  field: string
  text: string
}

type SearchResultsHeaderProps = {
  query: string
  total: number | null
  itemsCount: number
  isLoading: boolean
  sortOptions: SortOption[]
  activeSort: string
  onSortChange: (sort: string) => void
}

export default function SearchResultsHeader({
  query,
  total,
  itemsCount,
  isLoading,
  sortOptions,
  activeSort,
  onSortChange,
}: SearchResultsHeaderProps) {
  const displayTotal = isLoading && total === null ? '???' : total ?? itemsCount

  return (
    <div className="mb-10 mt-8 md:mb-6 md:flex md:items-end md:justify-between lg:mx-auto lg:mb-5 lg:max-w-[1024px]">
      <div className="mb-4 text-center md:mb-0 md:flex md:flex-col-reverse md:items-start md:justify-start">
        <div className="font-['Noto_Sans_TC'] text-lg font-bold leading-[120%] text-[#2B2B2B] [font-feature-settings:'liga'_off,'clig'_off]">
          關於 {query} 的搜尋結果：
        </div>
        <div className="mt-2 font-['Noto_Sans_TC'] text-sm font-normal leading-6 text-[#896FCC] lg:mb-3">
          共有 {displayTotal} 篇
        </div>
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <span className="text-center font-['Noto_Sans_TC'] text-sm font-normal leading-6 text-[#2B2B2B]">
          排序依
        </span>
        <div className="flex items-center gap-2.5">
          {sortOptions.map((opt) => (
            <button
              key={opt.field}
              className={`flex w-20 items-center justify-center px-2 py-1 font-['Noto_Sans_TC'] text-sm font-normal leading-6 ${
                activeSort === opt.field
                  ? 'bg-[#896FCC] text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => onSortChange(opt.field)}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
