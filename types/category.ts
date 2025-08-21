import type { HeroImage } from './common'

export type CategoryPost = {
  id: string
  title: string
  formattedDate: string
  link: string
  postMainImage: HeroImage | string
  textContent: string
  brief: string
}
