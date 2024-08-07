import type { HeroImage } from './common'

export type CategoryPost = {
  title: string
  slug: string
  createdTime: string
  brief: string
  link: string
  content: string
  postMainImage: HeroImage
}
