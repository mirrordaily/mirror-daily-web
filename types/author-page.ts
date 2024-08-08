import type { HeroImage } from './common'

export type AuthorPost = {
  title: string
  createdTime: string
  link: string
  sectionColor: string
  sectionName: string
  postMainImage: HeroImage
  textContent: string
}

export type AuthorInfo = {
  authorId: string
  name: string
}
