import type {
  ApiData,
  ApiDataBlock,
} from '@/shared-components/api-data-renderer/block-renderer/types'
import UnstyledBlock from '@/shared-components/api-data-renderer/block-renderer/unstyled-block'
import { ApiDataBlockType } from '@/shared-components/api-data-renderer/types'

const getBlockJsx = (apiDataBlock: ApiDataBlock) => {
  switch (apiDataBlock.type) {
    case ApiDataBlockType.Unstyled:
      return <UnstyledBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
    case ApiDataBlockType.HeaderTwo:
      return (
        <h2
          key={apiDataBlock.id}
          className="text-lg font-bold leading-snug text-white lg:text-xl"
        >
          {apiDataBlock.content[0]}
        </h2>
      )
    case ApiDataBlockType.HeaderThree:
      return (
        <h3
          key={apiDataBlock.id}
          className="text-base font-bold leading-snug text-white lg:text-lg"
        >
          {apiDataBlock.content[0]}
        </h3>
      )
    default:
      return null
  }
}

export default function TopicBrief({
  apiDataBrief,
}: {
  apiDataBrief: ApiData | null | undefined
}) {
  const blocksJsx = (apiDataBrief ?? [])
    .map(getBlockJsx)
    .filter((blockJsx) => blockJsx !== null)

  if (!blocksJsx.length) {
    return null
  }

  return (
    <div className="space-y-3 text-base font-normal leading-normal text-mirror-blue-200 [&_a]:underline hover-or-active:[&_a]:text-white">
      {blocksJsx}
    </div>
  )
}
