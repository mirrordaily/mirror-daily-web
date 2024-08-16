'use client'

import type { ChangeEvent } from 'react'
import { useEffect, useRef } from 'react'
import FileInformation from './files-information'
import CustomText from './custom-text'
import { AVAILABLE_VIDEO_MIME_TYPE } from '@/constants/multimedia'
import BackButton from './back-button'
import NextButton from './next-button'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectIsFormValid, selectShorts } from '@/redux/shorts-upload/selector'
import {
  changeShortsFile,
  shortsUploadActions,
} from '@/redux/shorts-upload/slice'

type Props = {
  onClose: () => void
}

export default function MobileFormBody({ onClose }: Props) {
  const dispatch = useAppDispatch()
  const { blobURL, hasError } = useAppSelector(selectShorts)
  const isFormDataValid = useAppSelector(selectIsFormValid)
  const isClicked = useRef<boolean>(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!blobURL && !hasError && !isClicked.current) {
      isClicked.current = true
      inputRef.current?.click()
    }
  }, [blobURL, hasError])

  const fileJsx: JSX.Element[] = []
  if (blobURL) {
    fileJsx.push(<FileInformation />)
  }

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const file = files instanceof FileList ? files[0] : files

    dispatch(changeShortsFile(file))
  }

  return (
    <div className="mt-9 flex w-full grow flex-col gap-y-6 overflow-y-scroll">
      <input
        className="hidden"
        name="shorts"
        type="file"
        accept={AVAILABLE_VIDEO_MIME_TYPE.join(',')}
        ref={inputRef}
        onChange={inputChangeHandler}
      />
      {hasError ? (
        <div className="my-auto inline-block self-center">
          <CustomText
            content={
              <>
                上傳失敗！
                <br />
                檔案格式無效
              </>
            }
            colorClass="text-[#D94141]"
          />
          <div className="mt-[108px] flex gap-x-2">
            <BackButton type="button" clickFn={onClose}>
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
            {fileJsx}
            <div className="mt-[52px] flex justify-center gap-x-2">
              <BackButton type="button" clickFn={onClose}>
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
