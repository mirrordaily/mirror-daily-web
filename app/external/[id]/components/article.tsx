import '@/shared-styles/external.css'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import { MobileGptAd } from '@/shared-components/gpt-ad/mobile-gpt-ad'
import { ENV } from '@/constants/config'
import { ENVIRONMENT } from '@/constants/misc'

const isStagingOrProd =
  ENV === ENVIRONMENT.STAGING || ENV === ENVIRONMENT.PRODUCTION

type Props = {
  brief: string
  content: string
}

export default function Article({ brief, content }: Props) {
  return (
    <section className="max-w-sm md:w-[600px] md:max-w-none lg:w-[720px]">
      {brief && (
        <article
          className="brief"
          dangerouslySetInnerHTML={{ __html: brief }}
        />
      )}
      {!isStagingOrProd && (
        <DesktopGptAd
          slotKey="mirrordaily_article_PC_728x90_in1"
          customClasses="mx-auto mb-4"
        />
      )}
      {!isStagingOrProd && (
        <MobileGptAd
          slotKey="mirrordaily_article_MW_300x250_in1"
          customClasses="mx-auto mb-4"
        />
      )}
      {content && (
        <article
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </section>
  )
}
