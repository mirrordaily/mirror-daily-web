import SwiperComponent from './swiper-component'

export default function PromoteTopicSection() {
  // 推廣專題改由 client 端抓取，避免跟著頁面 HTML 被 CDN 快取
  return <SwiperComponent />
}
