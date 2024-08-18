'use client'

import { useDispatch } from 'react-redux'
import { shortsUploadActions } from '@/redux/shorts-upload/slice'
import MobileFormBody from './mobile-form-body'
import { createCreativityShorts } from '@/app/actions-general'
import { useWindowSize } from 'usehooks-ts'
import { getTailwindConfig } from '@/utils/tailwind'
import { useEffect, useMemo } from 'react'
import { useFormState } from 'react-dom'
import { FormState } from '@/types/shorts'
import NextButton from './next-button'
import { useAppSelector } from '@/redux/hooks'
import { selectIsModalOpened } from '@/redux/shorts-upload/selector'
import { usePathname, useSearchParams } from 'next/navigation'

export default function UploadModal() {
  const dispatch = useDispatch()
  const isModalOpened = useAppSelector(selectIsModalOpened)
  const pathname = usePathname
  const searchParams = useSearchParams()
  const config = getTailwindConfig()
  const desktopLowerBound = Number(config.theme.screens.lg.split('px')[0])
  const { width } = useWindowSize()
  const isDesktop = useMemo(
    () => width >= desktopLowerBound,
    [desktopLowerBound, width]
  )
  const [response, formAction] = useFormState(createCreativityShorts, {
    state: FormState.Default,
  })

  const closeHandler = () => {
    dispatch(shortsUploadActions.resetAllState())
    dispatch(shortsUploadActions.setIsModalOpened(false))
  }

  useEffect(() => {
    closeHandler()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [pathname, searchParams])

  if (!isModalOpened) return null

  return (
    <div
      className="fixed inset-x-0 bottom-[var(--shorts-header-height)] top-0 z-upload-modal bg-[#7F8493]/80"
      onClick={closeHandler}
    >
      <div
        className="mx-auto flex h-[calc(100%-12px)] w-full max-w-screen-sm flex-col overflow-hidden rounded-[0px_0px_20px_20px] bg-white px-7 pb-9 pt-5 md:max-h-[720px]"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="shrink-0 text-center text-lg font-bold leading-normal text-black">
          短影音投稿
        </p>
        {response.state === FormState.Success ? (
          <div className="flex shrink grow flex-col items-center justify-center">
            <div className="flex flex-col items-center">
              <p className="text-base font-medium leading-normal text-[#000928]">
                送出成功！
              </p>
              <p className="mb-10 mt-1 text-xs font-normal leading-[150%] text-[#7F8493]">
                影片審核完成後，將會寄送通知
              </p>
              <NextButton clickFn={closeHandler}>關閉</NextButton>
            </div>
          </div>
        ) : (
          <form
            className="mt-9 flex shrink grow flex-col items-center overflow-scroll"
            method="POST"
            encType="multipart/form-data"
            action={formAction}
          >
            {isDesktop ? <></> : <MobileFormBody onClose={closeHandler} />}
          </form>
        )}
      </div>
    </div>
  )
}
