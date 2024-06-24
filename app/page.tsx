import LatestNewsSection from './_components/latest-news/section'

export default function Home() {
  return (
    <main className="flex w-full grow flex-col items-center justify-center">
      <div className="section-in-homepage w-full md:max-w-screen-md lg:max-w-none">
        <hr className="mb-9 mt-[34px] h-px border-none bg-[#000928] lg:mt-9" />
      </div>
      <LatestNewsSection />
    </main>
  )
}
