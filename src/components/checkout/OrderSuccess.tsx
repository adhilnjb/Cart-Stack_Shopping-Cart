import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/format'
import type { CartItem } from '@/types/cart'
import type { CartTotals } from '@/store/cartStore'
import type { ShippingFormValues } from '@/schemas/shipping'

interface OrderSuccessProps {
  orderId: string
  shipping: ShippingFormValues
  items: CartItem[]
  totals: CartTotals
}

const SHIPPING_ROWS: { label: string; key: keyof ShippingFormValues }[] = [
  { label: 'Full Name', key: 'fullName' },
  { label: 'Email', key: 'email' },
  { label: 'Phone Number', key: 'phone' },
  { label: 'Address', key: 'address' },
  { label: 'City', key: 'city' },
  { label: 'Postal Code', key: 'postalCode' },
]

export function OrderSuccess({ orderId, shipping, items, totals }: OrderSuccessProps) {
  const navigate = useNavigate()

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface px-6 py-10 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft text-2xl text-primary">
          ✓
        </div>
        <h2 className="text-xl font-semibold text-ink" style={{ fontFamily: 'var(--font-display)' }}>
          Order placed successfully
        </h2>
        <p className="max-w-sm text-sm text-ink-soft">
          Thanks, {shipping.fullName.split(' ')[0] || 'friend'}. Your order{' '}
          <span className="font-numeric font-medium text-ink">#{orderId}</span> has been noted for your
          records — this demo checkout does not process real payments.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <h3 className="mb-5 text-lg font-semibold text-ink">Shipping Details</h3>
        <div className="space-y-3">
          {SHIPPING_ROWS.map((row, i) => (
            <div
              key={row.key}
              className={`flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between ${
                i < SHIPPING_ROWS.length - 1 ? 'border-b border-border pb-3' : ''
              }`}
            >
              <span className="font-medium text-ink-soft">{row.label}</span>
              <span className="text-ink sm:text-right">{shipping[row.key]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-ink">Order Summary</h3>
        <div className="divide-y divide-border">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 py-2 text-sm">
              <span className="truncate text-ink">
                {item.title} <span className="text-ink-soft">× {item.quantity}</span>
              </span>
              <span className="font-numeric shrink-0 text-ink">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 space-y-1 border-t border-border pt-3 text-sm">
          <div className="flex justify-between text-ink-soft">
            <span>Subtotal</span>
            <span className="font-numeric">{formatCurrency(totals.subtotal)}</span>
          </div>
          <div className="flex justify-between text-ink-soft">
            <span>Tax</span>
            <span className="font-numeric">{formatCurrency(totals.tax)}</span>
          </div>
          {totals.discount > 0 && (
            <div className="flex justify-between text-primary">
              <span>Discount</span>
              <span className="font-numeric">− {formatCurrency(totals.discount)}</span>
            </div>
          )}
          <div className="flex justify-between pt-1 text-base font-semibold text-ink">
            <span>Total paid</span>
            <span className="font-numeric">{formatCurrency(totals.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <Button onClick={() => navigate('/shop')}>Continue shopping</Button>
      </div>
    </div>
  )
}
