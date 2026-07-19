import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useCartStore } from '../store/cartStore'
import { useCartTotals } from '../hooks/useCartTotals'

interface HeaderProps {
  onCartClick: () => void
}

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
]

export default function Header({ onCartClick }: HeaderProps) {
  const items = useCartStore((state) => state.items)
  const totals = useCartTotals()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-baseline gap-2" onClick={() => setMenuOpen(false)}>
          <span className="text-xl font-semibold tracking-tight text-ink" style={{ fontFamily: 'var(--font-display)' }}>
            Cart Stack
          </span>
          <span className="hidden text-xs text-ink-soft sm:inline">everyday goods, sensibly priced</span>
        </Link>

        <nav className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-ink-soft hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCartClick}
            aria-label={`Open cart, ${totals.itemCount} item${totals.itemCount === 1 ? '' : 's'}`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface transition-colors hover:border-primary"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M3 3h2l.4 2M7 13h10l3-8H5.4M7 13 5.4 5M7 13l-1.5 4H17M9 21a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {items.length > 0 && (
              <span className="font-numeric absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[11px] font-semibold text-white">
                {totals.itemCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface sm:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6 18 18M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col gap-1 border-t border-border bg-paper px-4 py-3 sm:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-primary-soft text-primary' : 'text-ink-soft hover:bg-primary-soft/60 hover:text-ink'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
