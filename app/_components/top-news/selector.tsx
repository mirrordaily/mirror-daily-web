import type { Dispatch, SetStateAction } from 'react'
import { twMerge } from 'tailwind-merge'
import { TAB } from './section'
import { homepageGtmEvents } from '@/constants/gtm'

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

  const gtmClassName: Record<
    keyof typeof TAB,
    (typeof homepageGtmEvents)[keyof typeof homepageGtmEvents]
  > = {
    Latest: homepageGtmEvents.latestTab,
    Hot: homepageGtmEvents.popularTab,
  }

  return (
    <div className="flex justify-center gap-x-6 text-lg font-bold leading-none text-[#68666d] md:justify-start md:gap-x-3 lg:justify-end lg:gap-x-6 lg:text-xl lg:font-normal">
      {Object.entries(TAB).map(([key, name]) => (
        <button
          key={key}
          onClick={() => clickHandler(key as keyof typeof TAB)}
          className={twMerge(
            'hover-or-active:text-[#896fcc] lg:rounded-lg lg:bg-[#ccced4] lg:px-2 lg:py-1 lg:hover-or-active:bg-mirror-blue-700 lg:hover-or-active:text-white',
            selectedTab === key
              ? 'text-[#896fcc] lg:bg-mirror-blue-700 lg:text-white'
              : '',
            gtmClassName[key as keyof typeof TAB]
          )}
        >
          {name}
        </button>
      ))}
    </div>
  )
}
