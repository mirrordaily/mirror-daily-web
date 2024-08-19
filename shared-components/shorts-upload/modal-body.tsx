'use client'

import { useFormState } from 'react-dom'
import { createCreativityShorts } from '@/app/actions-general'
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

type Props = {
  closeHandler: () => void
}

export default function ModalBody({ closeHandler }: Props) {
  const dispatch = useAppDispatch()
  const config = getTailwindConfig()
  const desktopLowerBound = Number(config.theme.screens.lg.split('px')[0])
  const { width } = useWindowSize()
  const isDesktop = width >= desktopLowerBound
  const [response, formAction] = useFormState(createCreativityShorts, {
    state: FormState.Default,
  })

  return (
    <div
      className="flex h-[calc(100%-12px)] w-full max-w-screen-sm flex-col overflow-hidden rounded-[0px_0px_20px_20px] bg-white px-7 pb-9 pt-5 md:my-auto md:h-full md:max-h-[720px] md:rounded-[20px] md:py-5 lg:max-h-[640px] lg:max-w-[480px] lg:rounded-xl lg:px-[52px] lg:pb-8"
      onClick={(event) => event.stopPropagation()}
    >
      <p className="shrink-0 text-center text-lg font-bold leading-normal text-black">
        短影音投稿
      </p>
      {response.state === FormState.Success && (
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
      )}
      {response.state === FormState.Fail && (
        <div className="flex shrink grow flex-col items-center justify-center">
          <div className="flex flex-col items-center">
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
          </div>
        </div>
      )}
      {response.state === FormState.Default && (
        <>
          {isDesktop && <ProgressContainer />}
          <form
            className="mt-9 flex shrink grow flex-col items-center overflow-y-auto lg:mt-0"
            action={formAction}
          >
            {isDesktop ? (
              <FormBody />
            ) : (
              <MobileFormBody onClose={closeHandler} />
            )}
          </form>
        </>
      )}
    </div>
  )
}
