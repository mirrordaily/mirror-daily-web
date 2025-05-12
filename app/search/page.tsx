import { ENV } from '@/constants/config'
import SearchComponent from './_components/miso-search'
import { notFound } from 'next/navigation'

export default function SearchPage() {
  if (ENV === 'prod') notFound()
  return (
    <div>
      <SearchComponent />
    </div>
  )
}
