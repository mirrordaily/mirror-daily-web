'use client'

import type { HeaderData, HeaderSection } from '@/types/common'
import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import {
  getCategoryPageUrl,
  getSectionPageUrl,
  getTopicPageUrl,
} from '@/utils/site-urls'
import { useWindowSize } from 'usehooks-ts'
import IconTogggle from '@/public/icons/sidebar-toggle.svg'
import { getTailwindConfig } from '@/utils/tailwind'
import { FIXED_KEY_FOR_SECTION_SHORTS } from '@/constants/config'
import { isSectionItem } from '@/utils/common'

type Props = {
  data: HeaderData[]
}

export default function MobileNavList({ data }: Props) {
  const config = getTailwindConfig()
  const desktopLowerBound = Number(config.theme.screens.lg.split('px')[0])
  const { width } = useWindowSize()
  const [activeItem, setActiveItem] = useState('')

  const toggleActiveItem = (item: string, color: string) => {
    if (item === activeItem) {
      setActiveItem('')
      return
    }

    setActiveItem(item)

    document.documentElement.style.setProperty('--active-section-color', color)
  }

  useEffect(() => {
    if (width >= desktopLowerBound) {
      setActiveItem('')
    }
  }, [desktopLowerBound, width])

  return (
    <nav className="w-full max-w-[calc(375px-46px*2)] grow self-center overflow-y-scroll">
      <ul className="flex w-[188px] flex-col">
        {data.map((section) => {
          const { name, slug } = section

          let hasCategories: boolean
          let shouldShowCategories: boolean
          let link: string
          let color: string
          let categories: HeaderSection['categories'] = []
          let isShortsCategory: boolean

          if (isSectionItem(section)) {
            hasCategories = section.categories.length > 0

            shouldShowCategories = slug === activeItem
            link = getSectionPageUrl(slug)
            color = section.color
            categories = section.categories
            isShortsCategory = slug === FIXED_KEY_FOR_SECTION_SHORTS
          } else {
            hasCategories = false
            shouldShowCategories = false
            link = getTopicPageUrl(slug)
            color = '#e5e6e9'
            isShortsCategory = false
          }

          return (
            <li
              key={slug}
              className="flex flex-col border-white py-[10px] [&:not(:last-child)]:border-b"
            >
              {/* section item */}
              <div className="flex items-center justify-between">
                <NextLink
                  href={link}
                  className="grow text-base font-bold leading-[175%] tracking-[0.5px]"
                  style={{
                    color: color,
                  }}
                >
                  {name}
                </NextLink>
                {hasCategories && (
                  <button
                    className="inline-block py-2 pl-2"
                    onClick={() => toggleActiveItem(slug, color)}
                  >
                    <NextImage
                      src={IconTogggle}
                      width={6}
                      height={8}
                      alt="小類別開關"
                      className={`origin-center ${shouldShowCategories ? '-rotate-90' : ''}`}
                    />
                  </button>
                )}
              </div>
              {hasCategories && (
                <ul
                  className={`mb-[2px] mt-3 flex-col gap-y-[10px] text-sm font-normal leading-normal text-[#CCCED4] ${shouldShowCategories ? 'flex' : 'hidden'}`}
                >
                  {categories.map((category) => {
                    const { name, slug } = category

                    return (
                      <li key={slug}>
                        {/* category item */}
                        <NextLink
                          href={getCategoryPageUrl(slug, isShortsCategory)}
                          className="hover-or-active:text-[color:var(--active-section-color)]"
                        >
                          {name}
                        </NextLink>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
