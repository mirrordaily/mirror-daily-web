import '@/shared-styles/external.css'

type Props = {
  brief: string
  content: string
}

export default function Article({ brief, content }: Props) {
  return (
    <section className="max-w-sm md:w-[600px] md:max-w-none lg:w-[720px]">
      <article className="brief" dangerouslySetInnerHTML={{ __html: brief }} />
      <article
        className="content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  )
}
