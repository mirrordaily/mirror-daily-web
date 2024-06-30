'use client'
import type { SectionAndCategory } from '@/types/homepage'
import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { getCategoryPageUrl, getSectionPageUrl } from '@/utils/site-urls'

type Props = {
  data: SectionAndCategory[]
}

export default function DesktopNavList({ data }: Props) {
  const [activeItem, setActiveItem] = useState('')
  const section = data.find((section) => section.slug === activeItem)

  useEffect(() => {
    if (section) {
      document.documentElement.style.setProperty(
        '--active-section-color',
        section.color
      )
    }
  }, [section])

  return (
    <nav
      className="relative flex w-full flex-col"
      onMouseLeave={() => setActiveItem('')}
      onBlur={() => setActiveItem('')}
    >
      <ul className="mt-[30px] flex h-[28px] w-full items-center text-base font-bold tracking-[0.5px]">
        {data.map((section) => {
          const { name, slug, color, categories } = section
          const shouldShowCategories = activeItem === slug

          return (
            <li
              key={slug}
              className="whitespace-nowrap border-r border-[#B2B5BE] px-[5.5px] leading-none first:pl-0 first:pr-[5.5px] last:border-r-0 last:pl-[5.5px] last:pr-0"
              onMouseEnter={() => setActiveItem(slug)}
              onFocus={() => setActiveItem(slug)}
            >
              <NextLink href={getSectionPageUrl(slug)} style={{ color }}>
                {name}
              </NextLink>
              <ul
                className={`absolute bottom-0 left-0 flex gap-x-4 text-sm font-bold leading-normal text-[#7F8493] ${shouldShowCategories ? 'w-auto' : 'size-px overflow-hidden'}`}
              >
                {categories.map((category) => {
                  const { name, slug } = category

                  return (
                    <li
                      key={slug}
                      className="whitespace-nowrap hover-or-active:text-[color:var(--active-section-color)]"
                    >
                      <NextLink href={getCategoryPageUrl(slug)}>
                        {name}
                      </NextLink>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
