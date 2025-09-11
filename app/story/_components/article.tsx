import '@/shared-styles/article.css'
import ApiDataRenderer, {
  type ApiData,
} from '@/shared-components/api-data-renderer/renderer'

const sourceCustomId = 'mirrormedia'

export default function Article({
  content,
  isBrief = false,
  shouldShowAd = true,
}: {
  content: ApiData
  isBrief?: boolean
  shouldShowAd?: boolean
}) {
  return (
    <ApiDataRenderer
      isBrief={isBrief}
      apiData={content}
      sourceCustomId={sourceCustomId}
      shouldShowAd={shouldShowAd}
    />
  )
}
