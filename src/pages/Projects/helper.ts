import { useEffect, useRef } from 'react'

export const useEffectOnce = (effect: React.EffectCallback) => {
  const mounted = useRef(false)
  useEffect(() => {
    if (mounted.current) {
      return
    }
    mounted.current = true
    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}