import { useState, useEffect } from 'react'

export default function useCarouselIndex(length: number, interval: number) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (length <= 1) return

    const task = setInterval(
      () => setCurrentIndex((i) => (i + 1) % length),
      interval
    )

    return () => {
      clearInterval(task)
    }
  }, [length, interval])

  return currentIndex
}
