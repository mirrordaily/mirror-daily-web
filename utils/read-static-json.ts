'use server'

import fs from 'fs/promises'
import { isServer } from '@/utils/common'
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
  const mountDir = process.env.GCS_FUSE_MOUNT_DIR ?? '/statics'
  const bucketDomain = process.env.GCS_FUSE_STATIC_BUCKET ?? STATIC_FILE_DOMAIN

  // Remove leading slash if present
  const cleanPath = relativePath.startsWith('/')
    ? relativePath.slice(1)
    : relativePath

  // If running on server, try fs first
  if (isServer()) {
    try {
      const filePath = `${mountDir}/json/${cleanPath}`
      const content = await fs.readFile(filePath, 'utf-8')
      return JSON.parse(content) as T
    } catch (err) {
      console.warn(
        `[readStaticJson] fs read failed for ${cleanPath}, falling back to fetch:`,
        err
      )
    }
  }

  // Fallback to HTTP fetch
  const fallbackUrl = `https://${bucketDomain}/json/${cleanPath}?t=${Date.now() / 100}`
  const res = await fetch(fallbackUrl)
  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${fallbackUrl}: ${res.status} ${res.statusText}`
    )
  }
  return res.json() as Promise<T>
}
