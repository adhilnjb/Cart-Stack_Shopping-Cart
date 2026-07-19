# Fieldstock — Shopping Cart

An intern-assignment shopping cart application: browse products, search/filter,
manage a cart, and complete a 3-step checkout.

## Project overview

Fieldstock is a small storefront built around the [DummyJSON products API](https://dummyjson.com/products).
It covers the full flow from browsing → cart → checkout, with client-side
validation, persistent cart state, and a small welcome page as an entry point.

## Technologies used

- **React 19** + **TypeScript**
- **Vite** — dev server & build
- **React Router** — Welcome / Shop / Checkout routes
- **Tailwind CSS v4** — styling, via `@tailwindcss/vite`, with a `@/` import alias
- **Zustand** — cart state, persisted to `localStorage`
- **TanStack Query** — product data fetching, caching, loading/error states
- **Zod** — validating the product API response and the shipping form
- **Framer Motion** — a small amount of transition polish on the cart drawer and checkout steps
- **pnpm** — package manager

## Setup instructions

```bash
pnpm install
```

## Commands to run the project

```bash
pnpm dev      # start the dev server
pnpm build    # type-check, then produce a production build in dist/
pnpm preview  # preview the production build locally
pnpm lint     # run oxlint
```

## API used

Products are fetched from `https://dummyjson.com/products` using TanStack Query.
The response is parsed with a Zod schema (`src/types/product.ts`) before it's
used anywhere in the app — if the shape doesn't match, the query fails and the
UI shows the error state rather than rendering bad data.

## Features completed

- Responsive product grid (image, title, category, rating, price, add-to-cart)
  with loading, error, empty-search, and empty-catalog states
- Search by title, category filter, price filter, clear filters — logic lives
  in a single `useProductFilters` hook, decoupled from the UI
- Cart: add, remove, increase/decrease quantity (clamped 1–5), clear — all in
  a Zustand store, persisted to `localStorage` via the `persist` middleware
- Cart summary: per-item totals, subtotal, 5% tax, 10% discount over $100,
  final total, and a disabled-checkout message when under the $10 minimum
- 3-step checkout (Cart Review → Shipping → Payment Summary), each step gated
  behind the previous step's validity
- Shipping form built with plain `useState` (no form library), validated
  with Zod, with errors shown inline per field
- Read-only payment summary showing shipping details, items, and totals;
  placing an order shows a confirmation receipt and clears the cart
- A welcome/landing page as the app's entry point, linking into the catalog

## Known limitations

- No payment gateway integration (not required by the brief)
- No automated tests yet for the cart total calculations (listed as an
  optional bonus item)
- No product detail page, sorting, or dark mode (all optional bonus items)
- Shipping validation is intentionally strict (Gmail-only email, 10-digit
  Indian mobile format, 6-digit PIN code) rather than the minimal
  "required + valid email" the brief asks for — a deliberate choice, but
  worth loosening if the reviewer expects broader input formats
- Product data itself isn't persisted or cached beyond TanStack Query's
  in-memory cache — a hard refresh re-fetches from the API

## How it works

A short walkthrough of the key pieces — useful if you need to explain any of
this during review:

- **Product fetching**: `useProducts()` wraps a single TanStack Query call to
  `fetchProducts()` (`src/api/products.ts`). The raw response is parsed with
  `productsResponseSchema` (`src/types/product.ts`) before anything touches
  the UI — if the API ever changes shape, the query fails fast into the error
  state instead of rendering bad data.
- **Why TanStack Query**: it owns caching, loading, and error state for
  *remote* data so components don't need their own `useEffect`/`useState`
  fetching boilerplate, and re-fetches are deduped automatically.
- **The Zustand store** (`src/store/cartStore.ts`): holds only cart items —
  never the fetched product list, per the brief. `addItem`, `removeItem`,
  `increaseQuantity`, `decreaseQuantity`, and `clearCart` are the only ways
  to mutate it; quantity is clamped to 1–5 inside the store itself so no
  component can bypass the limit.
- **Cart persistence**: the store is wrapped in Zustand's `persist`
  middleware, which serializes `items` to `localStorage` under
  `shopping-cart-storage` and rehydrates it on load — a refresh doesn't lose
  the cart.
- **Cart totals**: `getCartTotals()` is a single pure function (same file as
  the store) that takes `items` and returns `{ subtotal, tax, discount,
  total, itemCount, meetsMinimum }`. Tax is a flat 5% of subtotal; a 10%
  discount applies only once subtotal exceeds $100; `meetsMinimum` flags
  whether the total clears the $10 checkout floor. Keeping this as one
  function (rather than scattering the math across components) is what
  makes it testable and easy to verify by hand.
- **Zod validation**: used in two places — parsing the product API response,
  and validating the shipping form (`src/schemas/shipping.ts`). Both define
  a schema once and derive the TypeScript type from it (`z.infer<...>`), so
  the type and the runtime check can never drift apart.
- **Loading/error/empty states**: `ProductGrid` branches on TanStack Query's
  `isLoading`/`isError`/data-length before rendering anything else, using
  shared `Skeleton` and `StatePanel` components so every state looks
  consistent instead of each screen inventing its own spinner or message.
- **Why components/hooks are split the way they are**: hooks
  (`useProducts`, `useProductFilters`, `useCartTotals`) hold logic that
  doesn't care about markup; components stay focused on rendering. This
  makes the logic independently readable (and testable) without needing to
  render anything.

## Deployment

Push this repo to GitHub, then connect it to one of:

- **Vercel** — [vercel.com/new](https://vercel.com/new), import the repo,
  framework preset "Vite", no extra config needed
- **Netlify** — build command `pnpm build`, publish directory `dist`
- **Cloudflare Pages** — build command `pnpm build`, output directory `dist`

All three auto-detect this as a Vite project. No environment variables are
required since the product API is public.

## Project structure

```
src/
├── api/                   # fetchProducts (validated with Zod)
├── components/
│   ├── cart/               # CartDrawer, CartLineItem, CartSummary, QuantityStepper
│   ├── checkout/            # CheckoutStepper, CartReviewStep, ShippingStep, PaymentSummaryStep, OrderSuccess
│   ├── product/             # ProductCard, ProductFilters, ProductGrid, RatingStars
│   ├── ui/                  # Button, Skeleton, StatePanel (shared primitives)
│   └── Header.tsx, PageTransition.tsx
├── hooks/                  # useProducts, useProductFilters, useCartTotals
├── pages/                  # WelcomePage, HomePage, CheckoutPage
├── schemas/                # Zod schema for the shipping form
├── store/                  # Zustand cart store + total calculations
├── types/                  # Product / cart types (+ product Zod schema)
└── lib/format.ts           # currency formatting
```
