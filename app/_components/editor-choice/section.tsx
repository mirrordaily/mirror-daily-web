import { fetchEditorChoices } from '@/app/actions'
import EditorChoiceMain from './main'

// TODO: handle item with external link
export default async function EditorChoiceSection() {
  const data = await fetchEditorChoices()

  const hasNoData =
    Object.values(data).reduce(
      (amount: number, data) => amount + data.length,
      0
    ) === 0

  if (hasNoData) {
    return null
  }

  return (
    <section className="section-in-homepage mb-9 mt-[6px] md:my-5 md:px-5 lg:mb-0 lg:px-9">
      <EditorChoiceMain {...data} />
    </section>
  )
}
