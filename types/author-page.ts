import type { HeroImage } from './common'

export type AuthorPost = {
  title: string
  createdTime: string
  brief: string
  heroImage: HeroImage
  link: string
  sectionColor: string
  sectionName: string
  content: string
  ogImage: HeroImage
}

export type AuthorInfo = {
  authorId: string
  name: string
}
