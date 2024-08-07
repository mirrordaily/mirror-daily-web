import type { ReactElement } from 'react'

type Props = {
  text: string
  color: string
  children: ReactElement
}

export default function ErrorMessage({ text, color, children }: Props) {
  return (
    <div className="flex flex-col items-center gap-y-6">
      {children}
      <p className="text-xl font-bold" style={{ color: color }}>
        {text}
      </p>
    </div>
  )
}
