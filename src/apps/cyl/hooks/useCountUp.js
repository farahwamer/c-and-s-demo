import { useState, useEffect } from 'react'

export function useCountUp(target, duration = 1400) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime = null
    let frame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [target, duration])

  return count
}
