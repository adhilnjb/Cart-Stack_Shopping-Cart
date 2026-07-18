import { MAX_QUANTITY, MIN_QUANTITY } from '@/types/cart'

interface QuantityStepperProps {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

export function QuantityStepper({ quantity, onIncrease, onDecrease }: QuantityStepperProps) {
  const atMin = quantity <= MIN_QUANTITY
  const atMax = quantity >= MAX_QUANTITY

  return (
    <div className="flex items-center rounded-lg border border-border">
      <button
        type="button"
        onClick={onDecrease}
        disabled={atMin}
        aria-label="Decrease quantity"
        className="px-2.5 py-1 text-ink-soft hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
      >
        −
      </button>
      <span className="font-numeric w-6 text-center text-sm font-medium text-ink">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={atMax}
        aria-label="Increase quantity"
        className="px-2.5 py-1 text-ink-soft hover:text-ink disabled:cursor-not-allowed disabled:opacity-30"
      >
        +
      </button>
    </div>
  )
}
