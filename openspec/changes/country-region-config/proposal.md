# Proposal: Country–region config and unified Country type

## Why

Country and region data is currently split across separate exports (`COUNTRIES.AU`, `REGIONS`, `REGIONS_US`), which doesn’t match how we want consumers to use it or how we want to extend it (e.g. postcodes, suburbs). We want a single, config-style shape: one import per country (e.g. `AUSTRALIA`) with regions as properties (`AUSTRALIA.NEW_SOUTH_WALES`), so usage is `prefill={{ country: AUSTRALIA, region: AUSTRALIA.NEW_SOUTH_WALES }}` and the type system supports this without extra types or unions.

## What Changes

- **Country type**: Extend `Country` with an index signature so a country object may carry region entries as named properties (`[key: string]: string | Region`). No new type (e.g. no `CountryWithRegions`); one type only.
- **Config files**: Refactor `states-au.ts` and `states-us.ts` so each exports a single object: `AUSTRALIA` and `UNITED_STATES` respectively, with `code`, `name`, and region keys (e.g. `NEW_SOUTH_WALES`, `CALIFORNIA`) on that object.
- **Public API**: Export `AUSTRALIA` and `UNITED_STATES` from the regions/country surface. Remove separate `REGIONS` and `REGIONS_US` exports. Keep `COUNTRIES` and `countries`; `COUNTRIES.AU` and `COUNTRIES.US` remain the same object references as `AUSTRALIA` and `UNITED_STATES`.
- **getStatesForCountry**: Derive state options from the country object when it has region keys (exclude `code` and `name`); no separate registry or second type.
- **BREAKING**: Consumers using `REGIONS` or `REGIONS_US` must switch to `AUSTRALIA.*` and `UNITED_STATES.*` (e.g. `REGIONS.NEW_SOUTH_WALES` → `AUSTRALIA.NEW_SOUTH_WALES`).

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- **country-state-regions**: Export shape and type contract change. Requirements for “canonical list of countries” and “states per country” stay; the way regions are exposed (on the country object) and the `Country` type (index signature for region keys) are specified in the spec.

## Impact

- **Public API**: Regions package exports change (removal of `REGIONS`, `REGIONS_US`; addition of `AUSTRALIA`, `UNITED_STATES`). `Country` type gains index signature. `COUNTRIES`, `countries`, and `getStatesForCountry(code)` remain; implementation of `getStatesForCountry` derives regions from the country object.
- **Affected code**: `src/regions/types.ts`, `src/regions/states-au.ts`, `src/regions/states-us.ts`, `src/regions/countries.ts`, `src/regions/index.ts`, `src/index.ts`; any internal or story code that references `REGIONS` / `REGIONS_US`; docs and JSDoc examples.
- **Compatibility**: Breaking for consumers who import `REGIONS` or `REGIONS_US`. Mantine version compatibility unchanged. No new dependencies.

## Non-goals

- Adding postcodes or suburbs data (only the type/config shape is prepared for future extension).
- Changing behavior of prefill, accept, or manual form; only the way country/region constants are provided.
- Scope of tests and Storybook: update stories and tests that use region constants; no new specs for Storybook or test layout beyond what this change touches.
