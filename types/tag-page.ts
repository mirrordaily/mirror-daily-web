import type { HeroImage } from './common'

export type TagPost = {
  title: string
  createdTime: string
  brief: string
  link: string
  sectionColor: string
  sectionName: string
  content: string
  postMainImage: HeroImage
}

export type TagInfo = {
  name: string
}
