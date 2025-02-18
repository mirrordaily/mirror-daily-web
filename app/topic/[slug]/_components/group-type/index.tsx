import type { GetTopicBasicInfoQuery } from '@/graphql/__generated__/graphql'
import { fetchGorupTypeTopicPostBySlug } from '../../../action'
import List from './list'

type Tag = NonNullable<NonNullable<GetTopicBasicInfoQuery['topic']>['tags']>[0]

type Props = {
  slug: string
  tags: Tag[]
}

export default async function GroupTypeListing({ slug, tags }: Props) {
  const posts = await fetchGorupTypeTopicPostBySlug(slug)

  return (
    <div className="group-list">
      {tags.map((tag) => (
        <>
          <List
            key={tag.id}
            groupName={tag.name || ''}
            posts={posts.filter((post) =>
              post.tags.some((postTag) => postTag.id === tag.id)
            )}
          />
          <div className="divider" />
        </>
      ))}
    </div>
  )
}
