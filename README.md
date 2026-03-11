# Experiment

Monorepo: Next.js frontend (web), NestJS API, and shared TypeScript/Zod schemas. Includes auth (JWT), feature flags with user/group/region overrides, and a permissions UI.

---

## Prerequisites

- **Node.js** 18+ (project uses `npm` workspaces)
- **PostgreSQL** (e.g. local or Supabase)
- **npm** 10.x (see `packageManager` in root `package.json`)

---

## Install

From the **repository root**:

```bash
npm install
```

This installs dependencies for the root and all workspaces (`apps/api`, `apps/web`, `packages/shared`).

---

## Environment setup

Copy the example env files and fill in values. **Do not commit `.env`** (they are gitignored).

### API (`apps/api`)

```bash
cp apps/api/.env.example apps/api/.env
```

Edit `apps/api/.env` and set at least:

| Variable        | Description |
|----------------|-------------|
| `DATABASE_URL` | PostgreSQL connection URI (e.g. Supabase pooler URL). |
| `DIRECT_URL`   | Direct Postgres URL (e.g. for migrations). |
| `JWT_SECRET`   | Secret used to sign JWTs (required in production). |
| `PORT`         | Optional; default `3001`. |
| `CORS_ORIGIN`  | Optional; e.g. `http://localhost:3000` or leave unset to allow any (dev). |

### Web (`apps/web`)

```bash
cp apps/web/.env.example apps/web/.env
```

Edit `apps/web/.env`:

| Variable               | Description |
|------------------------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend base URL including `/api`, e.g. `http://localhost:3001/api`. |

---

## Run

### All apps (recommended for local dev)

From the **repository root**:

```bash
npm run dev
```

This runs **Turbo** and starts both `api` and `web` in dev mode (watch). API: http://localhost:3001, Web: http://localhost:3000 (or Next.js default).

### Individual apps

From the **repository root**:

```bash
# API only (NestJS, default port 3001)
npm run dev --workspace=api

# Web only (Next.js)
npm run dev --workspace=web
```

Or from each app directory:

```bash
cd apps/api && npm run dev
cd apps/web && npm run dev
```

### Build

From the **repository root**:

```bash
npm run build
```

Builds `packages/shared`, then `api` and `web`. API output: `apps/api/dist`. Web output: `apps/web/.next`.

### Lint

```bash
npm run lint
```

Runs lint in all workspaces.

---

## Directory structure

```
experiment/
├── apps/
│   ├── api/                    # NestJS backend
│   │   ├── src/
│   │   │   ├── auth/           # JWT, login/register, guards, public decorator
│   │   │   ├── common/         # Filters, DTOs (e.g. API error shape)
│   │   │   ├── entities/       # TypeORM entities (User, Group, Region, Feature, Override)
│   │   │   ├── feature-flags/  # Feature flags, overrides list, guards
│   │   │   ├── groups/         # Groups (roles) CRUD + override list
│   │   │   ├── regions/        # Regions CRUD + override list
│   │   │   ├── users/          # Users CRUD + override list
│   │   │   ├── app.module.ts
│   │   │   └── main.ts         # Bootstrap, CORS, global prefix, Swagger
│   │   ├── .env.example
│   │   └── package.json
│   │
│   └── web/                    # Next.js frontend
│       ├── src/
│       │   ├── app/            # App Router pages (login, register, dashboard, permissions)
│       │   ├── components/    # UI and auth (RequireAuth, SideModal, FormError, etc.)
│       │   ├── data/           # API client (axios), endpoints, services
│       │   ├── features/       # Feature-specific UI (auth, dashboard, permissions)
│       │   ├── models/         # Form models
│       │   ├── stores/         # Zustand stores (auth, regions, users, feature overrides)
│       │   ├── styles/         # CSS (layouts, components)
│       │   └── utils/          # Helpers, forms, error handling
│       ├── .env.example
│       └── package.json
│
├── packages/
│   └── shared/                 # Shared code (used by api + web)
│       ├── src/
│       │   ├── auth.dto.ts
│       │   ├── feature.dto.ts  # Feature override schemas (Zod)
│       │   ├── region.dto.ts
│       │   ├── user.dto.ts
│       │   ├── group.dto.ts
│       │   └── index.ts
│       └── package.json         # Builds to dist/ (JS + .d.ts)
│
├── package.json                # Root workspace scripts (dev, build, lint)
├── turbo.json                  # Turbo task config (dev, build, lint)
└── README.md                   # This file
```

### Summary

- **`apps/api`** – REST API with global JWT guard; feature flags with user/group/region overrides; Swagger at `/api/docs`.
- **`apps/web`** – Next.js app; login/register, dashboard, permissions (users, roles, regions, feature overrides).
- **`packages/shared`** – Zod schemas and TypeScript types for API contracts and validation; must be built (`npm run build` in `packages/shared` or via root `npm run build`) before the API uses it.

---

## Improvement roadmap

Planned or candidate improvements.

| Area | Item |
|------|------|
| **Testing** | Unit tests for API services (auth, feature flags, overrides). E2E tests for critical flows (login, permissions). |
| **Security** | Rate limiting on auth endpoints; optional refresh tokens; enforce strong `JWT_SECRET` in production. |
| **API** | Region in feature-flag resolution (user → group → region → default); pagination consistency; OpenAPI export. |
| **Web** | Error boundaries; loading/skeleton states; optional PWA or offline hints. |
| **DX** | Pre-commit hooks (lint/format); CI (lint, build, test); Docker Compose for local Postgres. |
| **Docs** | Changelog; contribution guide; architecture diagram. |
