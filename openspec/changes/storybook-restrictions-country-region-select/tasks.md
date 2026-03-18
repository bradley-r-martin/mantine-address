## 1. Wrapper component

- [x] 1.1 Add a `RestrictionsDemo` (or equivalent) component that renders a country select (“Any”, AU, US) and a region select whose options come from `getStatesForCountry` when the selected country has states; when “Any” is selected or country has no state list, omit or disable region and do not pass `accept.region`
- [x] 1.2 Pass selected country and optional region into `AddressInput` as `accept={{ country?, region? }}`; use Mantine `Select` (or equivalent) and existing `COUNTRIES`, `REGIONS`, `REGIONS_US`, `getStatesForCountry` from `@/regions`
- [x] 1.3 Place the component in the restrictions story file or a dedicated `RestrictionsDemo.tsx` under `stories/AddressInput/` (no export from library)

## 2. Restriction stories

- [x] 2.1 Add or refactor a “Manual entry with country/region select” story that uses the wrapper with `provider: null` so users can test manual-entry restriction behavior by changing country/region
- [x] 2.2 Add or refactor an “Autocomplete with country/region select” story that uses the wrapper with the mock provider so users can test autocomplete + restriction validation by changing country/region
- [x] 2.3 Remove or consolidate existing hardcoded restriction stories (e.g. “Australia only”, “accept with region (NSW)”) so all restriction examples are covered by the stories that use the wrapper; update story descriptions/docs to reference testing “Australia only” and “NSW only” via the dropdowns

## 3. Verification

- [x] 3.1 Run Storybook and confirm country/region selects appear and updating them changes `AddressInput` behavior (manual and autocomplete stories); confirm “Any” removes restrictions
