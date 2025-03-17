import type { Dispatch, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'
import { TAB } from './section'

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
    <div className="flex justify-center gap-x-6 text-lg font-bold leading-none text-[#7f8493] md:justify-start md:gap-x-3 lg:gap-x-6 lg:text-xl lg:font-normal">
      {Object.entries(TAB).map(([key, name]) => (
        <button
          key={key}
          onClick={() => clickHandler(key as keyof typeof TAB)}
          className={twMerge(
            'hover-or-active:font-bold hover-or-active:text-[#896FCC] lg:rounded-lg lg:bg-[#CCCED4] lg:px-2 lg:py-1 lg:hover-or-active:bg-[#3B1E86] lg:hover-or-active:text-[#FFFFFF]',
            selectedTab === key
              ? 'text-[#896FCC] lg:bg-[#3B1E86] lg:text-[#FFFFFF]'
              : ''
          )}
        >
          {name}
        </button>
      ))}
    </div>
  )
}
