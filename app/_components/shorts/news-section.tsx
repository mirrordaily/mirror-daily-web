import { fetchLatestShorts } from '@/app/actions-general'
import ShortsList from './list'
import { SHORTS_TYPE } from '@/types/common'

export default async function ShortsNewsSection() {
  const items = await fetchLatestShorts(SHORTS_TYPE.NEWS)

  if (!items.length) return null

  return (
    <section className="my-9 w-full max-w-screen-sm md:max-w-screen-md lg:mt-5 lg:max-w-none">
      <p className="flex justify-center text-lg font-bold leading-none text-[#896FCC] md:justify-start md:pl-5 lg:pl-9 lg:text-xl">
        短影音．新聞
      </p>
      <ShortsList customClass="mt-9 lg:mt-5" items={items} />
    </section>
  )
}
