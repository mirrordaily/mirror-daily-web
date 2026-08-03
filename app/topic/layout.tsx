import Header from '@/shared-components/header'
import Footer from '@/shared-components/footer'

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {/* main content */}
      <div className="flex w-full shrink-0 grow flex-col pt-44 md:pt-0">
        {children}
      </div>
      <Footer />
    </>
  )
}
