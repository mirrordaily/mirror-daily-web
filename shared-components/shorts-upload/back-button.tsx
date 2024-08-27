'use client'

import type { MouseEventHandler } from 'react'

type Props = {
  isActive?: boolean
  type?: 'button' | 'submit'
  clickFn: MouseEventHandler<HTMLButtonElement>
}

export default function BackButton({
  isActive,
  clickFn,
  type,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <button
      className={`rounded-lg bg-[#B2B5BE] px-3 py-2 text-sm font-normal leading-normal text-[#E5E6E9] hover-or-active:bg-[#7F8493] ${isActive ? 'bg-[#7F8493]' : ''}`}
      type={type}
      onClick={clickFn}
    >
      {children}
    </button>
  )
}
