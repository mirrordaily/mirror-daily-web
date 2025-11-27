import '@/shared-styles/external.css'
import { DesktopGptAd } from '@/shared-components/gpt-ad/desktop-gpt-ad'
import { NonDesktopGptAd } from '@/shared-components/gpt-ad/non-desktop-gpt-ad'

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
      <DesktopGptAd
        mode="normal"
        slotKey="mirrordaily_article_PC_728x90_in1"
        customClasses="mx-auto mb-4"
      />
      <NonDesktopGptAd
        mode="normal"
        slotKey="mirrordaily_article_MW_300x250_in1"
        customClasses="mx-auto mb-4"
      />
      {content && (
        <article
          className="content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </section>
  )
}
