import type { CartItem } from '@/types/cart'
import type { CartTotals } from '@/store/cartStore'
import { CartLineItem } from '@/components/cart/CartLineItem'
import { CartSummary } from '@/components/cart/CartSummary'
import { Button } from '@/components/ui/Button'

interface CartReviewStepProps {
  items: CartItem[]
  totals: CartTotals
  onNext: () => void
}

export function CartReviewStep({ items, totals, onNext }: CartReviewStepProps) {
  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-[1fr_320px]">
      <div className="rounded-lg sm:rounded-xl border border-border bg-surface p-3 sm:p-4">
        <h2 className="mb-2 text-sm font-semibold text-ink">Items in your cart</h2>
        <div className="divide-y divide-border">
          {items.map((item) => (
            <CartLineItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <CartSummary totals={totals} />
        <Button onClick={onNext} disabled={!totals.meetsMinimum} className="w-full">
          Continue to shipping
        </Button>
      </div>
    </div>
  )
}