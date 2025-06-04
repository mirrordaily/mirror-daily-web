'use client'

import HeaderBlock from './header-block'

export default function ShortsHeader() {
  return (
    <header className="absolute inset-x-0 top-0 shrink-0 md:relative md:w-full">
      <HeaderBlock />
    </header>
  )
}
