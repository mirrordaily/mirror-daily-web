'use client'

import { useState } from 'react'
import MobileHeaderBlock from './mobile-header-block'
import HeaderBlock from './header-block'

export default function ShortsHeader() {
  const [inputValue, setInputValue] = useState('')

  return (
    <header className="absolute inset-x-0 top-0 shrink-0 md:relative md:w-full">
      <MobileHeaderBlock
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
      <HeaderBlock inputValue={inputValue} setInputValue={setInputValue} />
    </header>
  )
}
