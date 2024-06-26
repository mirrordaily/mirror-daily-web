export const getPostPageUrl = (slug: string, isExternal?: boolean) =>
  isExternal ? getExternalPageUrl(slug) : getStoryPageUrl(slug)

export const getExternalPageUrl = (slug: string) => `/external/${slug}`

export const getStoryPageUrl = (slug: string) => `/story/${slug}`
