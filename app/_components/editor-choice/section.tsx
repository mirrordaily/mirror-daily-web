import { fetchEditorChoices } from '@/app/actions'
import EditorChoiceMain from './main'

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
    <section className="section-in-homepage mb-9 mt-4 px-0 md:my-5 md:px-5 lg:mb-9 lg:mt-7 lg:px-9">
      <EditorChoiceMain {...data} />
    </section>
  )
}
