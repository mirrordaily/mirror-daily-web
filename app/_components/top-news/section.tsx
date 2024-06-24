/* 即時新聞、熱門新聞 */
import TopNewsMain from './main'
import { fetchLatestPost, fetchPopularPost } from '@/app/action'

export default async function TopNewsSection() {
  const latestPosts = await fetchLatestPost(0)
  const popularPosts = await fetchPopularPost()

  const postsOfTab: Parameters<typeof TopNewsMain>[0]['postsOfTab'] = {
    Latest: latestPosts.slice(0, 10),
    Hot: popularPosts,
  }

  return (
    <section className="section-in-homepage my-9 md:mt-6 lg:mb-[30px] lg:mt-7">
      <TopNewsMain postsOfTab={postsOfTab} />
    </section>
  )
}
