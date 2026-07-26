# React + Vite + TypeScript Clean Architecture Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold a React + Vite + TypeScript project from the current empty repo, structured with layered clean architecture, with a working `product` example module spanning every layer, and a `project_structure.md` documenting it.

**Architecture:** Layered clean architecture under `src/` — `domain`, `application`, `infrastructure`, `presentation`, `shared`, `app` (composition root). Dependencies flow inward: `presentation → application → domain`; `infrastructure` implements domain interfaces; `app/` wires infrastructure into application and injects the result into presentation.

**Tech Stack:** Vite, React 18/19, TypeScript (strict), Tailwind CSS v4, React Router, Zustand, TanStack Query, Axios, Vitest, React Testing Library, ESLint (flat config) + `eslint-plugin-boundaries`, Prettier, npm.

## Global Constraints

- Package manager: npm only (no yarn/pnpm lockfiles).
- All source code lives under `src/`; path alias `@/*` maps to `src/*`.
- Dependency rule (from spec): `domain` depends on nothing; `application` depends only on `domain`; `infrastructure` depends on `domain` (implements interfaces); `presentation` depends on `application` and `shared` only — never directly on `infrastructure`; `app/` is the only layer allowed to import from every other layer (composition root).
- No real backend — the example module's API base URL is a placeholder from `.env`.
- Every non-trivial function/module gets a Vitest unit or component test.
- Use `npm run build`, `npm run test`, `npm run lint` (non-interactive, terminating commands) for verification steps — never `npm run dev` (it blocks).

---

### Task 1: Scaffold Vite + React + TypeScript project

**Files:**
- Create: entire Vite `react-ts` template at repo root (`package.json`, `vite.config.ts`, `tsconfig*.json`, `src/`, `public/`, `index.html`, `.gitignore`)
- Modify: `src/App.tsx`, `src/main.tsx`, `src/index.css` (strip boilerplate)
- Delete: `src/App.css`, `src/assets/react.svg`

**Interfaces:**
- Produces: a running Vite React TS project buildable with `npm run build`.

- [ ] **Step 1: Scaffold into a temp dir to avoid clobbering existing `docs/` and `.git`**

```bash
npm create vite@latest tmp-scaffold -- --template react-ts
rm -rf tmp-scaffold/.git
cp -r tmp-scaffold/. .
rm -rf tmp-scaffold
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
```

- [ ] **Step 3: Strip template boilerplate**

Delete `src/App.css` and `src/assets/react.svg` (and remove the now-empty `src/assets` dir if nothing else references it).

Replace `src/index.css` with:

```css
:root {
  color-scheme: light dark;
}

body {
  margin: 0;
}
```

Replace `src/App.tsx` with a minimal placeholder (this file is fully replaced again in Task 11, once the composition root moves to `src/app/App.tsx`):

```tsx
function App() {
  return <h1>Ambrosia Frontend</h1>;
}

export default App;
```

- [ ] **Step 4: Verify the scaffold builds**

Run: `npm run build`
Expected: PASS — build succeeds, `dist/` is created, no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React + TypeScript project"
```

---

### Task 2: Configure the `@/*` path alias

**Files:**
- Modify: `vite.config.ts`
- Modify: `tsconfig.app.json`

**Interfaces:**
- Produces: `@/*` resolvable both by TypeScript (editor/tsc) and by Vite's bundler, pointing at `src/*`.

- [ ] **Step 1: Add the resolve alias to `vite.config.ts`**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 2: Add matching paths to `tsconfig.app.json`**

Open the generated `tsconfig.app.json` and add `baseUrl`/`paths` inside `compilerOptions` (keep all existing options from the scaffold, just add these two):

```json
"baseUrl": ".",
"paths": {
  "@/*": ["./src/*"]
}
```

- [ ] **Step 3: Verify TypeScript resolves the alias**

Create a throwaway probe to confirm resolution, then delete it:

```bash
mkdir -p src/shared
printf 'export const ping = "pong";\n' > src/shared/__alias_probe.ts
printf 'import { ping } from "@/shared/__alias_probe";\nconsole.log(ping);\n' > src/__alias_probe_test.ts
npx tsc --noEmit -p tsconfig.app.json
rm src/shared/__alias_probe.ts src/__alias_probe_test.ts
```

Expected: PASS — no "Cannot find module '@/shared/__alias_probe'" error.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: configure @/* path alias for Vite and TypeScript"
```

---

### Task 3: Install and configure Tailwind CSS v4

**Files:**
- Modify: `vite.config.ts`
- Modify: `src/index.css`

**Interfaces:**
- Produces: Tailwind utility classes usable in any component via `className`.

- [ ] **Step 1: Install Tailwind**

```bash
npm install tailwindcss @tailwindcss/vite
```

- [ ] **Step 2: Register the Tailwind Vite plugin**

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

- [ ] **Step 3: Import Tailwind in the global stylesheet**

Prepend to `src/index.css`:

```css
@import "tailwindcss";
```

- [ ] **Step 4: Verify the build picks up Tailwind**

Temporarily add `className="bg-red-500"` to the `<h1>` in `src/App.tsx`, run the build, then revert:

Run: `npm run build`
Expected: PASS — build succeeds (Tailwind's Vite plugin only fails the build on invalid config, not on class usage, but this confirms the plugin is wired in without errors).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Tailwind CSS v4"
```

---

### Task 4: Configure ESLint (with layer boundaries) and Prettier

**Files:**
- Modify: `eslint.config.js`
- Create: `.prettierrc.json`
- Create: `.prettierignore`

**Interfaces:**
- Produces: `npm run lint` enforcing both code style and the clean-architecture dependency rule (`domain` cannot import `application`/`infrastructure`/`presentation`/`app`, etc.).

- [ ] **Step 1: Install ESLint/Prettier additions**

```bash
npm install -D eslint-plugin-boundaries prettier eslint-config-prettier
```

- [ ] **Step 2: Extend the generated `eslint.config.js`**

Open the scaffold's `eslint.config.js` (flat config array) and add the `boundaries` plugin and `prettier` config to the existing exported array — keep the existing `js.configs.recommended`, `tseslint.configs.recommended`, `reactHooks`, and `reactRefresh` entries the scaffold generated, and append this object plus the prettier config import:

```js
import boundaries from 'eslint-plugin-boundaries';
import prettierConfig from 'eslint-config-prettier';

// ...inside the exported array, after the existing config objects:
{
  files: ['src/**/*.{ts,tsx}'],
  plugins: { boundaries },
  settings: {
    'boundaries/elements': [
      { type: 'domain', pattern: 'src/domain/*' },
      { type: 'application', pattern: 'src/application/*' },
      { type: 'infrastructure', pattern: 'src/infrastructure/*' },
      { type: 'presentation', pattern: 'src/presentation/*' },
      { type: 'app', pattern: 'src/app/*' },
      { type: 'shared', pattern: 'src/shared/*' },
    ],
  },
  rules: {
    'boundaries/element-types': [
      'error',
      {
        default: 'disallow',
        rules: [
          { from: 'domain', allow: ['shared'] },
          { from: 'application', allow: ['domain', 'shared'] },
          { from: 'infrastructure', allow: ['domain', 'application', 'shared'] },
          { from: 'presentation', allow: ['application', 'shared', 'app'] },
          { from: 'app', allow: ['domain', 'application', 'infrastructure', 'presentation', 'shared'] },
          { from: 'shared', allow: ['shared'] },
        ],
      },
    ],
  },
},
prettierConfig,
```

- [ ] **Step 3: Add Prettier config**

`.prettierrc.json`:

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

`.prettierignore`:

```
dist
node_modules
```

- [ ] **Step 4: Verify lint passes**

Run: `npm run lint`
Expected: PASS — no errors on the current (still-minimal) `src/`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: configure ESLint layer boundaries and Prettier"
```

---

### Task 5: Install and configure Vitest + React Testing Library

**Files:**
- Modify: `vite.config.ts`
- Create: `src/test/setupTests.ts`
- Create: `src/shared/utils/formatCurrency.ts`
- Test: `src/shared/utils/formatCurrency.test.ts`
- Modify: `package.json` (`test` script)

**Interfaces:**
- Produces: `formatCurrency(amount: number, currency?: string): string`, reused by the `product` presentation layer in Task 10.

- [ ] **Step 1: Install test dependencies**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

- [ ] **Step 2: Add the Vitest config block to `vite.config.ts`**

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setupTests.ts'],
    globals: true,
  },
});
```

- [ ] **Step 3: Add the test setup file**

```ts
// src/test/setupTests.ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 4: Add the `test` script**

In `package.json`, add to `"scripts"`:

```json
"test": "vitest run"
```

- [ ] **Step 5: Write the failing test**

```ts
// src/shared/utils/formatCurrency.test.ts
import { describe, expect, it } from 'vitest';
import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('formats a number as USD currency by default', () => {
    expect(formatCurrency(19.9)).toBe('$19.90');
  });

  it('formats using the provided currency code', () => {
    expect(formatCurrency(19.9, 'EUR')).toBe('€19.90');
  });
});
```

- [ ] **Step 6: Run it to confirm it fails**

Run: `npm run test`
Expected: FAIL — `Cannot find module './formatCurrency'` (file doesn't exist yet).

- [ ] **Step 7: Implement `formatCurrency`**

```ts
// src/shared/utils/formatCurrency.ts
export function formatCurrency(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
}
```

- [ ] **Step 8: Run tests to confirm they pass**

Run: `npm run test`
Expected: PASS — 2 tests passing.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "test: add Vitest + RTL setup with formatCurrency as sanity check"
```

---

### Task 6: Install runtime dependencies and add `shared/config/env`

**Files:**
- Create: `src/shared/config/env.ts`
- Test: `src/shared/config/env.test.ts`
- Create: `.env.example`
- Modify: `.gitignore` (ensure `.env` is ignored — the scaffold's default already ignores it, verify)

**Interfaces:**
- Produces: `env.apiBaseUrl: string`, consumed by `infrastructure/api/axiosClient.ts` in Task 9.

- [ ] **Step 1: Install runtime dependencies**

```bash
npm install react-router-dom zustand @tanstack/react-query axios
```

- [ ] **Step 2: Write the failing test**

```ts
// src/shared/config/env.test.ts
import { describe, expect, it } from 'vitest';
import { env } from './env';

describe('env', () => {
  it('exposes a non-empty apiBaseUrl', () => {
    expect(env.apiBaseUrl.length).toBeGreaterThan(0);
  });
});
```

- [ ] **Step 3: Run it to confirm it fails**

Run: `npm run test`
Expected: FAIL — `Cannot find module './env'`.

- [ ] **Step 4: Implement `env`**

```ts
// src/shared/config/env.ts
export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? 'https://api.example.com',
};
```

- [ ] **Step 5: Add `.env.example`**

```
VITE_API_BASE_URL=https://api.example.com
```

- [ ] **Step 6: Run tests to confirm they pass**

Run: `npm run test`
Expected: PASS — 3 tests passing total (2 from Task 5, 1 new).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: install core runtime deps and add shared env config"
```

---

### Task 7: Domain layer for the `product` module

**Files:**
- Create: `src/domain/product/entities/Product.ts`
- Test: `src/domain/product/entities/Product.test.ts`
- Create: `src/domain/product/repositories/ProductRepository.ts`

**Interfaces:**
- Produces: `Product` type `{ id: string; name: string; price: number }`, `createProduct(input: Product): Product` (throws on invalid input), `ProductRepository` interface with `getAll(): Promise<Product[]>`.

- [ ] **Step 1: Write the failing test**

```ts
// src/domain/product/entities/Product.test.ts
import { describe, expect, it } from 'vitest';
import { createProduct } from './Product';

describe('createProduct', () => {
  it('returns the product when valid', () => {
    const product = createProduct({ id: '1', name: 'Coffee', price: 4.5 });
    expect(product).toEqual({ id: '1', name: 'Coffee', price: 4.5 });
  });

  it('throws when price is negative', () => {
    expect(() => createProduct({ id: '1', name: 'Coffee', price: -1 })).toThrow(
      'Product price cannot be negative: received -1',
    );
  });

  it('throws when name is empty', () => {
    expect(() => createProduct({ id: '1', name: '  ', price: 4.5 })).toThrow(
      'Product name cannot be empty',
    );
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm run test`
Expected: FAIL — `Cannot find module './Product'`.

- [ ] **Step 3: Implement the `Product` entity**

```ts
// src/domain/product/entities/Product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
}

export function createProduct(input: Product): Product {
  if (input.price < 0) {
    throw new Error(`Product price cannot be negative: received ${input.price}`);
  }
  if (input.name.trim().length === 0) {
    throw new Error('Product name cannot be empty');
  }
  return input;
}
```

- [ ] **Step 4: Run tests to confirm they pass**

Run: `npm run test`
Expected: PASS.

- [ ] **Step 5: Add the repository interface (port)**

```ts
// src/domain/product/repositories/ProductRepository.ts
import type { Product } from '../entities/Product';

export interface ProductRepository {
  getAll(): Promise<Product[]>;
}
```

- [ ] **Step 6: Verify lint passes (domain must not import outside `shared`)**

Run: `npm run lint`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add product domain entity and repository interface"
```

---

### Task 8: Application layer for the `product` module

**Files:**
- Create: `src/application/product/use-cases/getProductList.ts`
- Test: `src/application/product/use-cases/getProductList.test.ts`

**Interfaces:**
- Consumes: `ProductRepository` from Task 7 (`src/domain/product/repositories/ProductRepository.ts`), `Product` from Task 7.
- Produces: `createGetProductList(repository: ProductRepository): () => Promise<Product[]>`, consumed by `app/composition/productComposition.ts` in Task 10.

- [ ] **Step 1: Write the failing test**

```ts
// src/application/product/use-cases/getProductList.test.ts
import { describe, expect, it, vi } from 'vitest';
import type { ProductRepository } from '@/domain/product/repositories/ProductRepository';
import { createGetProductList } from './getProductList';

describe('getProductList', () => {
  it('delegates to the repository and returns its result', async () => {
    const products = [{ id: '1', name: 'Coffee', price: 4.5 }];
    const repository: ProductRepository = { getAll: vi.fn().mockResolvedValue(products) };

    const getProductList = createGetProductList(repository);
    const result = await getProductList();

    expect(repository.getAll).toHaveBeenCalledOnce();
    expect(result).toEqual(products);
  });
});
```

- [ ] **Step 2: Run it to confirm it fails**

Run: `npm run test`
Expected: FAIL — `Cannot find module './getProductList'`.

- [ ] **Step 3: Implement the use-case**

```ts
// src/application/product/use-cases/getProductList.ts
import type { Product } from '@/domain/product/entities/Product';
import type { ProductRepository } from '@/domain/product/repositories/ProductRepository';

export function createGetProductList(repository: ProductRepository) {
  return async function getProductList(): Promise<Product[]> {
    return repository.getAll();
  };
}
```

- [ ] **Step 4: Run tests to confirm they pass**

Run: `npm run test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add getProductList use-case"
```

---

### Task 9: Infrastructure layer for the `product` module

**Files:**
- Create: `src/infrastructure/api/axiosClient.ts`
- Create: `src/infrastructure/repositories/product/ProductApiRepository.ts`
- Test: `src/infrastructure/repositories/product/ProductApiRepository.test.ts`

**Interfaces:**
- Consumes: `env` from `src/shared/config/env.ts` (Task 6), `ProductRepository`/`Product` from `src/domain/product/*` (Task 7).
- Produces: `axiosClient` (configured Axios instance), `ProductApiRepository implements ProductRepository`, consumed by `app/composition/productComposition.ts` in Task 10.

- [ ] **Step 1: Implement the Axios client**

```ts
// src/infrastructure/api/axiosClient.ts
import axios from 'axios';
import { env } from '@/shared/config/env';

export const axiosClient = axios.create({
  baseURL: env.apiBaseUrl,
});
```

- [ ] **Step 2: Write the failing test for the repository**

```ts
// src/infrastructure/repositories/product/ProductApiRepository.test.ts
import { describe, expect, it, vi } from 'vitest';
import { axiosClient } from '@/infrastructure/api/axiosClient';
import { ProductApiRepository } from './ProductApiRepository';

vi.mock('@/infrastructure/api/axiosClient', () => ({
  axiosClient: { get: vi.fn() },
}));

describe('ProductApiRepository', () => {
  it('fetches products from the /products endpoint', async () => {
    const products = [{ id: '1', name: 'Coffee', price: 4.5 }];
    vi.mocked(axiosClient.get).mockResolvedValue({ data: products });

    const repository = new ProductApiRepository();
    const result = await repository.getAll();

    expect(axiosClient.get).toHaveBeenCalledWith('/products');
    expect(result).toEqual(products);
  });
});
```

- [ ] **Step 3: Run it to confirm it fails**

Run: `npm run test`
Expected: FAIL — `Cannot find module './ProductApiRepository'`.

- [ ] **Step 4: Implement `ProductApiRepository`**

```ts
// src/infrastructure/repositories/product/ProductApiRepository.ts
import type { Product } from '@/domain/product/entities/Product';
import type { ProductRepository } from '@/domain/product/repositories/ProductRepository';
import { axiosClient } from '@/infrastructure/api/axiosClient';

export class ProductApiRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    const response = await axiosClient.get<Product[]>('/products');
    return response.data;
  }
}
```

- [ ] **Step 5: Run tests to confirm they pass**

Run: `npm run test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add ProductApiRepository infrastructure implementation"
```

---

### Task 10: Composition root wiring + presentation layer for `product`

**Files:**
- Create: `src/app/composition/productComposition.ts`
- Create: `src/presentation/hooks/product/useProducts.ts`
- Create: `src/presentation/pages/product/ProductListPage.tsx`
- Test: `src/presentation/pages/product/ProductListPage.test.tsx`

**Interfaces:**
- Consumes: `createGetProductList` (Task 8), `ProductApiRepository` (Task 9), `formatCurrency` (Task 5).
- Produces: `getProductList` (wired use-case) from `productComposition.ts`; `useProducts()` hook returning a TanStack Query result of `Product[]`; `<ProductListPage />` component — consumed by `app/router/routes.tsx` in Task 11.

- [ ] **Step 1: Implement the composition root wiring**

```ts
// src/app/composition/productComposition.ts
import { createGetProductList } from '@/application/product/use-cases/getProductList';
import { ProductApiRepository } from '@/infrastructure/repositories/product/ProductApiRepository';

const productRepository = new ProductApiRepository();

export const getProductList = createGetProductList(productRepository);
```

- [ ] **Step 2: Implement the `useProducts` hook**

```ts
// src/presentation/hooks/product/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { getProductList } from '@/app/composition/productComposition';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProductList,
  });
}
```

- [ ] **Step 3: Write the failing test for `ProductListPage`**

```tsx
// src/presentation/pages/product/ProductListPage.test.tsx
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductListPage } from './ProductListPage';
import { useProducts } from '@/presentation/hooks/product/useProducts';

vi.mock('@/presentation/hooks/product/useProducts');

describe('ProductListPage', () => {
  it('shows a loading state while fetching', () => {
    vi.mocked(useProducts).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as ReturnType<typeof useProducts>);

    render(<ProductListPage />);

    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('renders the product list once loaded', () => {
    vi.mocked(useProducts).mockReturnValue({
      data: [{ id: '1', name: 'Coffee', price: 4.5 }],
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useProducts>);

    render(<ProductListPage />);

    expect(screen.getByText('Coffee — $4.50')).toBeInTheDocument();
  });
});
```

- [ ] **Step 4: Run it to confirm it fails**

Run: `npm run test`
Expected: FAIL — `Cannot find module './ProductListPage'`.

- [ ] **Step 5: Implement `ProductListPage`**

```tsx
// src/presentation/pages/product/ProductListPage.tsx
import { formatCurrency } from '@/shared/utils/formatCurrency';
import { useProducts } from '@/presentation/hooks/product/useProducts';

export function ProductListPage() {
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <ul className="space-y-2 p-4">
      {products?.map((product) => (
        <li key={product.id} className="rounded border p-2">
          {product.name} — {formatCurrency(product.price)}
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 6: Run tests to confirm they pass**

Run: `npm run test`
Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: wire product composition root and presentation layer"
```

---

### Task 11: App shell — providers, router, entry point

**Files:**
- Create: `src/app/providers/AppProviders.tsx`
- Create: `src/app/router/routes.tsx`
- Create: `src/app/App.tsx`
- Modify: `src/main.tsx`
- Delete: `src/App.tsx` (superseded by `src/app/App.tsx`)

**Interfaces:**
- Consumes: `ProductListPage` from Task 10.
- Produces: `<App />` mounted by `main.tsx`, rendering `ProductListPage` at `/`.

- [ ] **Step 1: Implement `AppProviders`**

```tsx
// src/app/providers/AppProviders.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

- [ ] **Step 2: Implement the router**

```tsx
// src/app/router/routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import { ProductListPage } from '@/presentation/pages/product/ProductListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductListPage />,
  },
]);
```

- [ ] **Step 3: Implement `App` and delete the old placeholder**

```tsx
// src/app/App.tsx
import { RouterProvider } from 'react-router-dom';
import { AppProviders } from '@/app/providers/AppProviders';
import { router } from '@/app/router/routes';

export function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
```

Delete `src/App.tsx` (the Task 1 placeholder).

- [ ] **Step 4: Update the entry point**

```tsx
// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/app/App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

- [ ] **Step 5: Verify everything builds, lints, and tests pass together**

Run: `npm run build && npm run lint && npm run test`
Expected: PASS — build succeeds, no lint errors, all tests (from Tasks 5–10) pass.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: wire app shell (providers, router, entry point)"
```

---

### Task 12: Write `project_structure.md`

**Files:**
- Create: `project_structure.md` (repo root)

**Interfaces:**
- None (documentation only).

- [ ] **Step 1: Write the document**

```markdown
# Project Structure

This project uses **layered clean architecture**. Code is organized by
architectural layer first, and by feature module second, so the dependency
direction is enforced by folder structure (and by ESLint — see below) rather
than convention alone.

## Layers

\`\`\`
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
\`\`\`

## Dependency rule

Dependencies point inward:

\`presentation → application → domain\`

- **domain**: zero dependencies on other layers.
- **application**: depends only on domain (entities, repository interfaces).
- **infrastructure**: implements domain interfaces; depends on domain and
  external libraries (Axios, etc.).
- **presentation**: depends on application (through hooks) and shared. Never
  imports infrastructure directly.
- **app**: the only layer allowed to import from every other layer. This is
  where infrastructure repositories are instantiated and injected into
  application use-cases (manual dependency injection — see
  \`src/app/composition/\`).

This rule is enforced by \`eslint-plugin-boundaries\` in \`eslint.config.js\`
— running \`npm run lint\` will fail on a disallowed cross-layer import.

## Worked example: the \`product\` module

Each layer's \`product\` subfolder shows the full vertical slice:

- \`domain/product/entities/Product.ts\` — the \`Product\` entity and
  \`createProduct\` factory (validates input).
- \`domain/product/repositories/ProductRepository.ts\` — the \`getAll()\` port.
- \`application/product/use-cases/getProductList.ts\` — \`createGetProductList\`,
  a use-case factory that takes a \`ProductRepository\` and returns a callable
  use-case.
- \`infrastructure/repositories/product/ProductApiRepository.ts\` —
  implements \`ProductRepository\` using \`infrastructure/api/axiosClient.ts\`.
- \`app/composition/productComposition.ts\` — instantiates
  \`ProductApiRepository\` and injects it into \`createGetProductList\`,
  exporting the ready-to-use \`getProductList\` function.
- \`presentation/hooks/product/useProducts.ts\` — wraps \`getProductList\` in a
  TanStack Query \`useQuery\` hook.
- \`presentation/pages/product/ProductListPage.tsx\` — renders the list using
  \`useProducts\`.

## Adding a new module

Follow the \`product\` pattern:

1. \`domain/<module>/entities/\` — define the entity and any validation.
2. \`domain/<module>/repositories/\` — define the repository interface(s) your
   use-cases need.
3. \`application/<module>/use-cases/\` — write use-cases against the
   interface, not a concrete implementation.
4. \`infrastructure/repositories/<module>/\` — implement the interface (API,
   local storage, etc.). If the module needs client-side state, add a Zustand
   store under \`infrastructure/state/<module>/\`.
5. \`app/composition/<module>Composition.ts\` — instantiate the
   infrastructure implementation and inject it into the use-case(s).
6. \`presentation/hooks/<module>/\` and \`presentation/pages/<module>/\` (and
   \`presentation/components/<module>/\` for reusable pieces) — build the UI
   against the composition root's exports, never against infrastructure
   directly.

Write a unit test alongside each domain/application/infrastructure file, and
a component test alongside each presentation component.

## Path aliases

\`@/*\` maps to \`src/*\` (configured in \`vite.config.ts\` and
\`tsconfig.app.json\`). Always import via \`@/...\`, not relative paths that
cross a layer boundary.

## npm scripts

- \`npm run dev\` — start the Vite dev server.
- \`npm run build\` — type-check and produce a production build in \`dist/\`.
- \`npm run test\` — run the Vitest suite once (non-watch).
- \`npm run lint\` — run ESLint, including the layer-boundary rules.
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "docs: add project_structure.md"
```

---

### Task 13: Final verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run the full check suite**

Run: `npm run lint && npm run test && npm run build`
Expected: PASS — no lint errors, all tests green, production build succeeds.

- [ ] **Step 2: Confirm the working tree is clean**

Run: `git status`
Expected: `nothing to commit, working tree clean` (everything from prior tasks already committed).
