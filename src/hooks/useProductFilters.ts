import { useMemo, useState } from 'react'
import type { Product } from '../types/product'

export const ALL_CATEGORIES = 'all'

export type PriceRange = 'all' | 'under25' | '25to50' | '50to100' | 'over100'

export const PRICE_RANGE_OPTIONS: { value: PriceRange; label: string }[] = [
  { value: 'all', label: 'All prices' },
  { value: 'under25', label: 'Under $25' },
  { value: '25to50', label: '$25 – $50' },
  { value: '50to100', label: '$50 – $100' },
  { value: 'over100', label: 'Over $100' },
]

const PRICE_MATCHERS: Record<PriceRange, (price: number) => boolean> = {
  all: () => true,
  under25: (price) => price < 25,
  '25to50': (price) => price >= 25 && price <= 50,
  '50to100': (price) => price > 50 && price <= 100,
  over100: (price) => price > 100,
}

export function useProductFilters(products: Product[] | undefined) {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(ALL_CATEGORIES)
  const [priceRange, setPriceRange] = useState<PriceRange>('all')

  const categories = useMemo(() => {
    if (!products) return []
    return Array.from(new Set(products.map((p) => p.category))).sort()
  }, [products])

  const filteredProducts = useMemo(() => {
    if (!products) return []

    const query = search.trim().toLowerCase()
    const matchesPrice = PRICE_MATCHERS[priceRange] ?? PRICE_MATCHERS.all

    return products.filter((product) => {
      const matchesSearch = query ? product.title.toLowerCase().includes(query) : true
      const matchesCategory = category === ALL_CATEGORIES ? true : product.category === category

      return matchesSearch && matchesCategory && matchesPrice(product.price)
    })
  }, [products, search, category, priceRange])

  const hasActiveFilters =
    search.trim() !== '' || category !== ALL_CATEGORIES || priceRange !== 'all'

  const clearFilters = () => {
    setSearch('')
    setCategory(ALL_CATEGORIES)
    setPriceRange('all')
  }

  return {
    search,
    setSearch,
    category,
    setCategory,
    priceRange,
    setPriceRange,
    categories,
    filteredProducts,
    hasActiveFilters,
    clearFilters,
  }
}
