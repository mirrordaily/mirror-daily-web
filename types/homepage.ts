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
}

export type ItemInTopNewsSection = Pick<
  LatestPost,
  'categoryName' | 'categoryColor' | 'postName' | 'postSlug' | 'publishedDate'
>

export type PickupItemInTopNewsSection = Pick<
  LatestPost,
  'postName' | 'heroImage'
> & {
  link: string
}
