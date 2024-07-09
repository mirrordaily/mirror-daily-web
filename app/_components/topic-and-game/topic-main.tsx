import type { TopicPost } from '@/types/homepage'
import TopicItem from './topic-item'

export default function TopicMain() {
  const data: TopicPost = {
    postName: '餵給電視餵給電視餵給電視餵給電視餵給電視餵給電視餵給電視',
    postSlug: '20240621',
    heroImage: {
      resized: {
        original:
          'https://v3-statics-dev.mirrormedia.mg/images/a6b63b27-faef-4f8d-88ed-9096ae87d9fa.webp',
        w480: 'https://v3-statics-dev.mirrormedia.mg/images/a6b63b27-faef-4f8d-88ed-9096ae87d9fa-w480.webp',
        w800: 'https://v3-statics-dev.mirrormedia.mg/images/a6b63b27-faef-4f8d-88ed-9096ae87d9fa-w800.webp',
        w1200:
          'https://v3-statics-dev.mirrormedia.mg/images/a6b63b27-faef-4f8d-88ed-9096ae87d9fa-w1200.webp',
        w1600:
          'https://v3-statics-dev.mirrormedia.mg/images/a6b63b27-faef-4f8d-88ed-9096ae87d9fa-w1600.webp',
      },
      resizedWebp: {
        original:
          'https://v3-statics-dev.mirrormedia.mg/images/a6b63b27-faef-4f8d-88ed-9096ae87d9fa.webP',
        w480: 'https://v3-statics-dev.mirrormedia.mg/images/a6b63b27-faef-4f8d-88ed-9096ae87d9fa-w480.webP',
        w800: 'https://v3-statics-dev.mirrormedia.mg/images/a6b63b27-faef-4f8d-88ed-9096ae87d9fa-w800.webP',
        w1200:
          'https://v3-statics-dev.mirrormedia.mg/images/a6b63b27-faef-4f8d-88ed-9096ae87d9fa-w1200.webP',
        w1600:
          'https://v3-statics-dev.mirrormedia.mg/images/a6b63b27-faef-4f8d-88ed-9096ae87d9fa-w1600.webP',
      },
    },
    link: '/story/20240621',
    topicLink: '/topic/news',
  }

  return (
    <div className="flex w-full shrink-0 flex-col lg:max-w-[760px]">
      <div>{/* topic selector */}</div>
      <div className="mt-[15px] flex w-full flex-col flex-wrap justify-between gap-y-4 md:flex-row md:gap-y-7">
        <TopicItem {...data} isFirst={true} />
        <TopicItem {...data} />
        <TopicItem {...data} />
        <TopicItem {...data} />
      </div>
    </div>
  )
}
