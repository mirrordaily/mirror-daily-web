import Header from '@/shared-components/header'
import Footer from '@/shared-components/footer'
import Script from 'next/script'
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Header />
      {/* <!-- Begin Dable Script / For inquiries, visit http://dable.io --> */}
      <Script
        type="text/javascript"
        id="dable-script"
        dangerouslySetInnerHTML={{
          __html: `
            (function(d,a,b,l,e,r) {
              if(d[b] && d[b].q)return;d[b]=d[b]||function(){(d[b].q=d[b].q||[]).push(arguments)};e=a.createElement(l);
              e.async=1;e.charset='utf-8';e.src='//static.dable.io/dist/plugin.min.js';
              r=a.getElementsByTagName(l)[0];r.parentNode.insertBefore(e,r);
              })(window,document,'dable','script');
            dable('setService', 'mirrordaily.news');
            dable('sendLogOnce');
              `,
        }}
      />

      {/* <!-- End Dable Script / For inquiries, visit http://dable.io --> */}
      {/* main content */}
      <div className="flex w-full max-w-screen-lg shrink-0 grow flex-col">
        {children}
      </div>
      <Footer />
    </>
  )
}
