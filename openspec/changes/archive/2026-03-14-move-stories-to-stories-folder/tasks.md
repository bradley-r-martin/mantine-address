## 1. Add stories directory and config

- [x] 1.1 Create root `stories/` directory and mirror structure: `stories/formatters/` (and any other subfolders needed for existing story files)
- [x] 1.2 Update `.storybook/main.ts`: set `stories` to `['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)']`, and add `viteFinal` to set `resolve.alias` so `@` points to `path.resolve(__dirname, '../src')`
- [x] 1.3 Update `tsconfig.json`: add `stories` to `include` so story files in `stories/` are type-checked and `@/*` continues to resolve to `src/*`
- [x] 1.4 Confirm ESLint lints `stories/` (current config uses `files: ['**/*.{js,jsx,ts,tsx}']`; add `stories/` to override or ensure it is not ignored if needed)

## 2. Move story files and fix imports

- [x] 2.1 Move `src/AddressInput.stories.tsx` to `stories/AddressInput.stories.tsx` and update imports to use `@/` for components, types, formatters, and providers (e.g. `@/AddressInput`, `@/types`, `@/formatters`, `@/providers/GooglePlacesProvider`)
- [x] 2.2 Move `src/formatAddress.stories.tsx` to `stories/formatters/formatAddress.stories.tsx` and update imports to use `@/` (e.g. `@/formatters`, `@/types`)

## 3. Remove old stories and verify

- [x] 3.1 Remove all original story files from `src/` (ensure none remain under `src/**/*.stories.{ts,tsx}`)
- [x] 3.2 Run `npm run storybook` and confirm all stories load and render
- [x] 3.3 Run type-check (e.g. `tsc --noEmit` or project script) and fix any resolution errors
- [x] 3.4 Run `npm run lint` and fix any issues in `stories/`
