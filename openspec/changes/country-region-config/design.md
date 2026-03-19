## Context

The library exposes country and region data in `src/regions/`: a global `COUNTRIES` record, a sorted `countries` array, and per-country files (`states-au.ts`, `states-us.ts`) that export a `Country` constant and a separate `REGIONS` record. Consumers use `COUNTRIES.AU`, `REGIONS.NEW_SOUTH_WALES`, etc. The `Country` type is `{ code: string; name: string }` and `Region` is a separate type. We want one object per country that carries both identity and regions (e.g. `AUSTRALIA.NEW_SOUTH_WALES`), with a single type and no unions or registries.

## Goals / Non-Goals

**Goals:**

- One `Country` type that allows region keys via an index signature; no `CountryWithRegions` or union.
- Per-country config files export a single constant (e.g. `AUSTRALIA`, `UNITED_STATES`) with `code`, `name`, and region keys on the same object.
- Public API: consumers use `prefill={{ country: AUSTRALIA, region: AUSTRALIA.NEW_SOUTH_WALES }}`; `COUNTRIES` and `getStatesForCountry(code)` continue to work, with state options derived from the country object when it has region keys.

**Non-Goals:**

- Adding postcodes or suburbs data; only the type/config shape is future-ready.
- Changing prefill/accept/form behavior beyond the shape of the constants.
- A separate registry or second type for “countries with regions.”

## Decisions

### 1. Extend `Country` with an index signature (no new type)

- **Choice**: Define `Country` as `{ code: string; name: string; [key: string]: string | Region }` so any additional keys may be `Region` values.
- **Rationale**: Keeps one type; every country is a `Country`. Objects with only `code` and `name` (most entries in `COUNTRIES`) and objects with region keys (AU, US) are the same type. Avoids unions and keeps prefill/accept typings unchanged.
- **Alternative**: A separate `CountryWithRegions` type and a union — rejected to avoid union patterns and extra branching in consumers.

### 2. Config file = one exported object per country

- **Choice**: Each file (e.g. `states-au.ts`) exports a single object literal with `code`, `name`, and region keys. No separate `REGIONS` export; regions are properties of that object.
- **Rationale**: Matches desired usage (`AUSTRALIA.NEW_SOUTH_WALES`) and makes the file clearly “the Australia config.” Easy to extend later with more keys (e.g. postcodes) on the same object.
- **Alternative**: Export both a country and a `REGIONS` record and a combined type — rejected so the public API is one import, one object.

### 3. `getStatesForCountry(code)` derives from the country object

- **Choice**: Implementation looks up `COUNTRIES[code]`; if that object has keys other than `code` and `name`, treat those values as regions and build state options (abbreviation + name, sorted). No separate map of “countries with regions.”
- **Rationale**: Single source of truth (the country object); no registry to keep in sync. Simple rule: region keys are any key that is not `code` or `name`.
- **Alternative**: A registry mapping code → country-with-regions — rejected to avoid extra complexity.

### 4. `COUNTRIES.AU` / `COUNTRIES.US` = same reference as `AUSTRALIA` / `UNITED_STATES`

- **Choice**: `countries.ts` continues to import `AUSTRALIA` and `UNITED_STATES` and assign them to `COUNTRIES.AU` and `COUNTRIES.US`.
- **Rationale**: Consumers can use either `COUNTRIES.AU` or `AUSTRALIA`; both refer to the same object with regions. No duplication.

## Risks / Trade-offs

- **Index signature is permissive**: `[key: string]: string | Region` allows any string key. Mitigation: document that only `code` and `name` are standard; other keys are region entries. Runtime derivation of regions (exclude `code`/`name`) is a single, clear convention.
- **Breaking change for REGIONS / REGIONS_US**: Consumers must migrate to `AUSTRALIA.*` / `UNITED_STATES.*`. Mitigation: document in changelog and migration note; major or minor bump per semver policy.
- **TypeScript narrowing**: Code that receives a `Country` and wants to iterate “region” keys must exclude `code` and `name` by name. Mitigation: centralize this in one helper (e.g. used by `getStatesForCountry` and the manual form) so the convention lives in one place.

## Migration Plan

- Implement type and config refactor; update `getStatesForCountry` and manual form to derive regions from the country object.
- Remove `REGIONS` and `REGIONS_US` exports; add `AUSTRALIA` and `UNITED_STATES` to package exports.
- Update all internal and Storybook usages to `AUSTRALIA.*` / `UNITED_STATES.*`.
- Changelog and release notes: document breaking change and migration (replace `REGIONS` / `REGIONS_US` with `AUSTRALIA` / `UNITED_STATES` and property access).
- No rollback beyond reverting the change; no multi-version compatibility for the removed exports.

## Open Questions

None; type shape and derivation rule are decided.
