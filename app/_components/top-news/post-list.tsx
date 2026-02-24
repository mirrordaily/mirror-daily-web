import type { ItemInTopNewsSection } from '@/types/homepage'
import ListItem from './list-item'
import type { TOP_NEWS_LABELS } from './section'
import HighlightItem from './highlight-item'

type Props = {
  list: [...ItemInTopNewsSection[]]
  tab: keyof typeof TOP_NEWS_LABELS
}

export default function PostList({ list, tab }: Props) {
  if (!list.length) return null

  const isHotTab = tab === 'Hot'
  const firstPost = list[0]
  const restPosts = list.slice(1)

  return (
    <div className="flex w-full flex-col">
      {isHotTab ? (
        <div>
          <div className="md:hidden">
            {firstPost && <HighlightItem {...firstPost} />}
            <div className="mt-7 flex w-full flex-col gap-y-3">
              {restPosts.map((post) => (
                <ListItem key={post.postId} {...post} tab={tab} />
              ))}
            </div>
          </div>
          <div className="hidden w-full flex-col gap-y-3 md:flex">
            {list.map((post) => (
              <ListItem key={post.postId} {...post} tab={tab} />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col gap-y-3">
          {list.map((post) => (
            <ListItem key={post.postId} {...post} tab={tab} />
          ))}
        </div>
      )}
    </div>
  )
}
