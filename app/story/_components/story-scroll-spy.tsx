'use client'

import { useEffect, useMemo, useRef } from 'react'
import { isServer } from '@/utils/common'
import { SITE_NAME } from '@/constants/misc'
import { useDebounceCallback } from 'usehooks-ts'
import { SITE_BASE_PATH } from '@/constants/preview-mode'

type Article = {
  id: string
  title: string
}

export function StoryScrollSpy({
  articles,
  onActiveIdChange,
}: {
  articles: Article[]
  onActiveIdChange?: (id: string) => void
}) {
  const activeIdRef = useRef<string | null>(null)
  const titleById = useMemo(
    () => new Map(articles.map((a) => [a.id, a.title])),
    [articles]
  )

  const ssrFirstId = articles[0]?.id

  const getStoryPath = (id: string) => `${SITE_BASE_PATH}/story/${id}`

  const update = () => {
    const y = window.innerHeight * 0.35

    if (ssrFirstId) {
      const firstEl = document.querySelector(`[data-story-id="${ssrFirstId}"]`)
      if (firstEl) {
        const rect = firstEl.getBoundingClientRect()
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          if (activeIdRef.current !== ssrFirstId) {
            activeIdRef.current = ssrFirstId
            onActiveIdChange?.(ssrFirstId)
            const nextPath = getStoryPath(ssrFirstId)
            if (window.location.pathname !== nextPath) {
              window.history.replaceState(
                //for GTM tracking
                { articleId: ssrFirstId },
                '',
                nextPath
              )
              const title = titleById.get(ssrFirstId)
              if (title) document.title = `${title} - ${SITE_NAME}`
            }
          }
          return
        }
      }
    }

    for (const a of articles) {
      const el = document.querySelector(`[data-story-id="${a.id}"]`)
      if (!el) continue

      const rect = el.getBoundingClientRect()
      if (rect.top <= y && rect.bottom > y) {
        if (activeIdRef.current === a.id) return
        activeIdRef.current = a.id
        onActiveIdChange?.(a.id)

        const nextPath = getStoryPath(a.id)
        if (window.location.pathname !== nextPath) {
          window.history.replaceState(
            //for GTM tracking
            { articleId: a.id },
            '',
            nextPath
          )
          const title = titleById.get(a.id)
          if (title) document.title = `${title} - ${SITE_NAME}`
        }
        return
      }
    }
  }

  const debouncedUpdate = useDebounceCallback(update, 50)

  useEffect(() => {
    if (isServer()) return

    window.addEventListener('scroll', debouncedUpdate, { passive: true })
    window.addEventListener('resize', debouncedUpdate)
    debouncedUpdate()

    return () => {
      window.removeEventListener('scroll', debouncedUpdate)
      window.removeEventListener('resize', debouncedUpdate)
      debouncedUpdate.cancel?.()
    }
  }, [articles, debouncedUpdate, titleById])

  return null
}
