'use client'

import { useFormState } from 'react-dom'
import { createCreativityShorts } from '@/app/actions-general'
import type { FormActionResponse } from '@/types/shorts'
import { FormState } from '@/types/shorts'
import { getTailwindConfig } from '@/utils/tailwind'
import { useWindowSize } from 'usehooks-ts'
import ProgressContainer from './progress-container'
import FormBody from './form-body'
import MobileFormBody from './mobile-form-body'
import NextButton from './next-button'
import CustomText from './custom-text'
import BackButton from './back-button'
import { useAppDispatch } from '@/redux/hooks'
import { shortsUploadActions } from '@/redux/shorts-upload/slice'
import { useModalClose } from './upload-modal'
import { useOptimistic } from 'react'
import StateContainer from './state-container'
import NextImage from 'next/image'
import IconClose from '@/public/icons/shorts-upload/close.svg'

export default function ModalBody() {
  const dispatch = useAppDispatch()
  const config = getTailwindConfig()
  const desktopLowerBound = Number(config.theme.screens.lg.split('px')[0])
  const { width } = useWindowSize()
  const isDesktop = width >= desktopLowerBound
  const [isProcessing, setIsProcessing] = useOptimistic<boolean, boolean>(
    false,
    (currentState, newValue) => newValue
  )
  const [response, formAction] = useFormState(
    async (prev: FormActionResponse, formData: FormData) => {
      setIsProcessing(true)
      const response = await createCreativityShorts(formData)
      setIsProcessing(false)
      return response
    },
    {
      state: FormState.Default,
    }
  )
  const closeHandler = useModalClose()

  return (
    <div
      className="relative flex h-[calc(100%-12px)] w-full max-w-screen-sm flex-col overflow-hidden rounded-[0px_0px_20px_20px] bg-white px-7 pb-9 pt-5 md:my-auto md:h-full md:max-h-[720px] md:rounded-[20px] md:py-5 lg:max-h-[640px] lg:max-w-[480px] lg:rounded-xl lg:px-[52px] lg:pb-8"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="absolute right-5 top-5 inline-block lg:right-4 lg:top-4"
        onClick={closeHandler}
      >
        <NextImage src={IconClose} alt="關閉" width={24} height={24} />
      </button>
      <p className="shrink-0 text-center text-lg font-bold leading-normal text-black">
        短影音投稿
      </p>
      {response.state === FormState.Success && (
        <StateContainer>
          <p className="text-base font-medium leading-normal text-[#000928]">
            送出成功！
          </p>
          <p className="mb-10 mt-1 text-xs font-normal leading-[150%] text-[#7F8493]">
            影片審核完成後，將會寄送通知
          </p>
          <NextButton clickFn={closeHandler}>關閉</NextButton>
        </StateContainer>
      )}
      {response.state === FormState.Fail && (
        <StateContainer>
          <CustomText
            content="上傳失敗！"
            customClass="!text-base text-[#D94141]"
          />
          <div className="mt-[110px] inline-block space-x-3">
            <BackButton clickFn={closeHandler}>離開</BackButton>
            <NextButton
              clickFn={() => {
                dispatch(shortsUploadActions.resetAllState())
                dispatch(shortsUploadActions.setIsModalOpened(true))
              }}
            >
              重新上傳
            </NextButton>
          </div>
        </StateContainer>
      )}
      {response.state === FormState.Default && (
        <>
          {isDesktop && <ProgressContainer />}
          <div className={isProcessing ? 'flex grow flex-col' : 'hidden'}>
            <StateContainer>
              <CustomText
                content="檔案上傳中......"
                customClass="!text-sm text-[#575D71]"
              />
            </StateContainer>
          </div>
          <form
            className={`${
              isProcessing ? 'hidden' : 'flex'
            } mt-9 grow flex-col items-center overflow-y-auto lg:mt-0`}
            action={formAction}
          >
            {isDesktop ? <FormBody /> : <MobileFormBody />}
          </form>
        </>
      )}
    </div>
  )
}
