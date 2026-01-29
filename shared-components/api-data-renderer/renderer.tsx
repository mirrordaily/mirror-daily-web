import AudioBlock from './block-renderer/audio-block'
import BackgroundImageBlock from './block-renderer/background-image-block'
import BackgroundVideoBlock from './block-renderer/background-video-block'
import BlockquoteBlock from './block-renderer/blockquote-block'
import CodeBlock from './block-renderer/code-block'
import ColorBoxBlock from './block-renderer/color-box'
import DividerBlock from './block-renderer/divider-block'
import EmbedCodeBlock from './block-renderer/embed-code-block'
import { Header2Block, Header3Block } from './block-renderer/header-block'
import ImageBlock from './block-renderer/image-block'
import InfoboxBlock from './block-renderer/infobox-block'
import { OrderListBlock, UnorderListBlock } from './block-renderer/list-block'
import SideIndexBlock from './block-renderer/side-index-block'
import SlideshowBlock from './block-renderer/slideshow-block'
import TableBlock from './block-renderer/table-block'
import type { ApiData, ApiDataBlock } from './block-renderer/types'
import UnstyledBlock from './block-renderer/unstyled-block'
import VideoBlock from './block-renderer/video-block'
import YoutubeBlock from './block-renderer/youtube-block'
import { ApiDataBlockType } from './types'
import { getOrganizationFromSourceCustomId } from './utils'
import { Fragment } from 'react'
import { DesktopGptAd } from '../gpt-ad/desktop-gpt-ad'
import { NonDesktopGptAd } from '../gpt-ad/non-desktop-gpt-ad'

export type { ApiData } from './block-renderer/types'

export default function ApiDataRenderer({
  apiData,
  sourceCustomId,
  isBrief,
  shouldShowAd,
  hasBrief,
}: {
  apiData: ApiData
  sourceCustomId: string
  isBrief: boolean
  shouldShowAd: boolean
  hasBrief: boolean
}) {
  const organization =
    getOrganizationFromSourceCustomId(sourceCustomId) || 'mirror-media'

  const getApiDataBlockJsx = (apiDataBlock: ApiDataBlock) => {
    switch (apiDataBlock.type) {
      case ApiDataBlockType.Unstyled:
      case ApiDataBlockType.Section:
        return (
          <UnstyledBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
        )
      case ApiDataBlockType.HeaderTwo:
        return (
          <Header2Block
            key={apiDataBlock.id}
            organization={organization}
            apiDataBlock={apiDataBlock}
          />
        )
      case ApiDataBlockType.HeaderThree:
        return (
          <Header3Block
            key={apiDataBlock.id}
            organization={organization}
            apiDataBlock={apiDataBlock}
          />
        )
      case ApiDataBlockType.Blockquote:
        return (
          <BlockquoteBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
        )
      case ApiDataBlockType.UnorderList:
        return (
          <UnorderListBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
        )
      case ApiDataBlockType.OrderList:
        return (
          <OrderListBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
        )
      case ApiDataBlockType.CodeBlock:
        return <CodeBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
      case ApiDataBlockType.Divider:
        return <DividerBlock key={apiDataBlock.id} />
      case ApiDataBlockType.Image:
        return <ImageBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
      case ApiDataBlockType.Video:
      case ApiDataBlockType.VideoV2:
        return (
          <VideoBlock
            key={apiDataBlock.id}
            organization={organization}
            apiDataBlock={apiDataBlock}
          />
        )
      case ApiDataBlockType.Slideshow:
      case ApiDataBlockType.SlideshowV2:
        return (
          <SlideshowBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
        )
      case ApiDataBlockType.Infobox:
        return (
          <InfoboxBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
        )
      case ApiDataBlockType.Audio:
      case ApiDataBlockType.AudioV2:
        return (
          <AudioBlock
            key={apiDataBlock.id}
            organization={organization}
            apiDataBlock={apiDataBlock}
          />
        )
      case ApiDataBlockType.Table:
        return <TableBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
      case ApiDataBlockType.ColorBox:
        return (
          <ColorBoxBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
        )
      case ApiDataBlockType.BackgroundImage:
        return (
          <BackgroundImageBlock
            key={apiDataBlock.id}
            organization={organization}
            apiDataBlock={apiDataBlock}
          />
        )
      case ApiDataBlockType.BackgroundVideo:
        return (
          <BackgroundVideoBlock
            key={apiDataBlock.id}
            organization={organization}
            apiDataBlock={apiDataBlock}
          />
        )
      case ApiDataBlockType.RelatedPost:
        return
      case ApiDataBlockType.SideIndex:
        return (
          <SideIndexBlock
            key={apiDataBlock.id}
            organization={organization}
            apiDataBlock={apiDataBlock}
          />
        )
      case ApiDataBlockType.Youtube:
        return (
          <YoutubeBlock
            key={apiDataBlock.id}
            organization={organization}
            apiDataBlock={apiDataBlock}
          />
        )
      case ApiDataBlockType.EmbedCode:
        return (
          <EmbedCodeBlock key={apiDataBlock.id} apiDataBlock={apiDataBlock} />
        )

      default: {
        const exhaustiveCheck: never = apiDataBlock
        console.error('unhandled apiData type', exhaustiveCheck)
        return null
      }
    }
  }

  /**
   * story 頁 in1 廣告規則：
   * 前言+兩段內文之後出現
   * 沒有前言時，第三段內文之後再出現
   */
  const adIndex = hasBrief ? 1 : 2

  return (
    <article className={`${isBrief ? 'brief' : 'content'} story-renderer`}>
      {apiData.map((apiDataBlock, i) => {
        const apiDataBlockJsx = getApiDataBlockJsx(apiDataBlock)

        return (
          <Fragment key={i}>
            {apiDataBlockJsx}
            {!isBrief && shouldShowAd && i === adIndex && (
              <>
                <DesktopGptAd
                  mode="normal"
                  slotKey="mirrordaily_article_PC_728x90_in1"
                  customClasses="mx-auto"
                />
                <NonDesktopGptAd
                  mode="normal"
                  slotKey="mirrordaily_article_MW_300x250_in1"
                  customClasses="mx-auto"
                />
              </>
            )}
          </Fragment>
        )
      })}
    </article>
  )
}
