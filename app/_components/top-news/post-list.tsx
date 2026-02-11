import type { ItemInTopNewsSection } from '@/types/homepage'
import ListItem from './list-item'
import type { TOP_NEWS_LABELS } from './section'

type Props = {
  list: [...ItemInTopNewsSection[]]
  tab: keyof typeof TOP_NEWS_LABELS
}

export default function PostList({ list, tab }: Props) {
  if (!list.length) return null

  return (
    <div className="flex w-full flex-col gap-y-3">
      {list.map((post) => (
        <ListItem key={post.postId} {...post} tab={tab} />
      ))}
    </div>
  )
}
