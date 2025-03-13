import { fetchLatestShorts } from '@/app/actions-general'
import ShortsList from './list'
import { SHORTS_TYPE } from '@/types/common'
import UploadButton from './upload-button'

export default async function ShortsDerivativeSection() {
  const items = await fetchLatestShorts(SHORTS_TYPE.DERIVATIVE)

  if (!items.length) return null

  return (
    <section className="mb-9 mt-[60px] w-full max-w-screen-sm md:mt-[72px] md:max-w-screen-md lg:mt-9 lg:max-w-none">
      <div className="flex items-center justify-center gap-x-4 md:justify-start md:gap-x-3 lg:gap-x-5">
        <p className="inline-block text-lg font-bold leading-none text-[#FF5A36] md:pl-5 lg:pl-9 lg:text-xl">
          短影音．二創
        </p>
        <UploadButton />
      </div>
      <ShortsList customClass="mt-12 md:mt-8 lg:mt-[22px]" items={items} />
    </section>
  )
}
