import type { CartItem } from '@/types/cart'
import { QuantityStepper } from './QuantityStepper'
import { formatCurrency } from '@/lib/format'
import { useCartStore } from '@/store/cartStore'

export function CartLineItem({ item, readOnly = false }: { item: CartItem; readOnly?: boolean }) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  return (
    <div className="flex items-start gap-3 py-4 sm:items-center sm:gap-4">
      {/* Product Image - Scaled slightly larger for clearer mobile viewing */}
      <img 
        src={item.thumbnail} 
        alt={item.title} 
        className="h-16 w-16 shrink-0 rounded-lg border border-border object-cover bg-surface-muted sm:h-14 sm:w-14" 
      />
 
      {/* Main Content Layout Block */}
      <div className="flex-1 min-w-0 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        
        {/* Title & Unit Price Block */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink pr-4 sm:pr-0">
            {item.title}
          </p>
          <p className="font-numeric text-xs text-ink-soft mt-0.5">
            {formatCurrency(item.price)} each
          </p>
        </div>

        {/* Interactive Controls & Pricing Alignment Block */}
        <div className="flex items-center justify-between gap-4 mt-1 sm:mt-0 sm:justify-end sm:gap-6">
          
          {/* Quantity Selector or Static View */}
          <div className="flex-shrink-0">
            {readOnly ? (
              <span className="font-numeric text-sm text-ink-soft bg-surface-muted px-2 py-1 rounded">
                × {item.quantity}
              </span>
            ) : (
              <QuantityStepper
                quantity={item.quantity}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
              />
            )}
          </div>

          {/* Subtotal Price Display */}
          <span className="font-numeric text-sm font-semibold text-ink text-right min-w-[70px] sm:w-20">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>
      </div>

      {/* Remove Button - Positioned dynamically on top right for mobile, inline for desktop */}
      {!readOnly && (
        <div className="self-start pt-0.5 sm:self-center sm:pt-0">
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.title} from cart`}
            className="p-1 rounded-md text-ink-soft hover:text-danger hover:bg-danger/10 transition-colors focus:outline-none focus:ring-2 focus:ring-danger/20"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current stroke-2">
              <path d="M4 5h12M8 5V3.5A1.5 1.5 0 0 1 9.5 2h1A1.5 1.5 0 0 1 12 3.5V5M5.5 5l.6 10.5A1.5 1.5 0 0 0 7.6 17h4.8a1.5 1.5 0 0 0 1.5-1.5L14.5 5" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}