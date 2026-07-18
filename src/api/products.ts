import { productsResponseSchema, type Product } from '@/types/product'

const API_BASE = 'https://dummyjson.com'

export class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * Fetches products from the public DummyJSON API and validates the
 * response shape with Zod before it ever reaches React state. If the API
 * is unreachable, returns a non-2xx status, or returns a shape that does
 * not match `productsResponseSchema`, we throw an `ApiError` with a
 * user-friendly message that TanStack Query surfaces as `error`.
 */
export async function fetchProducts(): Promise<Product[]> {
  let response: Response
  try {
    // limit=0 asks DummyJSON for every product (100+), satisfying the
    // "at least 10 products" requirement with real data.
    response = await fetch(`${API_BASE}/products?limit=100`)
  } catch {
    throw new ApiError('Could not reach the product service. Check your connection and try again.')
  }

  if (!response.ok) {
    throw new ApiError(`The product service returned an error (${response.status}).`)
  }

  const json = await response.json()
  const parsed = productsResponseSchema.safeParse(json)

  if (!parsed.success) {
    console.error('Product API response failed validation:', parsed.error.flatten())
    throw new ApiError('The product data received was in an unexpected format.')
  }

  return parsed.data.products
}
