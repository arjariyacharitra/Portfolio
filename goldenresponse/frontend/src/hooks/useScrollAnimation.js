import { useEffect, useRef } from 'react'
import { useInView, useAnimation } from 'framer-motion'

/**
 * useScrollAnimation
 * Combines Framer Motion's useInView + useAnimation into a single
 * reusable hook. When the ref element enters the viewport, it triggers
 * the provided animation controls.
 *
 * @param {object} options
 * @param {number}  options.threshold  - 0–1 fraction of element visible before triggering (default 0.15)
 * @param {boolean} options.once       - Only animate once (default true)
 * @returns {{ ref, controls }}
 */
export function useScrollAnimation({ threshold = 0.15, once = true } = {}) {
  const ref = useRef(null)
  const controls = useAnimation()
  const isInView = useInView(ref, { amount: threshold, once })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    } else if (!once) {
      controls.start('hidden')
    }
  }, [isInView, controls, once])

  return { ref, controls }
}
