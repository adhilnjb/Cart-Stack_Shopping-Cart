import type { CartItem } from '@/types/cart'
import { QuantityStepper } from './QuantityStepper'
import { formatCurrency } from '@/lib/format'
import { useCartStore } from '@/store/cartStore'

export function CartLineItem({ item, readOnly = false }: { item: CartItem; readOnly?: boolean }) {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  return (
    <div className="flex items-center gap-3 py-3">
      <img src={item.thumbnail} alt={item.title} className="h-14 w-14 rounded-lg object-cover" />
 
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{item.title}</p>
        <p className="font-numeric text-xs text-ink-soft">{formatCurrency(item.price)} each</p>
      </div>

      {readOnly ? (
        <span className="font-numeric text-sm text-ink-soft">× {item.quantity}</span>
      ) : (
        <QuantityStepper
          quantity={item.quantity}
          onIncrease={() => increaseQuantity(item.id)}
          onDecrease={() => decreaseQuantity(item.id)}
        />
      )}

      <span className="font-numeric w-16 text-right text-sm font-semibold text-ink">
        {formatCurrency(item.price * item.quantity)}
      </span>

      {!readOnly && (
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          aria-label={`Remove ${item.title} from cart`}
          className="text-ink-soft hover:text-danger"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current stroke-2">
            <path d="M4 5h12M8 5V3.5A1.5 1.5 0 0 1 9.5 2h1A1.5 1.5 0 0 1 12 3.5V5M5.5 5l.6 10.5A1.5 1.5 0 0 0 7.6 17h4.8a1.5 1.5 0 0 0 1.5-1.5L14.5 5" />
          </svg>
        </button>
      )}
    </div>
  )
}
