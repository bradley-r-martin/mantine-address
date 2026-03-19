## 1. Types and region derivation

- [x] 1.1 Extend `Country` in `src/regions/types.ts` with index signature `[key: string]: string | Region` so country objects may carry region properties
- [x] 1.2 Add a small helper (e.g. in `src/regions/index.ts`) that, given a `Country`, returns region entries (all keys except `code` and `name` whose values are Region-shaped); use it for deriving state options

## 2. Config files: Australia and United States

- [x] 2.1 Refactor `src/regions/states-au.ts`: export a single `AUSTRALIA` object with `code`, `name`, and region keys (NEW_SOUTH_WALES, VICTORIA, etc.); remove separate `REGIONS` export and default export if redundant
- [x] 2.2 Refactor `src/regions/states-us.ts`: export a single `UNITED_STATES` object with `code`, `name`, and region keys (ALABAMA, ALASKA, etc.); remove separate `REGIONS` export and default export if redundant

## 3. Countries and regions index

- [x] 3.1 Update `src/regions/countries.ts`: keep importing `AUSTRALIA` and `UNITED_STATES`; assign to `COUNTRIES.AU` and `COUNTRIES.US`; ensure no other structural changes
- [x] 3.2 Update `src/regions/index.ts`: export `AUSTRALIA` and `UNITED_STATES`; remove exports of `REGIONS` and `REGIONS_US`; implement `getStatesForCountry(code)` by reading `COUNTRIES[code]` and deriving state options via the region-derivation helper from 1.2

## 4. Package and component usage

- [x] 4.1 Update `src/index.ts`: export `AUSTRALIA` and `UNITED_STATES` from regions; remove `REGIONS` and `REGIONS_US` from exports
- [x] 4.2 Update any internal usage of `REGIONS` or `REGIONS_US` (e.g. in `AddressInput.tsx` or manual form) to derive state options from the selected country object using the same helper, or to use `AUSTRALIA`/`UNITED_STATES` where a constant is needed

## 5. Manual form state options

- [x] 5.1 Ensure the manual-entry form’s state dropdown uses `getStatesForCountry(selectedCountryCode)` or equivalent; when the selected country is a country object with regions, state options SHALL come from that object (already satisfied if getStatesForCountry and the helper are used consistently)

## 6. Stories and tests

- [x] 6.1 Update Storybook stories that use `REGIONS` or `REGIONS_US` to use `AUSTRALIA` or `UNITED_STATES` and property access (e.g. `AUSTRALIA.NEW_SOUTH_WALES`)
- [x] 6.2 Update tests that reference `REGIONS`/`REGIONS_US` or assert on region/country exports to use the new API; add or adjust tests for `getStatesForCountry` deriving from country object when region keys exist

## 7. Documentation

- [x] 7.1 Update JSDoc and any README or docs that show `prefill`/`accept` examples to use `AUSTRALIA`, `AUSTRALIA.NEW_SOUTH_WALES`, and `UNITED_STATES.*`; document the breaking change (removal of `REGIONS`, `REGIONS_US`) in changelog or release notes
