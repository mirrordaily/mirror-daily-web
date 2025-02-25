import type { GetTopicBasicInfoQuery } from '@/graphql/__generated__/graphql'
import { notFound } from 'next/navigation'
import { fetchGorupTypeTopicPostBySlug } from '../../../action'
import List from './list'

type Tag = NonNullable<NonNullable<GetTopicBasicInfoQuery['topic']>['tags']>[0]

type Props = {
  slug: string
  tags: Tag[]
}

export default async function GroupTypeListing({ slug, tags }: Props) {
  const posts = await fetchGorupTypeTopicPostBySlug(slug)

  if (posts.length === 0) notFound()

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

  return <div className="group-list">{groupElements}</div>
}
