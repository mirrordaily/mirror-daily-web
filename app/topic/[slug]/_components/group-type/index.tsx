import type { GetTopicBasicInfoQuery } from '@/graphql/__generated__/graphql'
import { notFound } from 'next/navigation'
import { fetchGroupTypeTopicPostBySlug } from '../../../action'
import List from './list'
import { SITE_URL } from '@/constants/config'
import { IMAGE_PATH } from '@/constants/default-path'

type Tag = NonNullable<NonNullable<GetTopicBasicInfoQuery['topic']>['tags']>[0]

type Props = {
  slug: string
  tags: Tag[]
}

export default async function GroupTypeListing({ slug, tags }: Props) {
  const posts = await fetchGroupTypeTopicPostBySlug(slug)

  if (posts.length === 0) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, index) => {
      let imageUrl: string | undefined
      if (typeof post.postMainImage === 'string') {
        imageUrl = post.postMainImage
      } else {
        imageUrl = post.postMainImage.resized?.original
      }
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'NewsArticle',
          name: post.title,
          image: imageUrl || `${SITE_URL}${IMAGE_PATH}`,
          description: post.textContent,
          url: `${SITE_URL}${post.link}`,
        },
      }
    }),
  }

  const groupElements = tags.map((tag) => (
    <List
      key={tag.id}
      groupName={tag.name || ''}
      posts={posts.filter((post) =>
        post.tags.some((postTag) => postTag.id === tag.id)
      )}
    />
  ))

  const isEveryGroupEmpty = groupElements.every(
    (element) => element.props?.posts?.length === 0
  )

  if (isEveryGroupEmpty) notFound()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />
      <div className="group-list">{groupElements}</div>
    </>
  )
}
