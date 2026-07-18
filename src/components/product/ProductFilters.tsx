import { PRICE_RANGE_OPTIONS, type PriceRange } from '@/hooks/useProductFilters'
import { Button } from '@/components/ui/Button'

interface ProductFiltersProps {
  search: string
  onSearchChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  categories: string[]
  priceRange: PriceRange
  onPriceRangeChange: (value: PriceRange) => void
  hasActiveFilters: boolean
  onClearFilters: () => void
  resultCount: number
}

export function ProductFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  categories,
  priceRange,
  onPriceRangeChange,
  hasActiveFilters,
  onClearFilters,
  resultCount,
}: ProductFiltersProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 rounded-xl border border-border bg-surface p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <svg
            viewBox="0 0 20 20"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-ink-soft stroke-2"
          >
            <circle cx="9" cy="9" r="6.5" />
            <path d="M14 14L18 18" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products by title..."
            aria-label="Search products by title"
            className="w-full rounded-lg border border-border bg-paper py-2.5 pl-9 pr-3 text-sm text-ink placeholder:text-ink-soft focus:border-primary focus:outline-none"
          />
        </div>

        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filter by category"
          className="rounded-lg border border-border bg-paper px-3 py-2.5 text-sm text-ink capitalize focus:border-primary focus:outline-none sm:w-48"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c} className="capitalize">
              {c}
            </option>
          ))}
        </select>

        <select
          value={priceRange}
          onChange={(e) => onPriceRangeChange(e.target.value as PriceRange)}
          aria-label="Filter by price"
          className="rounded-lg border border-border bg-paper px-3 py-2.5 text-sm text-ink focus:border-primary focus:outline-none sm:w-40"
        >
          {PRICE_RANGE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between text-xs text-ink-soft">
        <span>{resultCount} product{resultCount === 1 ? '' : 's'} found</span>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClearFilters} className="!px-2 !py-1">
            Clear all filters
          </Button>
        )}
      </div>
    </div>
  )
}
