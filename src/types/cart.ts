import type { Product } from './product'

export const MIN_QUANTITY = 1
export const MAX_QUANTITY = 5

export interface CartItem {
  id: number
  title: string
  price: number
  thumbnail: string
  quantity: number
}

export type ProductForCart = Pick<Product, 'id' | 'title' | 'price' | 'thumbnail'>
