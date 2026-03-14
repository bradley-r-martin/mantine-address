## 1. Add tests directory and config

- [x] 1.1 Create root `tests/` directory and mirror structure: `tests/providers/`, `tests/formatters/` (and any other subfolders needed for existing test files)
- [x] 1.2 Update Vitest config: set `include` to `tests/**/*.test.{ts,tsx}`, keep or add `resolve.alias` so `@` points to `src/`, and set `setupFiles` to a path that still works (e.g. `./src/test-setup.ts` or move setup to `tests/test-setup.ts`)
- [x] 1.3 Update TypeScript so test files in `tests/` are included and imports to `src/` resolve (e.g. add `tests` to `include` and ensure path alias `@` → `src` is available for type-checking; use Vitest’s tsconfig merge or a dedicated config if needed)
- [x] 1.4 If ESLint is scoped to `src/`, extend it to include `tests/` so test files are linted

## 2. Move test files and fix imports

- [x] 2.1 Move `src/AddressInput.test.tsx` to `tests/AddressInput.test.tsx` and update imports to use `@/` (or correct relative path) to `src/`
- [x] 2.2 Move `src/types.test.ts` to `tests/types.test.ts` and update imports
- [x] 2.3 Move `src/index.test.ts` to `tests/index.test.ts` and update imports
- [x] 2.4 Move `src/mantine-factory-default-props.test.tsx` to `tests/mantine-factory-default-props.test.tsx` and update imports
- [x] 2.5 Move `src/providers/GooglePlacesProvider.test.ts` to `tests/providers/GooglePlacesProvider.test.ts` and update imports
- [x] 2.6 Move `src/formatters/formatters.test.ts` to `tests/formatters/formatters.test.ts` and update imports

## 3. Remove old tests and verify

- [x] 3.1 Remove all original test files from `src/` (ensure none remain under `src/**/*.test.{ts,tsx}`)
- [x] 3.2 Run `npm test` and confirm all tests pass
- [x] 3.3 Run type-check (e.g. `tsc --noEmit` or project script) and fix any remaining resolution errors
- [x] 3.4 Run `npm run lint` and fix any issues in `tests/`
