import { fetchSectionsAndCategories } from '@/app/actions-general'
import PostList from './post-list'

export default async function LatestNewsSection() {
  const sectionData = await fetchSectionsAndCategories()

  return (
    <section className="section-in-homepage mt-9">
      <p className="mb-[34px] text-base font-bold leading-normal text-[#119CC7] md:mb-[26px] md:text-lg">
        最新新聞
      </p>
      <div className="flex w-full flex-col items-center justify-center gap-y-4 pb-8 md:flex-row md:flex-wrap md:gap-x-10 md:gap-y-7 md:pb-[27px] lg:gap-x-8 lg:pb-12 [&>*:last-child]:flex [&>*:last-child]:w-full [&>*:last-child]:justify-center">
        <PostList sectionData={sectionData} />
      </div>
    </section>
  )
}
