## 1. Region data and API

- [x] 1.1 Add `src/regions/` with types (e.g. `Country`, `StateOption`) and a `countries.ts` module exporting a list of countries (code + name, e.g. ISO 3166-1 alpha-2), sorted by name.
- [x] 1.2 Add `src/regions/states-au.ts` exporting Australian states/territories (code + name) and `src/regions/states-us.ts` exporting US states (code + name).
- [x] 1.3 Add `src/regions/index.ts` with `getStatesForCountry(code: string): StateOption[] | undefined` that returns the state list for AU/US and `undefined` otherwise; re-export countries list and types.
- [x] 1.4 Export region API from package entry (`src/index.ts`): countries list, `getStatesForCountry`, and region types (tree-shakeable).

## 2. Manual form: Country and State controls

- [x] 2.1 In `AddressInput`, replace the manual form’s Country text input with a Mantine `Select` populated from the countries list; store selected value (e.g. country code) in state and in `Address.country` on submit.
- [x] 2.2 When the selected country has a state list (`getStatesForCountry` returns an array), render State as a Mantine `Select` with those options; when it returns `undefined`, render State as a `TextInput`. Store state value (code or free text) in `Address.state` on submit.
- [x] 2.3 Ensure manual modal still clears and resets Country and State when opened/closed, and that Row 6 layout (State, Country) and grid structure remain as specified.

## 3. Tests and Storybook

- [x] 3.1 Add unit tests for region API: `getStatesForCountry('AU')` and `getStatesForCountry('US')` return non-empty lists; `getStatesForCountry('XX')` or other unconfigured code returns `undefined`; countries list includes AU and US and is non-empty.
- [x] 3.2 Add tests (e.g. React Testing Library) for manual form: Country is a select with options; when Australia or US is selected, State is a select; when another country is selected, State is a text input; submitted address includes country and state values.
- [x] 3.3 Add or update Storybook story for manual entry demonstrating Country select, State select (AU/US), and State text input (e.g. another country), and that submitted address displays correctly.
