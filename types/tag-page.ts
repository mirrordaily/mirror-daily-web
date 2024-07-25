import type { HeroImage } from './common'

export type TagPost = {
  title: string
  createdTime: string
  brief: string
  heroImage: HeroImage
  link: string
  sectionColor: string
  sectionName: string
  content: string
}

export type TagInfo = {
  name: string
}
