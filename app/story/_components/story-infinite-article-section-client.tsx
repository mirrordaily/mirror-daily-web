'use client'

import type { Post } from '@/types/story'
import HeroSection from './hero-section'
import Article from './article'
import SocialSharePanel from '@/shared-components/social-share-panel'

type Props = {
  postData: Post
  AdComponent: JSX.Element | undefined
}

export default function ArticleSectionClient({ postData, AdComponent }: Props) {
  return (
    <section
      className="mb-[72px] flex w-full flex-col items-center md:mb-[76px] lg:mb-[92px]"
      data-story-id={postData.id}
    >
      <div>
        <div className="max-w-screen-sm md:max-w-[600px] lg:max-w-screen-md">
          <HeroSection postData={postData} />

          <Article
            content={postData.apiDataBrief}
            isBrief={true}
            shouldShowAd={false}
          />
          <Article
            content={postData.apiData}
            isBrief={false}
            shouldShowAd={false}
          />

          {postData.warnings.map(({ id, content }) => (
            <p
              key={id}
              className="mt-3 whitespace-pre-wrap px-5 text-lg font-bold leading-loose text-[#212944] md:mt-8 md:px-0"
            >
              {content}
            </p>
          ))}

          <div className="md:hidden">
            <SocialSharePanel
              link={postData.link}
              hideShareButtons
              title={postData.title}
            />
          </div>
          <div className="hidden md:block">
            <SocialSharePanel link={postData.link} title={postData.title} />
          </div>

          {AdComponent}
        </div>
      </div>
    </section>
  )
}
