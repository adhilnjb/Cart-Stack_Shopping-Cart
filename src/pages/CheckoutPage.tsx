import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useCartStore } from '@/store/cartStore'
import { useCartTotals } from '@/hooks/useCartTotals'
import { emptyShippingForm, type ShippingFormValues } from '@/schemas/shipping'
import { CheckoutStepper } from '@/components/checkout/CheckoutStepper'
import { CartReviewStep } from '@/components/checkout/CartReviewStep'
import { ShippingStep } from '@/components/checkout/ShippingStep'
import { PaymentSummaryStep } from '@/components/checkout/PaymentSummaryStep'
import { OrderSuccess } from '@/components/checkout/OrderSuccess'
import { PageTransition } from '@/components/PageTransition'
import { StatePanel } from '@/components/ui/StatePanel'
import { Button } from '@/components/ui/Button'
import type { CartItem } from '@/types/cart'
import type { CartTotals } from '@/store/cartStore'

type Step = 1 | 2 | 3

interface PlacedOrder {
  id: string
  items: CartItem[]
  totals: CartTotals
  shipping: ShippingFormValues
}

function generateOrderId(): string {
  return Math.random().toString(36).slice(2, 8).toUpperCase()
}

export function CheckoutPage() {
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const totals = useCartTotals()

  const [step, setStep] = useState<Step>(1)
  const [shipping, setShipping] = useState<ShippingFormValues>(emptyShippingForm)
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null)

  if (placedOrder) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <PageTransition>
          <OrderSuccess
            orderId={placedOrder.id}
            shipping={placedOrder.shipping}
            items={placedOrder.items}
            totals={placedOrder.totals}
          />
        </PageTransition>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <PageTransition>
          <StatePanel
            icon="🛒"
            title="Your cart is empty"
            description="Add a few products before heading to checkout."
            action={
              <Link to="/shop">
                <Button>Browse products</Button>
              </Link>
            }
          />
        </PageTransition>
      </main>
    )
  }

  function handlePlaceOrder() {
    setPlacedOrder({
      id: generateOrderId(),
      items,
      totals,
      shipping,
    })
    clearCart()
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <h1 className="mb-1 text-2xl font-semibold text-ink">Checkout</h1>
      <p className="mb-6 text-sm text-ink-soft">Complete your order in three quick steps.</p>

      <CheckoutStepper currentStep={step} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <PageTransition key="cart-review">
            <CartReviewStep items={items} totals={totals} onNext={() => setStep(2)} />
          </PageTransition>
        )}

        {step === 2 && (
          <PageTransition key="shipping">
            <ShippingStep
              values={shipping}
              onChange={setShipping}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          </PageTransition>
        )}

        {step === 3 && (
          <PageTransition key="payment-summary">
            <PaymentSummaryStep
              items={items}
              totals={totals}
              shipping={shipping}
              onBack={() => setStep(2)}
              onPlaceOrder={handlePlaceOrder}
            />
          </PageTransition>
        )}
      </AnimatePresence>
    </main>
  )
}
