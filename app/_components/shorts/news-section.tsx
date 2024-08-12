import { fetchLatestShorts } from '@/app/actions-general'
import ShortsList from './list'
import { SHORTS_TYPE } from '@/types/common'

export default async function ShortsNewsSection() {
  const items = await fetchLatestShorts(SHORTS_TYPE.NEWS)

  if (!items.length) return null

  return (
    <section className="mb-[34px] mt-9 w-full max-w-screen-sm md:mb-9 md:mt-6 md:max-w-screen-md lg:my-9 lg:max-w-none">
      <p className="inline-block pl-[23px] text-base font-bold leading-normal text-[#119CC7] md:pl-5 lg:pl-9 lg:text-lg">
        短影音．新聞
      </p>
      <ShortsList customClass="mt-[19px]" customColor="#1F668E" items={items} />
    </section>
  )
}
