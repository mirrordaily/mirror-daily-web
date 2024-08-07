import type { HeroImage } from './common'

export type AuthorPost = {
  title: string
  createdTime: string
  brief: string
  link: string
  sectionColor: string
  sectionName: string
  content: string
  postMainImage: HeroImage
}

export type AuthorInfo = {
  authorId: string
  name: string
}
