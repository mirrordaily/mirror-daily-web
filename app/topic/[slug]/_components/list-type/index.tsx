import { notFound } from 'next/navigation'
import { fetchListTypeTopicPostBySlug } from '../../../action'
import List from './list'
import { PAGE_SIZE } from '@/constants/topic'

type Props = {
  slug: string
}

export default async function ListTypeListing({ slug }: Props) {
  const { postsData, postsCount } = await fetchListTypeTopicPostBySlug({
    slug,
    take: PAGE_SIZE,
    page: 1,
    withAmount: true,
  })

  if (postsCount === 0) notFound()

  const fetchMorePosts = async (page: number) => {
    'use server'
    const { postsData } = await fetchListTypeTopicPostBySlug({
      slug,
      take: PAGE_SIZE,
      page,
    })
    return postsData
  }

  return (
    <List
      pageSize={PAGE_SIZE}
      totalAmount={postsCount}
      initialList={postsData}
      fetchMoreItem={fetchMorePosts}
    />
  )
}
