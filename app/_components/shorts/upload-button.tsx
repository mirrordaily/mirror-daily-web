'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectIsModalOpened } from '@/redux/shorts-upload/selector'
import { shortsUploadActions } from '@/redux/shorts-upload/slice'

export default function UploadButton() {
  const dispatch = useAppDispatch()
  const isModalOpened = useAppSelector(selectIsModalOpened)

  return (
    <button
      className="rounded-[29px] bg-[#D94141] px-[10px] py-[2.5px] text-[15px] font-normal leading-[23px] text-white"
      onClick={() => {
        if (isModalOpened) return
        dispatch(shortsUploadActions.setIsModalOpened(true))
      }}
    >
      我要投稿
    </button>
  )
}
