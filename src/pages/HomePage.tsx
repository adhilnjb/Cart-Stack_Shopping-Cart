import { useProducts } from '@/hooks/useProducts'
import { useProductFilters } from '@/hooks/useProductFilters'
import { ProductFilters } from '@/components/product/ProductFilters'
import { ProductGrid } from '@/components/product/ProductGrid'

export function HomePage() {
  const { data: products, isLoading, isError, error, refetch } = useProducts()

  const {
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
  } = useProductFilters(products)

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-ink sm:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>
          Browse products
        </h1>
        <p className="text-sm text-ink-soft">A small, honest catalog — search, filter, and add to cart.</p>
      </div>

      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        categories={categories}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
        resultCount={filteredProducts.length}
      />

      <ProductGrid
        isLoading={isLoading}
        isError={isError}
        errorMessage={error?.message}
        products={filteredProducts}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={clearFilters}
        onRetry={() => refetch()}
      />
    </main>
  )
}
