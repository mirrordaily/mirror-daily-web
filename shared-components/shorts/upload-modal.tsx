'use client'

import { useDispatch } from 'react-redux'
import { shortsUploadActions } from '@/redux/shorts-upload/slice'
import MobileFormBody from './mobile-form-body'
import { useWindowSize } from 'usehooks-ts'
import { getTailwindConfig } from '@/utils/tailwind'
import { useMemo } from 'react'

type Props = {
  onClose: () => void
}

export default function UploadModal({ onClose }: Props) {
  const dispatch = useDispatch()
  const config = getTailwindConfig()
  const desktopLowerBound = Number(config.theme.screens.lg.split('px')[0])
  const { width } = useWindowSize()
  const isDesktop = useMemo(
    () => width >= desktopLowerBound,
    [desktopLowerBound, width]
  )
  const closeHandler = () => {
    onClose()
    dispatch(shortsUploadActions.resetAllState())
  }

  return (
    <div
      className="fixed inset-x-0 bottom-[var(--shorts-header-height)] top-0 z-upload-modal bg-[#7F8493]/80"
      onClick={closeHandler}
    >
      <div
        className="mx-auto h-[calc(100%-12px)] w-full max-w-screen-sm rounded-[0px_0px_20px_20px] bg-white px-7 pb-9 pt-5 md:max-h-[720px]"
        onClick={(event) => event.stopPropagation()}
      >
        <form
          className="flex size-full flex-col items-center"
          method="POST"
          encType="multipart/form-data"
        >
          <p className="text-lg font-bold leading-normal text-black">
            短影音投稿
          </p>
          {isDesktop ? <></> : <MobileFormBody onClose={closeHandler} />}
        </form>
      </div>
    </div>
  )
}
