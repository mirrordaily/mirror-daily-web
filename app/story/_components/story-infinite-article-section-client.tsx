'use client'

import { useEffect, useState } from 'react'
import type { JSX } from 'react'
import type { Post } from '@/types/story'
import type { RelatedPost } from '@/types/common'
import type { PopularNews } from '@/types/common'
import HeroSection from './hero-section'
import Article from './article'
import RelatedNewsSection from './related-news-section'
import SocialSharePanel from '@/shared-components/social-share-panel'
import { fetchRelatedPosts } from '../actions'
import { enrichRelatedPosts } from '@/utils/related-posts'

type Props = {
  postData: Post
  AdComponent: JSX.Element | undefined
  popularPosts: PopularNews[]
}

export default function ArticleSectionClient({
  postData,
  AdComponent,
  popularPosts,
}: Props) {
  const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([])

  useEffect(() => {
    let isMounted = true

    const fetchRelated = async () => {
      const result = await fetchRelatedPosts(postData.id)
      if (!isMounted) return
      setRelatedPosts(enrichRelatedPosts(result, popularPosts))
    }

    fetchRelated()

    return () => {
      isMounted = false
    }
  }, [popularPosts, postData.id])

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

          <RelatedNewsSection posts={relatedPosts} />

          {AdComponent}
        </div>
      </div>
    </section>
  )
}
