import { fetchLatestShorts } from '@/app/actions'
import ShortsList from './list'
import { SHORTS_TYPE } from '@/types/common'

export default async function ShortsNewsSection() {
  const items = await fetchLatestShorts(SHORTS_TYPE.NEWS)

  if (!items.length) return null

  return (
    <section className="mb-[34px] mt-5 w-full max-w-screen-sm md:mt-6 md:max-w-screen-md lg:my-9 lg:max-w-none">
      <p className="px-[23px] text-base font-bold leading-normal text-[#119CC7] md:px-5 lg:px-9 lg:text-lg">
        短影音．新聞
      </p>
      <ShortsList customClass="mt-[19px]" customColor="#1F668E" items={items} />
    </section>
  )
}
