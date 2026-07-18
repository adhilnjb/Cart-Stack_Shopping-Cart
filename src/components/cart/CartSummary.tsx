import type { CartTotals } from '@/store/cartStore'
import { MIN_CHECKOUT_VALUE, DISCOUNT_THRESHOLD } from '@/store/cartStore'
import { formatCurrency } from '@/lib/format'

function Row({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1 text-sm">
      <span className={muted ? 'text-ink-soft' : 'text-ink'}>{label}</span>
      <span className={`font-numeric ${muted ? 'text-ink-soft' : 'font-semibold text-ink'}`}>{value}</span>
    </div>
  )
}

export function CartSummary({ totals }: { totals: CartTotals }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <Row label="Subtotal" value={formatCurrency(totals.subtotal)} muted />
      <Row label="Tax (5%)" value={formatCurrency(totals.tax)} muted />
      {totals.discount > 0 ? (
        <Row label="Discount (10%)" value={`− ${formatCurrency(totals.discount)}`} muted />
      ) : (
        <p className="py-1 text-xs text-ink-soft">
          Spend over {formatCurrency(DISCOUNT_THRESHOLD)} to unlock a 10% discount.
        </p>
      )}

      <div className="my-2 border-t border-dashed border-border" />

      <Row label="Total" value={formatCurrency(totals.total)} />

      {!totals.meetsMinimum && (
        <p className="mt-3 rounded-lg bg-danger-soft px-3 py-2 text-xs text-danger">
          Add {formatCurrency(MIN_CHECKOUT_VALUE - totals.subtotal)} more to reach the{' '}
          {formatCurrency(MIN_CHECKOUT_VALUE)} checkout minimum.
        </p>
      )}
    </div>
  )
}
