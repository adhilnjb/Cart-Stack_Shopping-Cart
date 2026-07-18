import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

/**
 * A restrained, single transition used everywhere content changes (route
 * changes, checkout step changes): a short slide down from just above its
 * resting position combined with a fade. No bounce, no big scale, nothing
 * that draws attention to itself -- it should just feel like the new
 * content settles into place under the (fixed) navbar.
 *
 * MotionConfig at the app root sets reducedMotion="user", so this
 * automatically collapses to an instant, motion-free swap for anyone with
 * "reduce motion" enabled at the OS level.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
