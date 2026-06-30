'use client'
import type { HeaderSection, HeaderTopic } from '@/types/common'
import { useEffect, useRef, useState } from 'react'
import {
  getCategoryPageUrl,
  getSectionPageUrl,
  getTopicPageUrl,
} from '@/utils/site-urls'
import { FIXED_KEY_FOR_SECTION_SHORTS } from '@/constants/config'
import { headerGtmEvents } from '@/constants/gtm'
import { getTailwindConfigBreakpointNumber } from '@/utils/tailwind'

type Props = {
  sections: HeaderSection[]
  topics: HeaderTopic[]
}

const LG_BREAKPOINT = getTailwindConfigBreakpointNumber('lg')

export default function NavList({ sections, topics }: Props) {
  const [activeItem, setActiveItem] = useState('')
  const section = sections.find((section) => section.slug === activeItem)
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const handleSectionEnter = (slug: string) => {
    if (window.innerWidth < LG_BREAKPOINT) {
      return
    }

    const dropdown = dropdownRefs.current[slug]
    if (dropdown) {
      const { left } = dropdown.getBoundingClientRect()
      if (left + dropdown.scrollWidth > window.innerWidth) {
        dropdown.style.left = 'auto'
        dropdown.style.right = '0'
      }
    }
    setActiveItem(slug)
  }

  const handleSectionLeave = (slug: string) => {
    const dropdown = dropdownRefs.current[slug]
    if (dropdown) {
      dropdown.style.left = ''
      dropdown.style.right = ''
    }
    setActiveItem('')
  }

  useEffect(() => {
    if (section) {
      document.documentElement.style.setProperty(
        '--active-section-color',
        section.color
      )
    }
  }, [section])

  return (
    <nav className="relative flex w-full flex-col">
      <ul className="flex h-[28px] w-full items-center text-lg font-bold tracking-[0.5px] [&>li:first-child>a]:pl-0 [&>li:last-child]:after:hidden">
        {topics.map((item) => {
          return (
            <li
              key={item.slug}
              className="relative after:absolute after:right-0 after:top-1/2 after:h-4 after:w-px after:-translate-y-1/2 after:bg-[#7F8493] after:content-['']"
            >
              <a
                href={getTopicPageUrl(item.slug)}
                className={`block max-w-[110px] truncate px-2 text-mirror-blue-800 ${headerGtmEvents.topic}`}
              >
                {item.name}
              </a>
            </li>
          )
        })}
        {sections.map((section) => {
          const { name, slug } = section
          const color = section.color
          const link = getSectionPageUrl(slug)
          const categories = section.categories
          const isShortsCategory = slug === FIXED_KEY_FOR_SECTION_SHORTS
          const shouldShowCategories =
            activeItem === slug && categories.length > 0

          return (
            <li
              key={slug}
              className="relative break-keep after:absolute after:right-0 after:top-1/2 after:h-4 after:w-px after:-translate-y-1/2 after:bg-[#7F8493] after:content-['']"
              onMouseEnter={() => handleSectionEnter(slug)}
              onMouseLeave={() => handleSectionLeave(slug)}
              onFocus={() => handleSectionEnter(slug)}
              onBlur={() => handleSectionLeave(slug)}
            >
              <a
                href={link}
                style={{ color }}
                className={`${headerGtmEvents.section} px-2`}
              >
                {name}
              </a>
              <div
                ref={(el) => {
                  if (el) {
                    dropdownRefs.current[slug] = el
                  } else {
                    delete dropdownRefs.current[slug]
                  }
                }}
                className={`absolute left-0 top-full z-over-flashnews flex text-base font-medium leading-[19px] text-[#CCCED4] ${shouldShowCategories ? 'w-auto' : 'size-px overflow-hidden'}`}
              >
                <ul
                  className={
                    'mt-3 flex gap-x-[10px] rounded bg-[rgba(6,6,6,0.8)] px-3 py-1'
                  }
                >
                  {categories.map((category) => {
                    const { name, slug } = category

                    return (
                      <li
                        key={slug}
                        className="whitespace-nowrap focus-within:text-[color:var(--active-section-color)] hover-or-active:text-[color:var(--active-section-color)]"
                      >
                        <a
                          href={getCategoryPageUrl(slug, isShortsCategory)}
                          className={`${headerGtmEvents.category}`}
                        >
                          {name}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
