/* 即時新聞、熱門新聞 */
import TopNewsMain from './main'

export default async function TopNewsSection() {
  return (
    <section className="section-in-homepage my-9 md:mt-6 lg:mb-[30px] lg:mt-7">
      <TopNewsMain />
    </section>
  )
}
