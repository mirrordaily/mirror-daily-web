import { useState, useEffect } from 'react'

const initialWindowSize = {
  width: 0,
  height: 0,
}

function getWindowSize() {
  const { innerWidth: width, innerHeight: height } = window

  return {
    width,
    height,
  }
}

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState(initialWindowSize)

  useEffect(() => {
    function handleResize() {
      setWindowSize(getWindowSize())
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSize
}
