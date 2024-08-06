import Image from 'next/image'

type Props = {
  alt: string
  src: string
  width: number
  height: number
  text: string
  color: string
}

export default function ErrorMessage({
  alt,
  src,
  width,
  height,
  text,
  color,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-y-6">
      <Image alt={alt} src={src} width={width} height={height} />
      <p className="text-xl font-bold" style={{ color: color }}>
        {text}
      </p>
    </div>
  )
}
