'use client'
import NextImage from 'next/image'
import IconSubmission from '@/public/icons/shorts/submission.svg'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import UploadModal from './upload-modal'

export default function MobileUploadButton() {
  const [isModalOpened, setIsModalOpened] = useState(false)

  return (
    <>
      <button
        className="flex flex-col items-center justify-center gap-y-1 text-[#FF5A36]"
        onClick={() => {
          setIsModalOpened(true)
        }}
      >
        <NextImage src={IconSubmission} alt="投稿" />
        <p>我要投稿</p>
      </button>
      {isModalOpened &&
        createPortal(
          <UploadModal onClose={() => setIsModalOpened(false)} />,
          document.body
        )}
    </>
  )
}
