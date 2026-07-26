# Design: React + Vite + TypeScript Clean Architecture Scaffold

**Date**: 2026-07-26
**Status**: Approved

## Goal

Set up a new React + Vite + TypeScript project from an empty repository, structured
using layered clean architecture, with a working example module (`product`) that
demonstrates the pattern end-to-end. Document the structure in `project_structure.md`
so future contributors know where new code belongs.

## Tech Stack

| Concern | Choice |
|---|---|
| Build tool / framework | Vite + React 18 + TypeScript (strict mode) |
| Client/UI state | Zustand |
| Server state | TanStack Query |
| Styling | Tailwind CSS |
| Routing | React Router (v6/v7) |
| HTTP client | Axios |
| Testing | Vitest + React Testing Library |
| Package manager | npm |
| Linting/formatting | ESLint + Prettier |

## Architecture: Layered Clean Architecture

Top-level layers under `src/`, each layer containing per-module subfolders:

```
src/
├── app/                        # Composition root: wiring all layers together
│   ├── providers/              # QueryClientProvider, StoreProvider, etc.
│   ├── router/                 # AppRouter, route definitions
│   └── App.tsx
├── domain/                     # Pure business rules — no framework/library deps
│   └── <module>/
│       ├── entities/           # Plain business models, e.g. Product.ts
│       ├── repositories/       # Interfaces/ports, e.g. ProductRepository.ts
│       └── errors/             # Domain-specific error types
├── application/                # Use-cases orchestrating domain logic
│   └── <module>/
│       ├── use-cases/          # e.g. getProductList.ts, getProductById.ts
│       └── dto/                # Data transfer objects between layers
├── infrastructure/             # Technical implementations
│   ├── api/                    # axiosClient.ts, endpoints.ts
│   ├── repositories/<module>/  # Concrete repository implementing domain interface
│   └── state/<module>/         # Zustand stores, where needed
├── presentation/                # React-specific UI layer
│   ├── pages/<module>/
│   ├── components/
│   │   ├── common/              # Reusable, business-logic-free UI components
│   │   └── <module>/
│   └── hooks/<module>/          # TanStack Query hooks calling use-cases
├── shared/                      # Cross-cutting: config, types, constants, generic utils
├── test/                        # setupTests.ts for Vitest + RTL
├── main.tsx
└── index.css
```

## Dependency Rule

Dependencies flow inward: `presentation → application → domain`.

- `domain` has zero dependencies on other layers or external libraries — pure TypeScript.
- `application` depends only on `domain` (entities and repository interfaces).
- `infrastructure` implements the interfaces defined in `domain` (e.g. `ProductApiRepository`
  implements `ProductRepository` using Axios) and depends on external libraries.
- `presentation` depends on `application` (use-cases, via hooks) — never directly on
  `infrastructure`.
- `app/` is the composition root: it instantiates infrastructure repositories and
  injects them into use-cases (manual dependency injection via factory functions —
  no DI framework, kept simple per YAGNI).

Path aliases (`@/domain`, `@/application`, `@/infrastructure`, `@/presentation`,
`@/shared`, `@/app`) are configured in `vite.config.ts` and `tsconfig.json` for clean
imports.

## Example Module: `product`

A single vertical slice touching every layer, to serve as the reference pattern for
future modules:

- `domain/product`: `Product` entity, `ProductRepository` interface
- `application/product`: `getProductList` use-case (depends on `ProductRepository` interface)
- `infrastructure/product`: `ProductApiRepository` (implements `ProductRepository` via Axios)
- `presentation/product`: `ProductListPage`, `useProducts` hook (TanStack Query, wired to
  the use-case via the composition root)

No real backend is assumed — the Axios repository points at a placeholder base URL via
`shared/config/env.ts`, wired through `.env` / `.env.example`.

## Tooling & Config

- ESLint configured with import boundary rules (e.g. `eslint-plugin-boundaries` or
  manual `no-restricted-imports` rules) to enforce the dependency rule above where practical.
- Prettier for formatting, integrated with ESLint.
- Vitest configured via `vite.config.ts` (`test` block), with `src/test/setupTests.ts`
  for RTL's `jest-dom` matchers.
- `.env.example` documenting required environment variables (e.g. `VITE_API_BASE_URL`).

## `project_structure.md`

Written at the project root, covering:

1. Overview of clean architecture layers and the dependency rule
2. Responsibility of each layer, with the `product` module as a worked example
3. Step-by-step guide for adding a new module (mirroring the `product` pattern)
4. Path aliases reference
5. Available npm scripts (dev, build, test, lint, format)

## Out of Scope

- No real backend/API integration — `product` module uses a placeholder endpoint.
- No authentication, no global error boundary strategy beyond a basic example.
- No CI/CD pipeline setup.
- No Storybook or component documentation tooling.
