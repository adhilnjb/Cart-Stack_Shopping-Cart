import type { CartItem } from '@/types/cart'
import { formatCurrency } from '@/lib/format'
import { useCartStore } from '@/store/cartStore'
import { MAX_QUANTITY } from '@/types/cart'

function MinusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
      <path strokeLinecap="round" d="M5 12h14" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-3 w-3">
      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6h16Z" />
    </svg>
  )
}

export function CartLineItem({ item }: { item: CartItem }) {
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const removeItem = useCartStore((state) => state.removeItem)

  const lineTotal = item.price * item.quantity

  return (
    <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-4 sm:py-4">
      <div className="flex flex-1 items-start gap-3 sm:items-center">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-14 w-14 shrink-0 rounded-md object-cover sm:h-16 sm:w-16"
        />
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-medium text-ink">{item.title}</h3>
          <p className="text-xs text-ink-soft">{formatCurrency(item.price)} each</p>
        </div>

        <button
          onClick={() => removeItem(item.id)}
          aria-label={`Remove ${item.title} from cart`}
          className="shrink-0 rounded-md p-1.5 text-ink-soft transition-colors hover:bg-danger-soft hover:text-danger sm:hidden"
        >
          <TrashIcon />
        </button>
      </div>

      <div className="flex items-center justify-between gap-3 pl-[68px] sm:justify-end sm:gap-4 sm:pl-0">
        <div className="flex items-center gap-1 rounded-lg border border-border">
          <button
            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
            disabled={item.quantity <= 1}
            aria-label="Decrease quantity"
            className="flex h-7 w-7 items-center justify-center text-ink-soft disabled:opacity-30 sm:h-8 sm:w-8"
          >
            <MinusIcon />
          </button>
          <span className="font-numeric w-5 text-center text-sm font-semibold text-ink">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, Math.min(MAX_QUANTITY, item.quantity + 1))}
            disabled={item.quantity >= MAX_QUANTITY}
            aria-label="Increase quantity"
            className="flex h-7 w-7 items-center justify-center text-ink-soft disabled:opacity-30 sm:h-8 sm:w-8"
          >
            <PlusIcon />
          </button>
        </div>

        <span className="font-numeric w-16 shrink-0 text-right text-sm font-semibold text-ink sm:w-20">
          {formatCurrency(lineTotal)}
        </span>

        <button
          onClick={() => removeItem(item.id)}
          aria-label={`Remove ${item.title} from cart`}
          className="hidden shrink-0 rounded-md p-1.5 text-ink-soft transition-colors hover:bg-danger-soft hover:text-danger sm:block"
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  )
}