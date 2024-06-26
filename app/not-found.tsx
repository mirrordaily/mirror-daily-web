import Link from 'next/link'

export default function NotFound() {
  //TODO: 404 and 500 page ui
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}
