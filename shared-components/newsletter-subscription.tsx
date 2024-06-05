'use client'

import {
  type PointerEventHandler,
  type ReactElement,
  useRef,
  useState,
} from 'react'

enum RESULT {
  DEFAULT = 'default',
  SUCCESS = 'success',
  FAIL = 'fail',
}

export default function NewsletterSubscription(): ReactElement {
  const isProcessing = useRef(false)
  const [subscriptionResult, setSubscriptionResult] = useState(RESULT.DEFAULT)

  const subscribe: PointerEventHandler<HTMLButtonElement> = async () => {
    if (isProcessing.current) return

    isProcessing.current = true

    try {
      // TODO: call Mailchimp API to add e-mail to mailing list

      setSubscriptionResult(RESULT.SUCCESS)
    } catch (error) {
      setSubscriptionResult(RESULT.FAIL)

      // TODO: send error log to GCP Logging
    }

    isProcessing.current = false
  }

  return (
    <section className="flex w-full flex-col items-center bg-mirror-500 px-[38px] pb-7 pt-8 text-white md:px-0 md:pb-[42px] md:pt-[54px] lg:pb-9">
      <p className="text-lg font-bold leading-normal">訂閱鏡爆電子報</p>
      <p className="mt-[7px] text-sm font-normal leading-normal md:w-[442px]">
        說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字說明文字
      </p>
      <form className="mt-[27px] flex w-full flex-col items-center gap-y-4 md:w-[442px] md:flex-row md:flex-wrap md:justify-center md:gap-x-[15px] md:gap-y-7 lg:gap-y-9">
        <input
          name="email"
          type="email"
          placeholder="請輸入電子郵件信箱"
          className="order-1 w-full rounded-lg border border-solid border-black/[.87] p-3 text-[15px] font-normal leading-normal text-black outline-none placeholder:text-[#898f9c] md:w-auto md:grow"
        />

        <p
          className={`order-2 text-sm font-normal leading-normal md:order-3 ${subscriptionResult === RESULT.SUCCESS ? 'visible' : 'invisible'}`}
        >
          訂閱成功！
        </p>

        <button
          type="button"
          className="order-3 rounded-lg bg-[#cab572] px-4 py-3 text-lg font-medium leading-normal text-mirror-500 hover:bg-[#ad8c21] active:bg-[#ad8c21] md:order-2"
          onClick={subscribe}
        >
          訂閱
        </button>
      </form>
    </section>
  )
}
