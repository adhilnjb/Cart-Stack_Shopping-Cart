export function RatingStars({ rating }: { rating: number }) {
  const rounded = Math.round(rating)

  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`h-3.5 w-3.5 ${i < rounded ? 'fill-accent' : 'fill-border'}`}
          >
            <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.9l-5.2 2.61.99-5.79-4.21-4.1 5.82-.85L10 1.5z" />
          </svg>
        ))}
      </div>
      <span className="font-numeric text-xs text-ink-soft">{rating.toFixed(1)}</span>
    </div>
  )
}
