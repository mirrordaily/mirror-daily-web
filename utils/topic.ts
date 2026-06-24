import type { PostDataWithTags } from '@/types/topic'

export function getUrlFromTopicKeywords(keyword?: string | null) {
  if (!keyword) return undefined

  if (keyword.startsWith('@-')) {
    return keyword.slice(2)
  }

  return undefined
}

export function filterPostsByTag(
  posts: PostDataWithTags[],
  tag: { id: string }
) {
  return posts.filter((post) =>
    post.tags.some((postTag) => postTag.id === tag.id)
  )
}
