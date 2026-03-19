## 1. Types and prop

- [x] 1.1 Define `PrefillAddress` type (or equivalent): partial address with `country?: string | Country` and `state?: string | Region`; other manual fields as `string`. Add to types module or inline in AddressInput props; export if useful for consumers.
- [x] 1.2 Add optional `prefill?: PrefillAddress` to `AddressInputProps` and destructure it in the component with `defaultAddress`.

## 2. Resolution and merge

- [x] 2.1 Implement a small helper that resolves a single prefill/default value for a field: given `string | Country` for country return `string` (code); given `string | Region` for state return `string` (abbreviation); otherwise return the string. Use when building effective defaults.
- [x] 2.2 In `openManualModal`, compute effective defaults by merging `defaultAddress` and `prefill` with prefill winning for each key; resolve Country/Region to codes for country/state; then set all manual form state (e.g. `setManualFormCountry`, `setManualFormState`, …) from the merged and resolved object.

## 3. Tests

- [x] 3.1 Add or extend tests: manual modal opens with prefill using Country and Region constants (e.g. COUNTRIES.AU, REGIONS.NEW_SOUTH_WALES) and form shows correct country and state.
- [x] 3.2 Add tests for precedence: when both `defaultAddress` and `prefill` are set, prefill overrides for overlapping fields; defaultAddress fills fields not in prefill.
- [x] 3.3 Add test: prefill does not set component value (display value stays empty until user selects or submits address).

## 4. Storybook Prefill group

- [x] 4.1 Add story file `stories/AddressInput/Prefill.stories.tsx` (or equivalent) with a **Prefill** story group under AddressInput.
- [x] 4.2 Add at least one story that uses `prefill={{ country: COUNTRIES.AU, state: REGIONS.NEW_SOUTH_WALES }}` (or equivalent constants) and document that opening the manual modal shows prefilled country and region.
- [x] 4.3 Optionally add stories for partial prefill (e.g. country only) or prefill with accept/other props; ensure constant-based usage is preferred in source.
