import type { HeroImage } from '@/types/common'
import type { ApiData } from '@/shared-components/api-data-renderer/renderer'
import type { GetRelatedPostsByIdQuery } from '@/graphql/__generated__/graphql'

export type Contact = {
  link: string
  name: string
}

export type Post = {
  id: string
  title: string
  subtitle: string
  heroCaption: string
  publishedTime: string
  postMainImage: HeroImage
  sectionName: string
  sectionColor: string
  writers: Contact[]
  photographers: Contact[]
  mainWriters: Contact[]
  editors: Contact[]
  apiData: ApiData
  apiDataBrief: ApiData
  tags: { name: string; slug: string }[]
  algoTags: { name: string; slug: string }[]
  link: string
  warnings: { id: string; content: string }[]
  isAdult: boolean
}

export type ItemInHeroSection = Omit<
  Post,
  'apiData' | 'apiDataBrief' | 'id' | 'warnings' | 'isAdult'
>

type PostKeys = 'relatedsOne' | 'relatedsTwo' | 'relatedsThree'

export type RawRelatedFromPost =
  | NonNullable<GetRelatedPostsByIdQuery['post']>['relateds']
  | NonNullable<GetRelatedPostsByIdQuery['post']>[PostKeys]
