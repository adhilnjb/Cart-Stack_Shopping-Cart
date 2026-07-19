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

export function CartReviewStep({
  items,
  totals,
  onNext,
}: CartReviewStepProps) {
  return (
    <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 px-4 py-4 lg:grid-cols-[1.7fr_420px] lg:gap-8">

      {/* Cart Items */}
      <section className="rounded-xl border bg-surface p-4 shadow-sm sm:p-6">
        <h2 className="mb-4 text-xl font-bold text-ink">
          Items in your cart
        </h2>

        <div className="space-y-4">
          {items.map((item) => (
            <CartLineItem key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Summary */}
      <aside className="h-fit rounded-xl border bg-surface p-4 shadow-sm sm:sticky sm:top-6 sm:p-6">
        <div className="space-y-5">
          <CartSummary totals={totals} />

          <Button
            onClick={onNext}
            disabled={!totals.meetsMinimum}
            className="h-11 w-full text-base font-semibold"
          >
            Continue to Shipping
          </Button>
        </div>
      </aside>

    </div>
  )
}