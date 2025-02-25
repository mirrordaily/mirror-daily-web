import { notFound } from 'next/navigation'
import { fetchListTypeTopicPostBySlug } from '../../../action'
import List from './list'

const PAGE_SIZE = 12

type Props = {
  slug: string
}

export default async function ListTypeListing({ slug }: Props) {
  const { items, totalAmount = 0 } = await fetchListTypeTopicPostBySlug({
    slug,
    take: PAGE_SIZE,
    skip: 0,
    withAmount: true,
  })

  if (totalAmount === 0) notFound()

  const fetchMorePosts = async (page: number) => {
    'use server'
    const { items } = await fetchListTypeTopicPostBySlug({
      slug,
      take: PAGE_SIZE,
      skip: PAGE_SIZE * (page - 1),
    })
    return items
  }

  return (
    <List
      pageSize={PAGE_SIZE}
      totalAmount={totalAmount}
      initialList={items}
      fetchMoreItem={fetchMorePosts}
    />
  )
}
