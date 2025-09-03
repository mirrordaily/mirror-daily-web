import type { GetRelatedPostsByExternalIdQuery } from '@/graphql/__generated__/graphql'

export type ExternalPost = {
  title: string
  thumb: string
  thumbCaption: string
  partner: string
  externalsLink: string
  publishedTime: string
  brief: string
  content: string
  tags: {
    name: string
    slug: string
  }[]
  link: string
  sectionName: string
}

export type PostIntro = Omit<ExternalPost, 'brief' | 'content' | 'link'>

export type RawRelatedFromExternal = NonNullable<
  GetRelatedPostsByExternalIdQuery['external']
>['relateds']
