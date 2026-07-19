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
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-4 lg:grid-cols-[1.7fr_400px]">

      <section className="rounded-xl border p-4">
        <h2 className="mb-4 text-xl font-semibold">
          Items in your cart
        </h2>

        <div className="space-y-4">
          {items.map((item) => (
            <CartLineItem
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </section>

      <aside className="rounded-xl border p-4 lg:sticky lg:top-6 h-fit">
        <CartSummary totals={totals} />

        <Button
          className="mt-4 w-full"
          onClick={onNext}
          disabled={!totals.meetsMinimum}
        >
          Continue to Shipping
        </Button>
      </aside>

    </div>
  )
}