import SectionDivider from './_components/divider'
import LatestNewsSection from './_components/latest-news/section'

export default function Home() {
  return (
    <main className="flex w-full grow flex-col items-center justify-center">
      {/* 編輯精選（5則輪播） */}
      <SectionDivider />
      {/* 即時新聞/熱門新聞（10則） */}
      <SectionDivider />
      {/* 短影音新聞 */}
      <SectionDivider />
      {/* Topic（4則）＋遊戲區 */}
      <SectionDivider />
      {/* 短影音．二創 */}
      <SectionDivider />
      <LatestNewsSection />
    </main>
  )
}
