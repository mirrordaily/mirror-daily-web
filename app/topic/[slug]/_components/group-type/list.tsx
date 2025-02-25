'use client'

import type { TopicPostData } from '@/types/topic'
import ArticleCard from '../article-card'

type Props = {
  groupName: string
  posts: TopicPostData[]
}

export default function List({ groupName, posts }: Props) {
  if (posts.length === 0) return null

  return (
    <>
      <div className="group">
        <p className="title">{groupName}</p>
        <div className="list-container">
          {posts.map((post) => (
            <ArticleCard key={post.slug} {...post} />
          ))}
        </div>
      </div>
      <div className="divider" />
    </>
  )
}
