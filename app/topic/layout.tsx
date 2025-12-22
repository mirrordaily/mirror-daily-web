import Header from '@/shared-components/header'
import Footer from '@/shared-components/footer'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="fixed inset-x-0 top-0 z-topic-header-mobile w-full bg-white md:static">
        <Header />
      </div>
      {/* main content */}
      <div className="flex w-full shrink-0 grow flex-col pt-36 md:pt-0">
        {children}
      </div>
      <Footer />
    </>
  )
}
