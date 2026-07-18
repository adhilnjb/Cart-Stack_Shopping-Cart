import { z } from 'zod'

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().default(''),
  category: z.string(),
  price: z.number(),
  discountPercentage: z.number().default(0),
  rating: z.number().default(0),
  thumbnail: z.string(),
  stock: z.number().default(0),
})

export const productsResponseSchema = z.object({
  products: z.array(productSchema),
  total: z.number(),
  skip: z.number(),
  limit: z.number(),
})

export type Product = z.infer<typeof productSchema>
export type ProductsResponse = z.infer<typeof productsResponseSchema>
