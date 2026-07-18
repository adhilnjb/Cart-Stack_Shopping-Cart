import type { CartItem } from "@/types/cart";
import type { CartTotals } from "@/store/cartStore";
import type { ShippingFormValues } from "@/schemas/shipping";

import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/ui/Button";

interface PaymentSummaryStepProps {
  items: CartItem[];
  totals: CartTotals;
  shipping: ShippingFormValues;
  onBack: () => void;
  onPlaceOrder: () => void;
}

export function PaymentSummaryStep({
  items,
  totals,
  shipping,
  onBack,
  onPlaceOrder,
}: PaymentSummaryStepProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      {/* Left Side */}
      <div className="space-y-6">
        {/* Shipping Details */}
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-ink">
            Shipping Details
          </h2>

          <div className="space-y-3">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="font-medium text-gray-500">Full Name</span>
              <span className="text-ink">{shipping.fullName}</span>
            </div>

            <div className="flex justify-between border-b border-border pb-2">
              <span className="font-medium text-gray-500">Email</span>
              <span className="text-ink">{shipping.email}</span>
            </div>

            <div className="flex justify-between border-b border-border pb-2">
              <span className="font-medium text-gray-500">Phone Number</span>
              <span className="text-ink">{shipping.phone}</span>
            </div>

            <div className="flex justify-between border-b border-border pb-2">
              <span className="font-medium text-gray-500">Address</span>
              <span className="text-right text-ink">
                {shipping.address}
              </span>
            </div>

            <div className="flex justify-between border-b border-border pb-2">
              <span className="font-medium text-gray-500">City</span>
              <span className="text-ink">{shipping.city}</span>
            </div>

            <div className="flex justify-between">
              <span className="font-medium text-gray-500">
                Postal Code
              </span>
              <span className="text-ink">{shipping.postalCode}</span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-ink">
            Cart Items
          </h2>

          <div className="divide-y divide-border">
            {items.length > 0 ? (
              items.map((item) => (
                <CartLineItem
                  key={item.id}
                  item={item}
                  readOnly
                />
              ))
            ) : (
              <p className="py-4 text-center text-gray-500">
                No items in cart.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="space-y-4">
        <CartSummary totals={totals} />

        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onBack}
            className="flex-1"
          >
            Back
          </Button>

          <Button
            type="button"
            onClick={onPlaceOrder}
            className="flex-1"
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
}