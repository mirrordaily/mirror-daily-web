/**
 * enrichRelatedPosts: 合併相關新聞和熱門新聞
 * 如果相關新聞不滿 6 篇，從熱門新聞中扣除前 6 篇已經顯示在側欄的，隨機選擇文章補足
 * 如果相關新聞數量足夠，則直接 return 相關新聞
 */
import { getRandomItems } from './common'
import type { PopularNews, RelatedPost } from '@/types/common'

const DEFAULT_MIN_RELATED_POSTS = 6

const enrichRelatedPosts = (
  relatedPosts: RelatedPost[],
  popularPosts: PopularNews[],
  minRelatedPosts = DEFAULT_MIN_RELATED_POSTS
): RelatedPost[] => {
  if (relatedPosts.length >= minRelatedPosts) return relatedPosts

  const postsToAdd = minRelatedPosts - relatedPosts.length
  const relatedIds = new Set(relatedPosts.map((post) => post.postId))
  const remainingPopularPosts = popularPosts
    .slice(6)
    .filter((post) => !relatedIds.has(post.postId))
  const randomPopularPosts = getRandomItems(remainingPopularPosts, postsToAdd)

  return [...relatedPosts, ...randomPopularPosts]
}

export { enrichRelatedPosts, DEFAULT_MIN_RELATED_POSTS }
