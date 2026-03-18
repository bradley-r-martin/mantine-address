## 1. Types and validation

- [x] 1.1 Add `AcceptAddress` (or equivalent) type `{ country?: string | Country; region?: string | Region }` in `src/types.ts` and export it
- [x] 1.2 Replace `AddressRestrictions` / restrictions usage with `AcceptAddress` in `GetSuggestionsOptions` (e.g. `accept?: AcceptAddress`)
- [x] 1.3 Refactor `addressSatisfiesRestrictions` in `src/restrictions.ts` to accept `(address, accept)` and implement single-country, single-region validation; normalise country/region (string or object to code/abbreviation)
- [x] 1.4 Add or update unit tests in `tests/restrictions.test.ts` for the new accept shape (single country, single region, omit/undefined cases)

## 2. AddressInput component

- [x] 2.1 Add `accept?: AcceptAddress` prop to `AddressInputProps` in `src/AddressInput.tsx`; remove `restrictions` prop
- [x] 2.2 Update all usages of `restrictions` and `addressSatisfiesRestrictions` in AddressInput to use `accept` and the new validation signature
- [x] 2.3 Derive manual form Country list from `accept?.country` (single country when set); derive State list from `accept?.region` (single state when set). Remove Set-based filtering from arrays
- [x] 2.4 Pass `accept` (or provider-friendly shape) into provider `getSuggestions` options instead of `restrictions`
- [x] 2.5 Update or remove any internal references to `allowedCountries`, `allowedRegions`, `allowedStates`, `allowedPostcodes`, `allowedSuburbs`

## 3. GooglePlacesProvider

- [x] 3.1 In `getSuggestions`, read accept shape from options (e.g. `options?.accept`); set `request.componentRestrictions = { country: [singleCode] }` when `accept.country` is set; set location bias from `accept.region?.location` when present
- [x] 3.2 Add or update provider tests in `tests/providers/GooglePlacesProvider.test.ts` for single country and single region

## 4. Tests and stories

- [x] 4.1 Update `tests/AddressInput.test.tsx`: replace all `restrictions` props with `accept`; remove or adjust tests that relied on multiple countries, multiple regions, postcode, or suburb restrictions
- [x] 4.2 Update `tests/restrictions.test.ts`: remove tests for multiple countries/regions and for postcode/suburb; ensure coverage for single country, single region, and combined accept
- [x] 4.3 Update `stories/AddressInput/Restrictions.stories.tsx` to use `accept={{ country: COUNTRIES.AU }}`, `accept={{ country: COUNTRIES.AU, region: REGIONS.NEW_SOUTH_WALES }}`, and remove State+postcode story or document migration
- [x] 4.4 Update `stories/Providers/GooglePlaces.stories.tsx` to use `accept` instead of `restrictions`; fix any incorrect reference (e.g. AUSTRALIA.REGIONS) to use exported REGIONS

## 5. Specs and exports

- [x] 5.1 Remove or deprecate export of `AddressRestrictions` from public API; export `AcceptAddress` (or chosen type name) from `src/index.ts`
- [x] 5.2 Apply delta specs to base specs: update `openspec/specs/address-restrictions/spec.md` and `openspec/specs/manual-address-entry/spec.md` with the content from the change’s specs (so base specs reflect the new behaviour for future changes)
- [x] 5.3 Add CHANGELOG entry for the breaking change (accept prop, removal of restrictions and postcode/suburb) and bump major version in package.json when ready for release
