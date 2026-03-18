## 1. Types and API surface

- [x] 1.1 Define `AddressRestrictions` type (optional `allowedCountries`, `allowedStates`, `allowedPostcodes`, `allowedSuburbs` as string arrays) and export from package
- [x] 1.2 Add optional `defaultAddress?: Partial<Address>` and `restrictions?: AddressRestrictions` to `AddressInputProps` in `AddressInput.tsx`
- [x] 1.3 Export `AddressRestrictions` (and any new types) from `src/index.ts`

## 2. Restriction validation helper

- [x] 2.1 Implement a helper that takes an `Address` and `AddressRestrictions` and returns whether the address satisfies all non-empty restrictions (normalise: trim, case-insensitive where appropriate for codes/labels)
- [x] 2.2 Add unit tests for the restriction helper (allowed countries only, country+state, postcode, suburb, AND semantics, empty restrictions)

## 3. Defaults in manual-entry form

- [x] 3.1 When opening the manual-entry modal, initialise form state from `defaultAddress` (only fields present in default); other fields empty
- [x] 3.2 Add a Storybook story that uses `defaultAddress={{ country: 'AU', state: 'NSW' }}` and verify form pre-fill
- [x] 3.3 Add test(s) that open manual modal with `defaultAddress` and assert initial field values

## 4. Restrictions in manual-entry form

- [x] 4.1 When `restrictions.allowedCountries` is set, filter the Country select options to the intersection with the canonical countries list
- [x] 4.2 When `restrictions.allowedStates` is set and State is a select, filter State options to allowed states; when State is text input, validate on submit against `allowedStates`
- [x] 4.3 On manual form submit, run address through restriction helper; if invalid, set form/component error and do not call `onChange` or close modal; if valid, commit as today
- [x] 4.4 Add tests: manual submit with address failing restrictions (error, no onChange); manual submit with address passing restrictions (onChange called, modal closes)
- [x] 4.5 Add Storybook story: Australia-only restrictions; story: specific state/postcode (e.g. NSW + postcodes 2000, 2001)

## 5. Restrictions in autocomplete flow

- [x] 5.1 After user selects a suggestion and `getDetails` resolves, run address through restriction helper; if invalid, do not update selection, do not call `onChange`, set component error; if valid, behave as today
- [x] 5.2 Add test: select suggestion that resolves to address outside restrictions (error shown, onChange not called); select suggestion that passes restrictions (onChange called)
- [x] 5.3 Add or extend Storybook story for autocomplete with restrictions (e.g. Australia-only with Google Places or mock provider)

## 6. Documentation and cleanup

- [x] 6.1 Document `defaultAddress` and `restrictions` (and `AddressRestrictions`) in README or Storybook docs
- [x] 6.2 Ensure validation error message for restrictions is a sensible default (e.g. "Address must be within the allowed region")
