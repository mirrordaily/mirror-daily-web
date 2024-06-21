import type { ResizedImage } from './common'

export type LatestPost = {
  categoryName: string
  categoryColor: string
  postName: string
  postSlug: string
  heroImage: {
    resized?: Partial<ResizedImage>
    resizedWebp?: Partial<ResizedImage>
  }
  publishedDate: string
}
