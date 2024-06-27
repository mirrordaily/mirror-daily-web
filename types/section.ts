import type { GetPostsBySectionSlugQuery } from '@/graphql/__generated__/graphql'

export type Posts = NonNullable<GetPostsBySectionSlugQuery['posts']>
