import type { HeroImage } from './common'

export type CategoryPost = {
  title: string
  slug: string
  createdTime: string
  brief: string
  heroImage: HeroImage
  link: string
  content: string
  ogImage: HeroImage
}
