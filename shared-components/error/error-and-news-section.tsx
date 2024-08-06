import type { ReactNode } from 'react'

export default function ErrorAndNewsSection({
  children,
}: {
  children: ReactNode
}) {
  return (
    <>
      <hr className="mt-4 hidden w-[1128px] border border-[#000928] lg:block" />
      <div className="mt-20 flex flex-col items-center gap-y-[72px] md:mt-[92px] md:gap-y-[88px] lg:mt-[104px]">
        {children}
      </div>
    </>
  )
}
