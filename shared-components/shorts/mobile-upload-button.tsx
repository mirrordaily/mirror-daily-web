'use client'
import NextImage from 'next/image'
import IconSubmission from '@/public/icons/shorts/submission.svg'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectIsModalOpened } from '@/redux/shorts-upload/selector'
import { shortsUploadActions } from '@/redux/shorts-upload/slice'

export default function MobileUploadButton() {
  const dispatch = useAppDispatch()
  const isModalOpened = useAppSelector(selectIsModalOpened)

  return (
    <>
      <button
        className={`flex flex-col items-center justify-center gap-y-1 text-[#FF5A36] ${isModalOpened ? 'bg-[#F0F0F1]' : ''}`}
        onClick={() => {
          if (isModalOpened) return
          dispatch(shortsUploadActions.setIsModalOpened(true))
        }}
      >
        <NextImage src={IconSubmission} alt="投稿" />
        <p>我要投稿</p>
      </button>
    </>
  )
}
