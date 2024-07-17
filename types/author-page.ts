import type { HeroImage } from './common'

export type Post = {
  title: string
  slug: string
  createdTime: string
  brief: string
  heroImage: HeroImage
  link: string
  sectionColor: string
  sectionName: string
}

export type AuthorInfo = {
  authorId: string
  name: string
}
