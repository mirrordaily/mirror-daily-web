import type { ReactNode } from 'react'

export default function ErrorAndNewsSection({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <hr className="w-full max-w-[335px] border border-[#000928] md:w-[672px] md:max-w-none lg:w-[1128px]" />
      <div className="mt-[60px] flex flex-col items-center gap-y-[72px] md:mt-[56px] md:gap-y-[88px] lg:mt-[104px]">
        {children}
      </div>
    </>
  )
}
