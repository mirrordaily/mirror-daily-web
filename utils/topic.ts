export function getUrlFromTopicKeywords(keyword?: string | null) {
  if (!keyword) return undefined

  if (keyword.startsWith('@-')) {
    return keyword.slice(2)
  }

  return undefined
}
