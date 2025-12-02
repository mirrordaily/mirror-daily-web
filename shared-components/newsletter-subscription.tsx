'use client'

import { useState } from 'react'
import { checkEmail } from '@/utils/common'

enum RESULT {
  DEFAULT = 'default',
  SUCCESS = 'success',
  FAIL = 'fail',
  INVALID = 'invalid',
}

export default function NewsletterSubscription() {
  const [subscriptionResult, setSubscriptionResult] = useState(RESULT.DEFAULT)
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubscriptionResult(RESULT.DEFAULT)

    const form = e.currentTarget
    const formData = new FormData(form)
    const email = formData.get('email') as string
    const emailValid = checkEmail(email.trim())

    if (!emailValid) {
      setSubscriptionResult(RESULT.INVALID)
      return
    }

    setIsPending(true)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        setSubscriptionResult(RESULT.SUCCESS)
      } else {
        setSubscriptionResult(RESULT.FAIL)
      }
    } catch (error) {
      console.error('[Newsletter] API Error:', error)
      setSubscriptionResult(RESULT.FAIL)
    } finally {
      setIsPending(false)
    }
  }

  const buttonText =
    subscriptionResult === RESULT.SUCCESS
      ? '已成功訂閱'
      : isPending
        ? '處理中...'
        : '訂閱'

  const errorMessage =
    subscriptionResult === RESULT.INVALID
      ? '請輸入正確的電子信箱格式'
      : subscriptionResult === RESULT.FAIL
        ? '訂閱失敗，請稍候再試'
        : ''

  return (
    <section className="flex w-full flex-col items-center bg-mirror-blue-600 pb-6 pt-3 text-center text-white md:px-0">
      <p className="text-xl font-normal leading-normal">
        訂閱《鏡報》論壇電子報
      </p>
      <p className="mt-1 text-sm font-normal leading-[24px] md:w-[442px]">
        每週3次，將最新的《鏡報》論壇好文章送到您的信箱
      </p>
      <form
        className="mt-2 flex w-[315px] flex-col items-center md:w-[442px] md:flex-row md:flex-wrap md:justify-center md:gap-x-[15px]"
        onSubmit={handleSubmit}
      >
        <input
          name="email"
          type="text"
          placeholder="請輸入電子郵件信箱"
          disabled={isPending || subscriptionResult === RESULT.SUCCESS}
          className="w-full rounded-lg border border-solid border-black/[.87] p-3 text-[15px] font-normal leading-normal text-black outline-none placeholder:text-[#898f9c] disabled:cursor-not-allowed disabled:bg-gray-200 md:w-auto md:grow"
        />
        <button
          disabled={isPending || subscriptionResult === RESULT.SUCCESS}
          className={`mt-[10px] w-full rounded-lg px-3 py-[10px] text-lg font-medium leading-normal text-white shadow-[0_4px_8px_0_rgba(0,0,0,0.1)] md:mt-0 md:w-auto ${
            subscriptionResult === RESULT.SUCCESS
              ? 'cursor-not-allowed bg-primary-400'
              : isPending
                ? 'cursor-not-allowed bg-[#cab572]'
                : 'bg-[#cab572] hover-or-active:bg-[#ad8c21]'
          }`}
        >
          {buttonText}
        </button>
        <p
          className={`mt-1 text-sm font-normal leading-[24px] text-[#F3E2FD] ${
            subscriptionResult === RESULT.INVALID ||
            subscriptionResult === RESULT.FAIL
              ? 'visible'
              : 'invisible'
          }`}
        >
          {errorMessage}
        </p>
      </form>
    </section>
  )
}
