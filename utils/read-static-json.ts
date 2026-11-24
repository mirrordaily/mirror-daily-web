'use server'

import { STATIC_FILE_DOMAIN } from '@/constants/config'

/**
 * Read static JSON either from mounted filesystem (fs) or fallback to fetch from HTTPS
 *
 * Priority:
 * 1. Server-side with GCS FUSE mounted: read from filesystem using fs
 * 2. Fallback: fetch from HTTPS URL
 *
 * @param relativePath - Relative path from /json root (e.g., 'popular.json', 'latest_posts/index.json')
 * @returns Parsed JSON data
 *
 * @example
 * const data = await readStaticJson('topics.json')
 * const posts = await readStaticJson('latest_posts/index.json')
 */
export async function readStaticJson<T = unknown>(
  relativePath: string
): Promise<T> {
  // Remove leading slash if present
  const cleanPath = relativePath.startsWith('/')
    ? relativePath.slice(1)
    : relativePath

  // Bust CDN cache per request. A module-level timestamp stays fixed for the
  // life of the server process, so each instance kept fetching its own stale URL.
  const cacheTimestamp = Math.floor(Date.now() / 100)
  const fallbackUrl = `https://${STATIC_FILE_DOMAIN}/json/${cleanPath}?t=${cacheTimestamp}`
  const res = await fetch(fallbackUrl)
  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${fallbackUrl}: ${res.status} ${res.statusText}`
    )
  }
  return res.json() as Promise<T>
}
