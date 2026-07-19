import type { Product } from '@/types/product'
import { ProductCard } from './ProductCard'
import { ProductGridSkeleton } from '@/components/ui/Skeleton'
import { StatePanel } from '@/components/ui/StatePanel'
import { Button } from '@/components/ui/Button'

interface ProductGridProps {
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  products: Product[]
  hasActiveFilters: boolean
  onClearFilters: () => void
  onRetry: () => void
}

export function ProductGrid({
  isLoading,
  isError,
  errorMessage,
  products,
  hasActiveFilters,
  onClearFilters,
  onRetry,
}: ProductGridProps) {
  if (isLoading) {
    return <ProductGridSkeleton />
  }

  if (isError) {
    return (
      <StatePanel
        tone="danger"
        icon="⚠️"
        title="Couldn't load products"
        description={errorMessage ?? 'Something went wrong while fetching the product catalog.'}
        action={
          <Button variant="secondary" onClick={onRetry}>
            Try again
          </Button>
        }
      />
    )
  }

  if (products.length === 0) {
    return (
      <StatePanel
        icon="🔍"
        title="No products match your search"
        description="Try a different keyword, category, or price range."
        action={
          hasActiveFilters ? (
            <Button variant="secondary" onClick={onClearFilters}>
              Clear all filters
            </Button>
          ) : undefined
        }
      />
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}