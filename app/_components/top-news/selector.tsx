import type { Dispatch, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'
import { TAB } from './main'

export default function Selector({
  selectedTab,
  setTab,
}: {
  selectedTab: keyof typeof TAB
  setTab: Dispatch<SetStateAction<keyof typeof TAB>>
}) {
  const clickHandler = (name: keyof typeof TAB) => {
    setTab(name)
  }

  return (
    <div className="flex justify-center gap-x-6 text-lg font-normal leading-normal text-[#7f8493] md:justify-start md:gap-x-3 lg:gap-x-6">
      {Object.entries(TAB).map(([key, name]) => (
        <button
          key={key}
          onClick={() => clickHandler(key as keyof typeof TAB)}
          className={twMerge(
            'hover-or-active:font-bold hover-or-active:text-[#119cc7]',
            selectedTab === key ? 'font-bold text-[#119cc7]' : ''
          )}
        >
          {name}
        </button>
      ))}
    </div>
  )
}
