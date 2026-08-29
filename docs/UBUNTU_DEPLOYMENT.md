# Ubuntu deployment checklist

This is the target architecture for the first self-hosted release. Replace all example domains and secrets before deployment.

## Services

- Node.js 22 LTS and pnpm 11
- PostgreSQL 17
- Redis 7
- Nginx with HTTPS
- Medusa server process on port 9000
- Medusa worker process with `MEDUSA_WORKER_MODE=worker`
- Next.js storefront on port 8000
- Durable S3-compatible object storage before enabling Admin uploads

## Environment

Backend production values should include:

```env
NODE_ENV=production
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/immortal_store
REDIS_URL=redis://HOST:6379
JWT_SECRET=LONG_RANDOM_SECRET
COOKIE_SECRET=DIFFERENT_LONG_RANDOM_SECRET
AUTH_MFA_ENCRYPTION_KEY=32_BYTE_RANDOM_KEY
STORE_CORS=https://store.example.com
ADMIN_CORS=https://api.example.com
AUTH_CORS=https://api.example.com
```

Storefront production values should include:

```env
NODE_ENV=production
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.example.com
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_replace_me
NEXT_PUBLIC_BASE_URL=https://store.example.com
```

Never commit production environment files.

## Release sequence

```bash
git pull --ff-only
corepack enable
pnpm install --frozen-lockfile
pnpm db:migrate
pnpm backend:seed
pnpm build
```

Run Medusa and Next.js as dedicated unprivileged systemd users. Use one Medusa process for HTTP traffic and a separate worker process for background jobs. Proxy only ports 8000 and 9000 through Nginx; PostgreSQL and Redis should not be publicly reachable.

After every release, verify:

- `https://store.example.com/en` and `/ar` return 200;
- catalog requests to the Medusa Store API return the nine launch products;
- WhatsApp buttons contain the correct business number and product name;
- the Admin dashboard is protected and accessible only over HTTPS;
- database backups and restore testing are active.
