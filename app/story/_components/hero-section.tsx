import CustomImage from '@/shared-components/custom-image'
import ArticleTag from './tag'
import type { ItemInHeroSection } from '@/types/story-page'
import type { ReactNode } from 'react'

export default function HeroSection({
  title,
  subTitle,
  heroCaption,
  createdTime,
  postMainImage,
  sectionName,
  sectionColor,
  writers,
  photographers,
  tags,
}: ItemInHeroSection) {
  const getAuthorsContent = (authors: string[]) => {
    const dotSeparator = (
      <span className="mx-1 inline-block size-0.5 bg-[#000928] align-middle opacity-20" />
    )
    const elements: ReactNode[] = []

    authors.forEach((name, index) => {
      elements.push(name)
      if (index < authors.length - 1) {
        elements.push(dotSeparator)
      }
    })
    return elements
  }

  return (
    <section className="mb-4 flex max-w-screen-sm flex-col items-center md:mb-6 md:w-[600px] md:max-w-none lg:mb-4 lg:w-[720px] lg:items-start">
      <figure className="order-1 mb-6 flex w-full flex-col lg:order-2">
        <div className="mb-2 h-[187.5px] w-full md:h-[300px] lg:mb-4 lg:h-[360px]">
          <CustomImage
            images={postMainImage.resized}
            imagesWebP={postMainImage.resizedWebp}
            alt={title}
          />
        </div>
        <figcaption className="px-5 text-[13px] font-normal leading-normal text-[#7F8493] md:px-0">
          {heroCaption}
        </figcaption>
      </figure>

      <header className="order-2 px-5 md:px-0 lg:order-1">
        <p
          style={{ color: sectionColor }}
          className="mb-1"
        >{`| ${sectionName}`}</p>
        <h1 className="mb-3 text-2xl font-black leading-[1.3] text-[#212944] md:mb-1 lg:mb-4">
          {title}
        </h1>
        <h2 className="mb-3 text-xl font-bold leading-[1.4] text-[#212944] lg:mb-4">
          {subTitle}
        </h2>

        <div className="mb-4 flex flex-col gap-y-1 font-normal text-[#7F8493] md:mb-3 lg:mb-4">
          <p>發佈時間：{createdTime}</p>
          <p>記者：{getAuthorsContent(writers)}</p>
          <p>攝影：{getAuthorsContent(photographers)}</p>
        </div>

        <div className="flex flex-wrap gap-x-2 gap-y-4 md:grid-cols-6 md:gap-x-3 lg:mb-4">
          {tags.map((name) => (
            <ArticleTag name={name} key={name} />
          ))}
        </div>
      </header>
    </section>
  )
}
