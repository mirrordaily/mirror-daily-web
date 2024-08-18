'use client'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectProgress } from '@/redux/shorts-upload/selector'
import { FormProgress } from '@/types/shorts'
import InitialForm from './initial-form'
import FileInformation from './file-information'
import NextButton from './next-button'
import { shortsUploadActions } from '@/redux/shorts-upload/slice'

export default function FormBody() {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const dispatch = useAppDispatch()
  const progress = useAppSelector(selectProgress)
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
    </div>
  )
}
