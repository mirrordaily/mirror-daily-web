import type { HeroImage } from '@/types/common'
import type { ApiData } from '@/shared-components/api-data-renderer/renderer'

export type Contact = {
  link: string
  name: string
}

export type Post = {
  title: string
  subtitle: string
  heroCaption: string
  publishedTime: string
  postMainImage: HeroImage
  sectionName: string
  sectionColor: string
  writers: Contact[]
  photographers: Contact[]
  apiData: ApiData
  apiDataBrief: ApiData
  tags: { name: string; slug: string }[]
  link: string
}

export type ItemInHeroSection = Omit<Post, 'apiData' | 'apiDataBrief'>

export type RelatedPost = {
  title: string
  publishedTime: string
  link: string
  sectionColor: string
  sectionName: string
  postMainImage: HeroImage
}
