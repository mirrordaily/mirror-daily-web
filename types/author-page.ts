import type { HeroImage } from './common'

export type AuthorPost = {
  title: string
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
