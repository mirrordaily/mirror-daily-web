import type { HeroImageFragment } from '@/graphql/__generated__/graphql'
import type { HeroImage } from '@/types/common'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

const getHeroImage = (
  rawImageObj:
    | Pick<HeroImageFragment, 'resized' | 'resizedWebp'>
    | string
    | null
    | undefined
): HeroImage => {
  if (typeof rawImageObj === 'object' || typeof rawImageObj === 'undefined') {
    if (rawImageObj !== null && rawImageObj !== undefined) {
      return Object.entries(rawImageObj).reduce<HeroImage>(
        (
          obj: HeroImage,
          [typeKey, valueObj]: [
            string,
            HeroImageFragment[keyof HeroImageFragment],
          ]
        ) => {
          type RawResziedImages = NonNullable<HeroImageFragment['resized']>
          type ResizedImages = NonNullable<HeroImage['resized']>

          if (['resized', 'resizedWebp'].includes(typeKey) && valueObj) {
            const newValueObj = Object.entries(valueObj).reduce<ResizedImages>(
              (
                values,
                [sizeKey, value]: [
                  string,
                  RawResziedImages[keyof RawResziedImages],
                ]
              ) => {
                if (value) {
                  values[sizeKey as keyof ResizedImages] = value
                }

                return values
              },
              {
                original: '',
              } satisfies ResizedImages
            )

            obj[typeKey as keyof HeroImage] = newValueObj
          }

          return obj
        },
        {
          resized: {
            original: '',
          },
        } satisfies HeroImage
      )
    } else
      return {
        resized: {
          original: '',
        },
      }
  } else {
    return {
      resized: {
        original: rawImageObj,
      },
    }
  }
}

const dateFormatter = (date: string) => {
  dayjs.extend(utc)
  const utcDate = dayjs(date).utc().format('YYYY/MM/DD HH:mm:ss')
  return utcDate
}

export { getHeroImage, dateFormatter }
