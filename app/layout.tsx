import { GTM_ID } from '@/constants/config'
import StoreProvider from '@/redux/store-provider'
import UploadModal from '@/shared-components/shorts-upload/upload-modal'
import '@/shared-styles/global.css'
import type { Metadata } from 'next'
import { Noto_Sans_TC } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'
import { getDefaultMetadata } from '@/utils/common'

const notoSans = Noto_Sans_TC({
  preload: true,
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = getDefaultMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-Hant" className={notoSans.className}>
      <head>
        <meta name="google-adsense-account" content="ca-pub-6288011202409243" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6288011202409243"
          crossOrigin="anonymous"
        />
        <GoogleTagManager gtmId={GTM_ID} />
        <Script
          id="comscore"
          dangerouslySetInnerHTML={{
            __html: `var _comscore = _comscore || [];
                _comscore.push({ c1: "2", c2: "24318560" ,  options: { enableFirstPartyCookie: "true" } });
                (function() {
                  var s = document.createElement("script"), el = document.getElementsByTagName("script")[0]; s.async = true;
                  s.src = "https://sb.scorecardresearch.com/cs/24318560/beacon.js";
                  el.parentNode.insertBefore(s, el);
                })();`,
          }}
        />
        <Script
          src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"
          async
          crossOrigin="anonymous"
        />
        <Script
          type="text/javascript"
          id="popin"
          dangerouslySetInnerHTML={{
            __html: `    (function() {
            var pa = document.createElement('script'); pa.type = 'text/javascript'; pa.charset = "utf-8"; pa.async = true;
            pa.src = window.location.protocol + "//api.popin.cc/searchbox/mirrordaily_tw.js";
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(pa, s);
        })(); `,
          }}
        />
        {/* <!-- Begin Dable Script / For inquiries, visit http://dable.io --> */}
        <Script
          type="text/javascript"
          id="dable"
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
        {/* Meta Pixel Code */}
        <Script
          type="text/javascript"
          id="facebook"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1223816476113313');
            fbq('track', 'PageView');
            `,
          }}
        />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display: 'none'" src="https://www.facebook.com/tr?id=1223816476113313&ev=PageView&noscript=1" />`,
          }}
        />
        {/* End Meta Pixel Code */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img src="https://sb.scorecardresearch.com/p?c1=2&amp;c2=24318560&amp;cv=3.9.1&amp;cj=1">`,
          }}
        />
      </head>
      <body className="app-layout">
        <Script
          async
          strategy="beforeInteractive"
          src="https://cdn.jsdelivr.net/npm/@miso.ai/client-sdk@1.11.4/dist/umd/miso.min.js"
        />
        <StoreProvider>
          {children}
          <UploadModal />
        </StoreProvider>
      </body>
    </html>
  )
}
