export const getPostPageUrl = (slug: string, isExternal?: boolean) =>
  isExternal ? getExternalPageUrl(slug) : getStoryPageUrl(slug)

export const getExternalPageUrl = (slug: string) => `/external/${slug}`

export const getStoryPageUrl = (slug: string) => `/story/${slug}`

export const getSectionPageUrl = (slug: string) => `/section/${slug}`

export const getCategoryPageUrl = (slug: string) => `/category/${slug}`
