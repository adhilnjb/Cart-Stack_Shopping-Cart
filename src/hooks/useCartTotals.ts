import { useMemo } from 'react'
import { useCartStore, getCartTotals } from '@/store/cartStore'

/**
 * Derives cart totals (subtotal, tax, discount, total) from the Zustand
 * cart items. Recomputed only when items actually change.
 */
export function useCartTotals() {
  const items = useCartStore((state) => state.items)
  return useMemo(() => getCartTotals(items), [items])
}
