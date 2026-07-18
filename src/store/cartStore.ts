import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MIN_QUANTITY, MAX_QUANTITY } from '../types/cart'
import type { CartItem, ProductForCart } from '../types/cart'

export { MIN_QUANTITY, MAX_QUANTITY }
export const TAX_RATE = 0.05
export const DISCOUNT_RATE = 0.1
export const DISCOUNT_THRESHOLD = 100
export const MIN_CHECKOUT_VALUE = 10

export interface CartTotals {
  subtotal: number
  tax: number
  discount: number
  total: number
  itemCount: number
  meetsMinimum: boolean
}

function round(value: number): number {
  return Math.round(value * 100) / 100
}

export function getCartTotals(items: CartItem[]): CartTotals {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * TAX_RATE
  const discount = subtotal > DISCOUNT_THRESHOLD ? subtotal * DISCOUNT_RATE : 0
  const total = subtotal + tax - discount
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  return {
    subtotal: round(subtotal),
    tax: round(tax),
    discount: round(discount),
    total: round(total),
    itemCount,
    meetsMinimum: total >= MIN_CHECKOUT_VALUE,
  }
}

interface CartState {
  items: CartItem[]
  addItem: (product: ProductForCart) => void
  removeItem: (id: number) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id)

          if (existing) {
            if (existing.quantity >= MAX_QUANTITY) return state
            return {
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
              ),
            }
          }

          return {
            items: [
              ...state.items,
              {
                id: product.id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail,
                quantity: MIN_QUANTITY,
              },
            ],
          }
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.quantity < MAX_QUANTITY
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.quantity > MIN_QUANTITY
              ? { ...item, quantity: item.quantity - 1 }
              : item,
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'shopping-cart-storage',
    },
  ),
)
