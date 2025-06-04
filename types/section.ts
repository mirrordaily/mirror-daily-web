import type { HeroImage } from './common'

export type SectionPost = {
  id: string
  title: string
  formattedDate: string
  link: string
  postMainImage: HeroImage | string
  textContent: string
}
