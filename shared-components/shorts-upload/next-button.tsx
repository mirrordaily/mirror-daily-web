import type { MouseEventHandler } from 'react'

type Props = {
  disabled?: boolean
  isActive?: boolean
  type?: 'button' | 'submit'
  clickFn: MouseEventHandler<HTMLButtonElement>
}

export default function NextButton({
  disabled,
  isActive,
  clickFn,
  type,
  children,
}: React.PropsWithChildren<Props>) {
  return (
    <button
      className={`rounded-lg bg-[#119CC7] px-3 py-2 text-sm font-normal leading-normal ${
        disabled
          ? 'cursor-not-allowed bg-[#E5E6E9] text-[#CCCED4]'
          : `text-[#E5E6E9] hover-or-active:bg-[#19B7E8] ${isActive ? 'bg-[#19B7E8]' : ''}`
      } `}
      onClick={clickFn}
      type={type}
    >
      {children}
    </button>
  )
}
