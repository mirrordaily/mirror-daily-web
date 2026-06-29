import NextImage from 'next/image'
import { SHARE_BAR_ICON_SIZE } from '@/constants/misc'

const VARIANT = {
  mobile: {
    size: SHARE_BAR_ICON_SIZE,
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
      href="https://www.google.com/preferences/source?q=mirrordaily.news"
      target="_blank"
      rel="noopener noreferrer"
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
