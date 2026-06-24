import NextImage from 'next/image'
import { SITE_URL } from '@/constants/config'

const VARIANT = {
  mobile: {
    size: 35,
  },
  desktop: {
    size: 48,
  },
}

type Props = {
  className?: string
  variant: keyof typeof VARIANT
}

export default function PreferredSourceIcon({ className, variant }: Props) {
  const { size } = VARIANT[variant]

  return (
    <a
      href={`https://google.com/preferences/source?q=${SITE_URL.replace('https://', '')}`}
      target="_blank"
      className={className}
    >
      <NextImage
        src="/icons/google-preferred-source.png"
        width={size}
        height={size}
        alt="Google 設為偏好來源"
      />
    </a>
  )
}
