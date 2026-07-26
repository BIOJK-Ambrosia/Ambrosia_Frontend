# Project Structure

This project uses **layered clean architecture**. Code is organized by
architectural layer first, and by feature module second, so the dependency
direction is enforced by folder structure (and by ESLint — see below) rather
than convention alone.

## Layers

```
src/
├── app/              Composition root: wires infrastructure into application,
│                      injects the result into presentation. Owns providers,
│                      routing, and the app entry point.
├── domain/            Pure business rules. No framework or library imports.
│                      Entities and repository interfaces (ports) live here.
├── application/       Use-cases that orchestrate domain logic. Depends only
│                      on domain.
├── infrastructure/    Technical implementations: API clients, concrete
│                      repositories (implement domain interfaces), state
│                      stores.
├── presentation/      React UI: pages, components, hooks. Depends on
│                      application (via hooks) and shared — never directly
│                      on infrastructure.
└── shared/            Cross-cutting code usable by any layer: config, types,
                       constants, generic utils.
```

## Dependency rule

Dependencies point inward:

`presentation → application → domain`

- **domain**: zero dependencies on other layers (may depend on itself/`shared`).
- **application**: depends only on domain and itself (entities, repository interfaces).
- **infrastructure**: implements domain interfaces; depends on domain,
  application, itself, and external libraries (Axios, etc.).
- **presentation**: depends on application (through hooks), itself, `app`,
  and shared. Never imports infrastructure directly.
- **app**: the only layer allowed to import from every other layer. This is
  where infrastructure repositories are instantiated and injected into
  application use-cases (manual dependency injection — see
  `src/app/composition/`).

This rule is enforced by `eslint-plugin-boundaries` in `eslint.config.js`
(the `boundaries/dependencies` rule) — running `npm run lint` will fail on a
disallowed cross-layer import, whether written as a relative path or via the
`@/` alias.

## Worked example: the `product` module

Each layer's `product` subfolder shows the full vertical slice:

- `domain/product/entities/Product.ts` — the `Product` entity and
  `createProduct` factory (validates input).
- `domain/product/repositories/ProductRepository.ts` — the `getAll()` port.
- `application/product/use-cases/getProductList.ts` — `createGetProductList`,
  a use-case factory that takes a `ProductRepository` and returns a callable
  use-case.
- `infrastructure/repositories/product/ProductApiRepository.ts` —
  implements `ProductRepository` using `infrastructure/api/axiosClient.ts`.
- `app/composition/productComposition.ts` — instantiates
  `ProductApiRepository` and injects it into `createGetProductList`,
  exporting the ready-to-use `getProductList` function.
- `presentation/hooks/product/useProducts.ts` — wraps `getProductList` in a
  TanStack Query `useQuery` hook.
- `presentation/pages/product/ProductListPage.tsx` — renders the list using
  `useProducts`.

No real backend is assumed — the Axios repository points at a placeholder
base URL (`shared/config/env.ts`, backed by `VITE_API_BASE_URL`, see
`.env.example`).

## Adding a new module

Follow the `product` pattern:

1. `domain/<module>/entities/` — define the entity and any validation.
2. `domain/<module>/repositories/` — define the repository interface(s) your
   use-cases need.
3. `application/<module>/use-cases/` — write use-cases against the
   interface, not a concrete implementation.
4. `infrastructure/repositories/<module>/` — implement the interface (API,
   local storage, etc.). If the module needs client-side state, add a Zustand
   store under `infrastructure/state/<module>/`.
5. `app/composition/<module>Composition.ts` — instantiate the
   infrastructure implementation and inject it into the use-case(s).
6. `presentation/hooks/<module>/` and `presentation/pages/<module>/` (and
   `presentation/components/<module>/` for reusable pieces) — build the UI
   against the composition root's exports, never against infrastructure
   directly.

Write a unit test alongside each domain/application/infrastructure file, and
a component test alongside each presentation component.

## Path aliases

`@/*` maps to `src/*` (configured in `vite.config.ts` and
`tsconfig.app.json`). Always import via `@/...` for cross-folder imports —
the boundaries lint rule checks both relative and aliased imports the same
way.

## Tech stack

- **Build tool**: Vite + React + TypeScript (strict mode)
- **Client/UI state**: Zustand
- **Server state**: TanStack Query
- **Styling**: Tailwind CSS v4
- **Routing**: React Router
- **HTTP client**: Axios
- **Testing**: Vitest + React Testing Library
- **Linting/formatting**: ESLint (flat config, with `eslint-plugin-boundaries`) + Prettier

## npm scripts

- `npm run dev` — start the Vite dev server.
- `npm run build` — type-check and produce a production build in `dist/`.
- `npm run test` — run the Vitest suite once (non-watch).
- `npm run lint` — run ESLint, including the layer-boundary rules.
- `npm run preview` — preview the production build locally.
