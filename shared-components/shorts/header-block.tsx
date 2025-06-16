'use client'

import NextImage from 'next/image'
import IconLogo from '@/public/icons/logos/mirror-daily-shorts-header.svg'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectIsModalOpened } from '@/redux/shorts-upload/selector'
import { shortsUploadActions } from '@/redux/shorts-upload/slice'
import useRecaptcha from '@/hooks/use-recaptcha'

export default function HeaderBlock() {
  const dispatch = useAppDispatch()
  const isModalOpened = useAppSelector(selectIsModalOpened)
  const { handleRecaptchaVerification } = useRecaptcha()

  const onUpload = async () => {
    if (isModalOpened) return
    const isVerified = await handleRecaptchaVerification('short_submit')
    if (!isVerified) return
    dispatch(shortsUploadActions.setIsModalOpened(true))
  }

  return (
    <div className="relative hidden w-full md:flex">
      <a
        href="/"
        className="relative my-5 ml-5 h-[58px] w-[200px] lg:my-6 lg:h-[60px] lg:w-[208px]"
      >
        <NextImage src={IconLogo} fill={true} alt="Logo" />
      </a>
      <p className="my-[30px] ml-3 whitespace-nowrap text-2xl font-black leading-normal text-[#FF5A36] lg:my-[35px] lg:ml-[26px]">
        短影音
      </p>
      <div className="my-[34px] ml-auto shrink-0"></div>
      <button
        className={`my-[34px] ml-3 mr-7 h-7 shrink-0 rounded-[29px] bg-[#FF5A36] px-[10px] py-[3px] text-[15px] font-normal leading-[22px] text-white shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)] hover:bg-[#FF9078] active:bg-[#E54B29] ${
          isModalOpened ? 'bg-[#E54B29]' : ''
        }`}
        onClick={onUpload}
      >
        我要投稿
      </button>
    </div>
  )
}
