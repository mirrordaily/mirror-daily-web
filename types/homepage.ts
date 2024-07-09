import type { HeroImageFragment } from '@/graphql/__generated__/graphql'

export type HeroImage = {
  resized?: Partial<
    Record<
      keyof Omit<NonNullable<HeroImageFragment['resized']>, '__typename'>,
      string
    >
  >
  resizedWebp?: Partial<
    Record<
      keyof Omit<NonNullable<HeroImageFragment['resizedWebp']>, '__typename'>,
      string
    >
  >
}

export type LatestPost = {
  categoryName: string
  categoryColor: string
  postName: string
  postSlug: string
  heroImage: HeroImage
  publishedDate: string
  link: string
}

export type ItemInTopNewsSection = Pick<
  LatestPost,
  | 'categoryName'
  | 'categoryColor'
  | 'postName'
  | 'postSlug'
  | 'publishedDate'
  | 'link'
>

export type PickupItemInTopNewsSection = Pick<
  LatestPost,
  'postName' | 'heroImage' | 'link'
>

export type SectionAndCategory = {
  name: string
  slug: string
  color: string
  categories: {
    name: string
    slug: string
    color: string
  }[]
}

export type FlashNews = Pick<LatestPost, 'postSlug' | 'postName' | 'link'>

export type EditorChoice = Pick<
  LatestPost,
  'postName' | 'postSlug' | 'link' | 'heroImage'
>
