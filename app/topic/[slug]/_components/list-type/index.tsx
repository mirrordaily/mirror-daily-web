import { notFound } from 'next/navigation'
import { fetchListTypeTopicPostBySlug } from '../../../action'
import List from './list'

const PAGE_SIZE = 12

type Props = {
  slug: string
}

export default async function ListTypeListing({ slug }: Props) {
  const { postsData, postsCount } = await fetchListTypeTopicPostBySlug({
    slug,
    take: PAGE_SIZE,
    skip: 0,
    withAmount: true,
  })

  if (postsCount === 0) notFound()

  const fetchMorePosts = async (page: number) => {
    'use server'
    const { postsData } = await fetchListTypeTopicPostBySlug({
      slug,
      take: PAGE_SIZE,
      skip: PAGE_SIZE * (page - 1),
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
