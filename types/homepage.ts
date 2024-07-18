import type { HeroImage } from './common'

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

export type FlashNews = Pick<LatestPost, 'postSlug' | 'postName' | 'link'>

export type EditorChoice = Pick<
  LatestPost,
  'postName' | 'postSlug' | 'link' | 'heroImage'
>

export type TopicPost = Pick<
  LatestPost,
  'postName' | 'postSlug' | 'link' | 'heroImage'
> & {
  topicLink: string
}
