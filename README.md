# Immortal Games Store

A bilingual catalog website for Immortal Games Store, built with Medusa 2 and Next.js 15. English is the default language and every public page has an Arabic version with RTL layout.

Phase one is intentionally catalog-only: customers browse games, digital codes, and subscriptions, then send a prefilled inquiry to WhatsApp Business. There is no public cart, checkout, payment, customer account, or inventory quantity.

## What is included

- English routes under `/en` and Arabic routes under `/ar`
- Responsive dark navy and electric-blue Immortal visual system
- Searchable, filterable catalog
- Product detail pages with platform and availability information
- Product-specific WhatsApp inquiry links to `+20 15 52346010`
- Optional pricing model: products without a public price show “Ask for price”
- Medusa-managed launch catalog with an idempotent seed script
- Egypt region and EGP currency in Medusa
- Custom Open Graph artwork for social sharing

## Project structure

```text
apps/backend     Medusa backend and Admin dashboard
apps/storefront  Next.js storefront
docs             Catalog policy and Ubuntu deployment notes
```

## Local setup

Prerequisites: Node.js 22 or newer, pnpm 11, Docker, and Git.

1. Start PostgreSQL and Redis:

   ```bash
   docker compose -f docker-compose.dev.yml up -d
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Create local environment files:

   ```bash
   cp apps/backend/.env.template apps/backend/.env
   cp apps/storefront/.env.template apps/storefront/.env.local
   ```

4. Run database migrations and seed the Immortal catalog:

   ```bash
   pnpm db:migrate
   pnpm backend:seed
   ```

5. Create a Medusa Admin user with your own email and strong password:

   ```bash
   pnpm --filter @dtc/backend exec medusa user -e admin@example.com -p "replace-with-a-strong-password"
   ```

6. Start the backend:

   ```bash
   pnpm backend:dev
   ```

7. Open `http://localhost:9000/app`, create or copy the publishable API key, and place it in `apps/storefront/.env.local` as `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`.

8. Start the storefront:

   ```bash
   pnpm storefront:dev
   ```

The storefront runs at `http://localhost:8000/en`; the Arabic version is at `http://localhost:8000/ar`.

## Useful commands

| Command | Purpose |
| --- | --- |
| `pnpm backend:dev` | Run Medusa and Admin on port 9000 |
| `pnpm storefront:dev` | Run Next.js on port 8000 |
| `pnpm db:migrate` | Apply Medusa database migrations |
| `pnpm backend:seed` | Add or refresh the Immortal launch catalog |
| `pnpm build` | Build backend and storefront |

The seed script is safe to run repeatedly. It adds missing Immortal products, keeps their public availability manual, and leaves prices unset until the store chooses to publish them.

The launch selections and their review date are documented in [docs/TRENDING_SOURCES.md](docs/TRENDING_SOURCES.md).

## Phase-one rules

- WhatsApp is the only public ordering action.
- Price, edition, activation region, payment, and delivery are confirmed personally.
- Inventory quantities are not exposed or enforced.
- Account credentials are not sold or transferred through this catalog. See [Catalog policy](docs/CATALOG_POLICY.md).

## Deployment

The initial Ubuntu deployment checklist is in [docs/UBUNTU_DEPLOYMENT.md](docs/UBUNTU_DEPLOYMENT.md). Production requires PostgreSQL, Redis, strong secrets, exact CORS origins, durable object storage for future uploads, HTTPS, and separate Medusa server/worker processes.
