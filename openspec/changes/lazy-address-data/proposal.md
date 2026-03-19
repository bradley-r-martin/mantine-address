## Why

Today the library exports a canonical `COUNTRIES` object that eagerly imports per-country region data (e.g. `AUSTRALIA`, `UNITED_STATES`). As we add more countries (and later postcodes/suburbs), this risks becoming a large bundled dependency for consumers even when they only need a single country/region.

We want to keep “batteries included” ergonomics while making the heavy datasets load **only when needed** and allowing consumers to bring their own datasets/configuration.

## What Changes

- Introduce an `AddressInput` `data` prop that provides:
  - a small, synchronous `countries` catalog for the Country select
  - optional lazy resolvers for datasets such as `regions` (states), and later `postcodes` and `suburbs`
- Provide a built-in default `data` implementation that uses dynamic `import()` to lazy-load per-country datasets into separate chunks.
- Update manual-entry behavior to use `data.countries` and `data.regions` instead of importing a global `COUNTRIES` map.
- Deprecate or reshape the eager `COUNTRIES` export (and any synchronous “all countries with regions” aggregate) to avoid forcing consumers to bundle every configured dataset.

### Non-goals

- Do not change the address lookup provider APIs (e.g. Google Places) as part of this work.
- Do not implement full worldwide regions/postcodes/suburbs coverage; this change is about the **mechanism** (data model + lazy loading), not expanding the dataset scope.
- Do not require consumers to adopt code-splitting; the library will support it, but apps may still bundle everything depending on their build setup.

## Capabilities

### New Capabilities

- `address-data`: Provide a `data` prop that supplies a countries catalog and optional lazy dataset resolvers (regions/states now; postcodes/suburbs later), supporting both built-in and bring-your-own data.

### Modified Capabilities

- `country-state-regions`: Adjust how countries/regions are represented and exported so that region/state lists can be loaded lazily without bundling all configured countries by default.
- `manual-address-entry`: Source country/state options from `data` (including async resolution for state lists) while preserving current UX (select when supported, text input fallback otherwise).

## Impact

- **Public API**: `AddressInputProps` gains a `data` prop; some exports related to `COUNTRIES` / region constants may be deprecated or restructured.
- **Implementation**: `utilities` and manual-entry logic will no longer import a global `COUNTRIES` aggregate; region/state resolution becomes asynchronous where dropdown data is needed.
- **Bundling**: Default datasets will be split by country (and later by dataset type), enabling consumers to avoid shipping unused country/state data and to load heavy data on demand.
- **Docs/Storybook**: Stories should cover default behavior, bring-your-own data, and lazy region loading states.
