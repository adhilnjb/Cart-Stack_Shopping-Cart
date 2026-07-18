import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { useCartTotals } from '@/hooks/useCartTotals'
import { CartLineItem } from './CartLineItem'
import { CartSummary } from './CartSummary'
import { Button } from '@/components/ui/Button'
import { StatePanel } from '@/components/ui/StatePanel'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const totals = useCartTotals()
  const navigate = useNavigate()

  function handleCheckout() {
    onClose()
    navigate('/checkout')
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.button
            aria-label="Close cart"
            className="absolute inset-0 bg-ink/40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            className="relative flex h-full w-full max-w-md flex-col bg-paper shadow-xl sm:w-[420px]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="text-lg font-semibold text-ink">Your cart ({totals.itemCount})</h2>
              <button aria-label="Close cart" onClick={onClose} className="text-ink-soft hover:text-ink">
                <svg viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-current stroke-2">
                  <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5">
              {items.length === 0 ? (
                <div className="py-8">
                  <StatePanel icon="🛒" title="Your cart is empty" description="Add products to see them here." />
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {items.map((item) => (
                    <CartLineItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="space-y-3 border-t border-border p-5">
                <CartSummary totals={totals} />
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={clearCart} className="flex-1">
                    Clear cart
                  </Button>
                  <Button onClick={handleCheckout} disabled={!totals.meetsMinimum} className="flex-1">
                    Checkout
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
