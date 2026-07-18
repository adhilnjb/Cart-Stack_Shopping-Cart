import type { Product } from '@/types/product'
import { RatingStars } from './RatingStars'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/format'
import { useCartStore } from '@/store/cartStore'
import { MAX_QUANTITY } from '@/types/cart'

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)
  const quantityInCart = useCartStore(
    (state) => state.items.find((item) => item.id === product.id)?.quantity ?? 0
  )
  const atLimit = quantityInCart >= MAX_QUANTITY
  const hasDiscount = product.discountPercentage > 0

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-200 ease-out hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden bg-primary-soft">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
        />

        {hasDiscount && (
          <span className="font-numeric absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold text-white">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        {/* Quick-add overlay, revealed on hover/focus for pointer users; the
            always-visible button below covers touch devices. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full justify-center bg-gradient-to-t from-ink/70 to-transparent p-3 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => addItem(product)}
            disabled={atLimit}
            className="pointer-events-auto rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow transition-colors hover:bg-accent hover:text-white disabled:opacity-60"
          >
            {atLimit ? 'Limit reached' : 'Quick add +'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="w-fit rounded-full bg-primary-soft px-2 py-0.5 text-[11px] font-medium capitalize text-primary">
          {product.category}
        </span>

        <h3 className="line-clamp-2 text-sm font-semibold text-ink" title={product.title}>
          {product.title}
        </h3>

        <RatingStars rating={product.rating} />

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-numeric text-lg font-semibold text-ink">
            {formatCurrency(product.price)}
          </span>
        </div>

        <Button
          size="sm"
          onClick={() => addItem(product)}
          disabled={atLimit}
          aria-label={`Add ${product.title} to cart`}
        >
          {atLimit ? 'Limit reached (5)' : quantityInCart > 0 ? `Add another (${quantityInCart} in cart)` : 'Add to cart'}
        </Button>
      </div>
    </div>
  )
}
