'use client'

import type { ChangeEvent } from 'react'
import { useEffect, useRef } from 'react'
import { isEqual } from 'lodash-es'
import { AVAILABLE_VIDEO_MIME_TYPE } from '@/constants/multimedia'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectIsFormValid, selectShorts } from '@/redux/shorts-upload/selector'
import {
  changeShortsFile,
  shortsUploadActions,
} from '@/redux/shorts-upload/slice'
import { useModalClose } from './upload-modal'
import FileInformation from './file-information'
import CustomText from './custom-text'
import BackButton from './back-button'
import NextButton from './next-button'
import OtherInformation from './other-information'
import { convertStringToFile } from '@/utils/file'

export default function MobileFormBody() {
  const dispatch = useAppDispatch()
  const { name, blobURL, type, hasError } = useAppSelector(
    selectShorts,
    isEqual
  )
  const isFormDataValid = useAppSelector(selectIsFormValid)
  const isClicked = useRef<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const closeHandler = useModalClose()

  useEffect(() => {
    if (!blobURL && !hasError && !isClicked.current) {
      isClicked.current = true
      inputRef.current?.click()
    }
  }, [blobURL, hasError])

  useEffect(() => {
    const inputItem = inputRef.current

    if (inputItem) {
      inputItem.addEventListener('cancel', closeHandler)
    }

    return () => {
      if (inputItem) inputItem.removeEventListener('cancel', closeHandler)
    }
  }, [closeHandler])

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const file = files instanceof FileList ? files[0] : files

    dispatch(changeShortsFile(file))
  }

  useEffect(() => {
    if (inputRef.current && blobURL) {
      convertStringToFile(blobURL, name, type).then((file) => {
        if (!inputRef.current) return
        const container = new DataTransfer()
        container.items.add(file)
        inputRef.current.files = container.files
      })
    }
  }, [blobURL, name, type])

  return (
    <div className="flex w-full grow flex-col gap-y-6">
      <input
        className="hidden"
        name="shorts"
        type="file"
        accept={AVAILABLE_VIDEO_MIME_TYPE.join(',')}
        ref={inputRef}
        onChange={inputChangeHandler}
      />
      {hasError ? (
        <div className="my-auto flex flex-col items-center self-center">
          <CustomText
            content="上傳失敗！"
            customClass="text-[#D94141] !text-base"
          />
          <div className="mt-[108px] flex gap-x-2">
            <BackButton type="button" clickFn={closeHandler}>
              離開
            </BackButton>
            <NextButton
              type="button"
              clickFn={() => {
                dispatch(shortsUploadActions.resetShortsFile())
                isClicked.current = false
              }}
            >
              上一步
            </NextButton>
          </div>
        </div>
      ) : (
        blobURL && (
          <>
            <FileInformation />
            <OtherInformation />
            <div className="mt-[52px] flex justify-center gap-x-2">
              <BackButton type="button" clickFn={closeHandler}>
                離開
              </BackButton>
              <NextButton
                type="submit"
                disabled={!isFormDataValid}
                clickFn={(event) => {
                  if (!isFormDataValid) event.preventDefault()
                }}
              >
                送出審核
              </NextButton>
            </div>
          </>
        )
      )}
    </div>
  )
}
