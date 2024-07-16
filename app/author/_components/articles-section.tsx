import ArticlesList from '../../../shared-components/search/articles-list'
import type { AuthorInfo, Post } from '@/types/author-page'

type Props = {
  info: AuthorInfo
  initialList: Post[]
  slug: string
}

export default function ArticleSection({ info, initialList, slug }: Props) {
  return (
    <section className="flex flex-col items-center">
      <div className="mb-3 flex w-full flex-col items-center gap-y-6 md:mb-6 md:gap-y-9 lg:mb-5 lg:items-start lg:gap-y-10">
        <hr className="w-full max-w-[343px] border-2 border-[#000928] md:max-w-[680px] md:text-base lg:max-w-[768px]" />
        <p className="text-[13px] font-medium">
          <span className="text-xl font-bold md:text-2xl">{info.name} </span>
          的搜尋結果
        </p>
      </div>

      <div className="mb-9 flex w-full max-w-[375px] flex-col items-center justify-center gap-y-8 md:mb-12 md:max-w-[588px] md:flex-row md:flex-wrap md:justify-start md:gap-x-7 md:gap-y-10 lg:max-w-[768px] lg:gap-x-6 lg:gap-y-12 [&>*:last-child]:mt-[-4px] [&>*:last-child]:flex [&>*:last-child]:w-full [&>*:last-child]:justify-center md:[&>*:last-child]:mt-2 lg:[&>*:last-child]:mt-[52px]">
        <ArticlesList initialList={initialList} slug={slug} />
      </div>

      <hr className="mb-[38px] hidden w-[588px] border border-[#000928] md:block lg:hidden" />
    </section>
  )
}
