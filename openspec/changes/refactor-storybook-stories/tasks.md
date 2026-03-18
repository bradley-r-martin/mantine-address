## 1. Baseline + taxonomy

- [x] 1.1 Inventory existing story files under `stories/**` and map each story to a target group in the new taxonomy
- [x] 1.2 Update Storybook titles to match the taxonomy (`AddressInput/Overview`, `AddressInput/Usage`, `AddressInput/Manual entry`, `AddressInput/Restrictions`, `Providers/Google Places`, `Formatting/*`)
- [x] 1.3 Ensure each story file has a short meta-level docs description and avoids duplicated per-story prose unless it adds non-obvious guidance

## 2. AddressInput core docs (provider-agnostic)

- [x] 2.1 Create/adjust `AddressInput/Overview` stories for the two primary modes: mock autocomplete and manual-only (no provider)
- [x] 2.2 Create/adjust `AddressInput/Usage` stories: controlled, uncontrolled, error, and (if retained) native form hidden inputs
- [x] 2.3 Create/adjust `AddressInput/Manual entry` stories: defaultAddress prefill, no-results → “Enter manually”, preventManualEntry
- [x] 2.4 Create/adjust `AddressInput/Restrictions` stories using mock/manual-only patterns (country only, region only, state+postcode)
- [x] 2.5 Remove or clearly label any “playground/mini-app” stories that are not part of the canonical documentation path

## 3. Providers (Google Places)

- [x] 3.1 Rename `GooglePlacesProvider.stories.tsx` to live under `Providers/Google Places` (title + story names)
- [x] 3.2 Ensure Google Maps script loading exists in only one place (provider stories) and delete duplicated loader logic elsewhere
- [x] 3.3 Keep a minimal canonical set: setup/default, restrictions (country), restrictions (region), controlled

## 4. Formatting docs

- [x] 4.1 Confirm formatter stories live under `Formatting/International` and `Formatting/Australian` with consistent structure
- [x] 4.2 Remove `AddressInput` stories that primarily demonstrate formatting/theming and keep formatting guidance in the formatting section (or create a dedicated theming story group if truly needed)

## 5. Cleanup + verification

- [x] 5.1 Delete redundant stories and consolidate duplicates (debounce variants, duplicate “no results” examples, etc.) while preserving the canonical docs set
- [x] 5.2 Run Storybook locally and confirm sidebar structure, story readability, and that examples work without external setup except under Providers
- [x] 5.3 Run Storybook build and TypeScript type-check to ensure story files compile cleanly
