import type { TopicPost } from '@/types/homepage'
import TopicMain from './topic-main'

export default function TopicAndGameSection() {
  const topic = {
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

  const data = {
    '2024巴黎奧運': [topic],
    富市台中: [topic, topic],
    台北畫刊: [topic, topic, topic],
    香港夜繽紛: [topic, topic, topic, topic],
    房市熱話題: [topic, topic, topic],
    魅力基隆: [topic, topic, topic],
    東京奧運: [topic, topic],
  } as const satisfies Record<string, [TopicPost, ...TopicPost[]]>

  return (
    <section className="section-in-homepage mb-[31px] mt-9 md:my-9">
      <TopicMain data={data} />
    </section>
  )
}
