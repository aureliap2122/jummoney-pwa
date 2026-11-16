import { useEffect, useState } from 'react'

export default function useCountUp(target, ms = 600) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }
    let raf
    let start
    const step = (t) => {
      start ??= t
      const p = Math.min((t - start) / ms, 1)
      setValue(target * p)
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, ms])

  return value
}