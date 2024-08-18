'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  selectProgress,
  selectIsFormValid,
} from '@/redux/shorts-upload/selector'

import { FormProgress } from '@/types/shorts'
import InitialForm from './initial-form'
import FileInformation from './file-information'
import NextButton from './next-button'
import OtherInformation from './other-information'
import BackButton from './back-button'
import { shortsUploadActions } from '@/redux/shorts-upload/slice'

export default function FormBody() {
  const dispatch = useAppDispatch()
  const progress = useAppSelector(selectProgress)
  const isFormDataValid = useAppSelector(selectIsFormValid)

  return (
    <div className="flex w-full grow flex-col">
      <div
        className={`${
          progress === FormProgress.Initial ? 'flex' : 'hidden'
        } my-auto flex-col gap-y-6 self-center text-center`}
      >
        <InitialForm />
      </div>

      <div
        className={`${
          progress === FormProgress.FileInfo ? 'flex' : 'hidden'
        } h-full flex-col`}
      >
        <FileInformation />
        <div className="mt-auto flex flex-col items-center">
          <NextButton
            clickFn={() =>
              dispatch(shortsUploadActions.setProgress(FormProgress.PersonInfo))
            }
          >
            下一步
          </NextButton>
        </div>
      </div>

      <div
        className={`${
          progress === FormProgress.PersonInfo ? 'flex' : 'hidden'
        } h-full flex-col`}
      >
        <OtherInformation />
        <div className="mt-auto flex justify-center gap-x-[10px]">
          <BackButton
            type="button"
            clickFn={() =>
              dispatch(shortsUploadActions.setProgress(FormProgress.FileInfo))
            }
          >
            上一步
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
      </div>
    </div>
  )
}
