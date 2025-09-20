'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { EditorChoice } from '@/types/homepage'
import EditorChoiceMain from './main'
import { URL_STATIC_EDITOR_CHOICE } from '@/constants/config'
import { z } from 'zod'
import { editorChoiceSchenma } from '@/utils/data-schema'
import { getExternalPageUrl, getStoryPageUrl } from '@/utils/site-urls'
import type { ImageDataFragment } from '@/graphql/__generated__/graphql'
import { getHeroImage } from '@/utils/data-process'

type Props = {
  editor: EditorChoice[]
  ai: EditorChoice[]
}

export default function EditorChoiceWithRefresh(initial: Props) {
  const [data, setData] = useState<Props>(initial)
  const isFetchingRef = useRef(false)

  const fetchAndMaybeUpdate = async () => {
    if (isFetchingRef.current) return
    isFetchingRef.current = true
    try {
      const schema = z.object({ editorChoices: z.array(editorChoiceSchenma) })
      const param = String(Date.now()).slice(0, 8)
      const resp = await fetch(`${URL_STATIC_EDITOR_CHOICE}?param=${param}`, {
        cache: 'no-store',
      })
      const parsed = await schema.parseAsync(await resp.json())

      const normalized: EditorChoice[] = (parsed.editorChoices || []).map(
        (
          {
            outlink,
            heroImage,
            choices: rawPost,
            choiceexternal: externalRawPost,
          },
          index
        ) => {
          const postId = rawPost?.id ?? ''
          const externalId = externalRawPost?.id ?? ''

          const getHeroImageByPostType = (
            imageParam:
              | Pick<ImageDataFragment, 'resized' | 'resizedWebp'>
              | string
              | null
              | undefined
          ) => {
            const editorChoiceHeroImage = heroImage ? getHeroImage(heroImage) : null
            return editorChoiceHeroImage || getHeroImage(imageParam)
          }

          if (outlink) {
            return {
              postId: '',
              postName: '',
              link: outlink,
              heroImage: getHeroImageByPostType(heroImage),
            }
          }

          if (externalId) {
            return {
              postId: `${index}-${externalId}`,
              postName: externalRawPost?.title ?? '',
              link: getExternalPageUrl(externalId),
              heroImage: getHeroImageByPostType(externalRawPost?.thumb),
            }
          }

          return {
            postId: `${index}-${postId}`,
            postName: rawPost?.title ?? '',
            link: getStoryPageUrl(postId),
            heroImage: getHeroImageByPostType(rawPost?.heroImage),
          }
        }
      )

      const prevIds = data.editor.map((e) => e.postId).join(',')
      const nextIds = normalized.map((e) => e.postId).join(',')
      if (prevIds !== nextIds) {
        setData({ editor: normalized.slice(0, 10), ai: [] })
      }
    } catch (err) {
      console.error(err)
    } finally {
      isFetchingRef.current = false
    }
  }

  useEffect(() => {
    const onFocus = () => fetchAndMaybeUpdate()
    const onOnline = () => fetchAndMaybeUpdate()
    window.addEventListener('focus', onFocus)
    window.addEventListener('online', onOnline)
    const t = setTimeout(fetchAndMaybeUpdate, 1500)
    const interval = setInterval(fetchAndMaybeUpdate, 180000)
    return () => {
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('online', onOnline)
      clearTimeout(t)
      clearInterval(interval)
    }
  }, [])

  const props = useMemo(() => data, [data])
  return <EditorChoiceMain {...props} />
}


