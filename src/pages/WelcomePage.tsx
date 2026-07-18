import { Link } from 'react-router-dom'

const HIGHLIGHTS = [
  {
    tag: '01',
    title: 'Curated catalog',
    description: 'A tight, honest selection — no endless scrolling through noise.',
    icon: (
      <path
        d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7Z M8 3v4M16 3v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    tag: '02',
    title: 'Fair pricing',
    description: 'Automatic 10% off once your cart passes $100. No codes needed.',
    icon: (
      <path
        d="m12 2 2.4 6.9L21 11l-6.6 2.1L12 20l-2.4-6.9L3 11l6.6-2.1L12 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    tag: '03',
    title: 'Simple checkout',
    description: 'Three short steps — review, ship, confirm. That is it.',
    icon: (
      <path
        d="m5 13 4 4L19 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
]

const STATS = [
  { label: 'Products', value: '30+' },
  { label: 'Checkout steps', value: '3' },
  { label: 'Hidden fees', value: '0' },
]

const QUOTES = [
  {
    quote: 'A good purchase is quiet — it just works, and you stop thinking about it.',
    author: 'The Fieldstock Ethos',
  },
  {
    quote: 'Buy less, choose well. A short list of honest products beats an endless feed.',
    author: 'The Fieldstock Ethos',
  },
  {
    quote: 'The best checkout is the one you barely notice happened.',
    author: 'The Fieldstock Ethos',
  },
]

export default function WelcomePage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-border">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 0%, color-mix(in srgb, var(--color-primary-soft) 70%, transparent) 0%, transparent 70%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute -right-16 top-10 -z-10 h-64 w-64 rounded-full opacity-60 blur-3xl"
          style={{ background: 'color-mix(in srgb, var(--color-accent-soft) 90%, transparent)' }}
        />
        <div
          aria-hidden="true"
          className="absolute -left-20 bottom-0 -z-10 h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{ background: 'color-mix(in srgb, var(--color-primary-soft) 90%, transparent)' }}
        />

        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-soft">
            🛍️ A small shop, built with care
          </span>

          <h1
            className="mt-6 text-4xl font-semibold leading-tight text-ink sm:text-5xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Shop smarter, every day.
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base text-ink-soft sm:text-lg">
            Browse a curated catalog, add what you love to your cart, and check out
            in three simple steps — no clutter, no surprises.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
            >
              Explore products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="#highlights"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-primary hover:text-primary"
            >
              Why Fieldstock
            </a>
          </div>

          <dl className="mx-auto mt-12 grid max-w-sm grid-cols-3 gap-4 border-t border-border pt-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs text-ink-soft">{stat.label}</dt>
                <dd className="font-numeric mt-1 text-xl font-semibold text-ink sm:text-2xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-border bg-primary-soft/40">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-primary">
            A few words we shop by
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            {QUOTES.map((item) => (
              <figure key={item.quote} className="flex flex-col rounded-xl border border-border bg-surface p-6">
                <svg width="26" height="20" viewBox="0 0 32 24" fill="none" aria-hidden="true" className="mb-3 text-primary/70">
                  <path
                    d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 3.6C9.2 5.2 6.8 8 6.8 12h6.8v12H0Zm17.6 0V14.4c0-8 4.8-13.2 12.8-14.4l1.6 3.6c-5.2 1.6-7.6 4.4-7.6 8.4h6.8v12H17.6Z"
                    fill="currentColor"
                  />
                </svg>
                <blockquote
                  className="flex-1 text-base italic leading-relaxed text-ink"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  “{item.quote}”
                </blockquote>
                <figcaption className="mt-4 text-xs font-medium text-ink-soft">— {item.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="highlights" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <div key={item.title} className="relative rounded-xl border border-border bg-surface p-5">
              <span className="font-numeric absolute right-4 top-4 text-xs text-ink-soft/50">{item.tag}</span>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {item.icon}
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-ink">{item.title}</h3>
              <p className="mt-1 text-sm text-ink-soft">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-xl border border-border bg-primary-soft p-6 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-lg font-semibold text-ink" style={{ fontFamily: 'var(--font-display)' }}>
              Ready to browse?
            </h2>
            <p className="text-sm text-ink-soft">Jump into the full catalog — search, filter, and add to cart.</p>
          </div>
          <Link
            to="/shop"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
          >
            Start shopping
          </Link>
        </div>
      </section>
    </main>
  )
}
