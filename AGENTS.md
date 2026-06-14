# workplacify — Agent Guide

## Stack
- Next.js 15 (Pages Router), tRPC v10, Chakra UI v3, Prisma 6 (PostgreSQL), NextAuth v4, Zod
- React 18, Vitest (unit, globals enabled, excludes `playwright/`), Playwright (E2E, desktop Chrome only, video always on)
- i18n via next-intl (en/de/it), PostHog analytics, Cloudinary floor-plan images, Discord bot for notifications

## Dev server
```sh
npm run dx           # parallel: db-up + migrate-dev + db-seed + next dev --experimental-https
npm run dx:next      # serial: same tasks then dev server
```
HTTPS required by NextAuth (certificates in `certificates/`). Dev URL: `https://127.0.0.1:3000`.

## Database
PostgreSQL via Docker on port **5835**. Prisma schema uses **snake_case** everywhere (`@map`).
```sh
npm run db-up        # docker compose up -d
npm run db-nuke      # docker compose down --volumes --remove-orphans
npm run db-seed      # prisma db seed (via tsx prisma/seed.ts)
npm run db-reset     # prisma migrate dev reset
npm run migrate-dev  # create new migration
npm run migrate      # prisma migrate deploy (CI-safe)
```
After editing `prisma/schema.prisma`:
```sh
npm run generate            # prisma generate (auto-runs on postinstall)
npm run prisma-case-format  # reformats schema to snake_case
```

## Verification (run in order)
```sh
npm run lint         # eslint --cache --ext .js,.ts,.tsx src/
npm run tsc          # tsc --noEmit
npm run test:unit    # vitest run
npm run test:e2e     # playwright test (needs dev server)
npm run test-dev     # start-server-and-test: dev -> http://127.0.0.1:3000 -> test
npm run test-start   # same but with prod build + start
```
**Do not run `npm run build` locally** — `prebuild` runs `prisma migrate deploy`. CI uses `npm run build-ci` (skips migration).

## Key gotchas
- **`src/server/env.js`** must stay `.js` — it is CJS-`require`d by `next.config.js`.
- **`src/pages/app/`** is Pages Router, not App Router (Next.js 15 still uses `pages/`).
- **E2E auth**: most pages require login (NextAuth + Google/Microsoft). No mock auth set up.
- **Vitest globals**: `describe`, `it`, `expect` available without imports.
- **`tsx`** (not `ts-node`) runs TypeScript scripts (e.g. seed).
- **`npm install`** auto-runs `prisma generate` via `postinstall`.
- **Pre-commit** (Husky + lint-staged): runs `eslint --cache --fix && prettier --write` on staged `*.{js,ts,tsx}`. Do not format manually before commit unless file is staged.
- **CI** ([`.github/workflows/main.yml`](.github/workflows/main.yml)): copies `.env.example → .env`, `npm ci`, `npm run build-ci`. Tests are **not** run in CI.

## Deployment
- Render.com via `render.yaml`. Health check: `GET /api/trpc/healthcheck`.
- Build command: `npm install --include=dev && npm run build --include=dev`.

## Project structure
| Path | Purpose |
|---|---|
| `src/pages/app/` | App pages (auth-gated, sidebar layout) |
| `src/pages/api/trpc/[trpc].ts` | tRPC HTTP handler |
| `src/pages/api/auth/[...nextauth].tsx` | NextAuth config (Google + Microsoft Entra) |
| `src/server/routers/_app.ts` | Root tRPC router (merges all sub-routers) |
| `src/server/env.js` | Zod env validation (CJS) |
| `prisma/seed.ts` | Seed script (tsx, faker + Box-Muller) |
