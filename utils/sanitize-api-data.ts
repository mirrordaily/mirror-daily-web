/**
 * sanitizeApiData: 過濾 apiData 中列表 block 的 HTML
 * 列表項目以 dangerouslySetInnerHTML 渲染，於 server 端先 sanitize，避免 sanitize-html 被打包進 client
 */
import 'server-only'

import sanitizeHtml from 'sanitize-html'

import { ApiDataBlockType } from '@/shared-components/api-data-renderer/types'

const LIST_BLOCK_TYPES: unknown[] = [
  ApiDataBlockType.OrderList,
  ApiDataBlockType.UnorderList,
]

const sanitizeListContent = (content: unknown): unknown => {
  if (typeof content === 'string') return sanitizeHtml(content)
  if (Array.isArray(content)) return content.map(sanitizeListContent)
  return content
}

const sanitizeApiData = <T>(apiData: T): T => {
  if (!Array.isArray(apiData)) return apiData

  return apiData.map((block) => {
    if (!block || !LIST_BLOCK_TYPES.includes(block.type)) return block
    return { ...block, content: sanitizeListContent(block.content) }
  }) as T
}

export { sanitizeApiData }
