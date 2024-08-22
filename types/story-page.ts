import type { HeroImage } from '@/types/common'
import type { ApiData } from '@/shared-components/api-data-renderer/renderer'

export type Post = {
  title: string
  subTitle: string
  heroCaption: string
  createdTime: string
  postMainImage: HeroImage
  sectionName: string
  sectionColor: string
  writers: string[]
  photographers: string[]
  apiData: ApiData
  apiDataBrief: ApiData
  tags: { name: string; slug: string }[]
  link: string
}

export type ItemInHeroSection = Omit<Post, 'apiData' | 'apiDataBrief'>

export type RelatedPost = {
  title: string
  createdTime: string
  link: string
  sectionColor: string
  sectionName: string
  postMainImage: HeroImage
}
