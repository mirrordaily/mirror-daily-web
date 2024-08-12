'use client'

import type { ChangeEvent } from 'react'
import { useState } from 'react'
import NextImage from 'next/image'
import IconSearch from '@/public/icons/search-white.svg'
import IconClose from '@/public/icons/shorts/close.svg'

type Props = {
  inputValue: string
  setInputValue: (value: string) => void
}

export default function MobileHeaderBlock({
  inputValue,
  setInputValue,
}: Props) {
  const [isOpened, setIsOpened] = useState(false)

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <div className="relative z-over-shorts float-right has-[form]:float-none has-[form]:flex md:hidden">
      {isOpened ? (
        <form
          className="flex w-full items-center overflow-hidden bg-[#B2B5BE] py-[29px] pl-5 pr-[23px]"
          onSubmit={() => {
            /* TODO: redirect to Search Result page while submit */
          }}
        >
          <button
            onClick={() => setIsOpened(false)}
            className="shrink-0"
            type="button"
          >
            <NextImage
              src={IconClose}
              width={20}
              height={20}
              alt="關閉搜尋框"
            />
          </button>
          <div className="shrink grow pl-6 pr-[15px]">
            <input
              name="search"
              type="text"
              placeholder="請輸入關鍵字"
              className="w-full rounded-[7px] bg-[#F6F6FB] px-3 py-[6px] text-base font-normal leading-[150%] text-[#000928] outline-none placeholder:text-[#000928]"
              value={inputValue}
              onChange={onChangeHandler}
            />
          </div>
          <button className="shrink-0" type="submit">
            <NextImage src={IconSearch} width={24} height={24} alt="搜尋" />
          </button>
        </form>
      ) : (
        <button className="ml-auto mr-5 mt-5" onClick={() => setIsOpened(true)}>
          <NextImage src={IconSearch} width={28} height={28} alt="搜尋" />
        </button>
      )}
    </div>
  )
}
