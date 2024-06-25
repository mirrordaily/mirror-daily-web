/* 即時新聞、熱門新聞 */
import TopNewsMain from './main'
import { fetchLatestPost, fetchPopularPost, fetchLiveEvent } from '@/app/action'
import type { ParameterOfComponent } from '@/types/common'
import { getPostPageUrl } from '@/utils/site-urls'

export default async function TopNewsSection() {
  const liveEvent = await fetchLiveEvent()
  const latestPosts = await fetchLatestPost(0)
  const popularPosts = await fetchPopularPost()

  let latestList: ParameterOfComponent<
    typeof TopNewsMain
  >['postsOfTab']['Latest'] = [undefined]

  if (liveEvent) {
    latestList = [liveEvent, ...latestPosts.slice(0, 9)]
  } else {
    const first = latestPosts[0]

    if (first) {
      latestList = [
        {
          postName: first.postName,
          heroImage: first.heroImage,
          link: getPostPageUrl(first.postSlug),
        },
        ...latestPosts.slice(1, 9),
      ]
    }
  }

  let hotList: ParameterOfComponent<typeof TopNewsMain>['postsOfTab']['Hot'] = [
    undefined,
  ]

  {
    const first = popularPosts[0]

    if (first) {
      hotList = [
        {
          postName: first.postName,
          heroImage: first.heroImage,
          link: getPostPageUrl(first.postSlug),
        },
        ...popularPosts.slice(1, 9),
      ]
    }
  }

  const postsOfTab: ParameterOfComponent<typeof TopNewsMain>['postsOfTab'] = {
    Latest: latestList,
    Hot: hotList,
  }

  return (
    <section className="section-in-homepage my-9 md:mt-6 lg:mb-[30px] lg:mt-7">
      <TopNewsMain postsOfTab={postsOfTab} />
    </section>
  )
}
