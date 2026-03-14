## 1. API and types

- [x] 1.1 Add `allowsManualEntry?: boolean` to `AddressInputProps` with default `true` in defaultProps
- [x] 1.2 Make `provider` optional in `AddressInputProps` (e.g. `provider?: AddressLookupProvider | null`) so manual-only usage is type-safe when `allowsManualEntry` is true

## 2. Manual-entry modal and form

- [x] 2.1 Add internal manual-entry modal (Mantine Modal) with open/close state; render it inside AddressInput when opened
- [x] 2.2 Implement form inside modal with fields that map to `Address` (e.g. street, suburb, state, postcode, country); use Mantine form primitives
- [x] 2.3 On form submit: build `Address` from form values, call `onChange` with it, update internal address state, close modal, and ensure input display uses active format provider
- [x] 2.4 On modal cancel/Escape/overlay: close modal without calling `onChange` or changing address; ensure focus trap and Escape close work (Mantine Modal defaults)

## 3. No-results "enter manually" option

- [x] 3.1 When provider returns empty array for non-empty query and `allowsManualEntry` is true, add a selectable dropdown option (e.g. "Enter manually") alongside or instead of the disabled no-results message
- [x] 3.2 When user selects the "enter manually" option, open the manual-entry modal (and optionally pre-fill street from current query)
- [x] 3.3 When `allowsManualEntry` is false, keep existing behavior: only show the disabled no-results message, no manual option

## 4. No-provider behavior

- [x] 4.1 When `provider` is null/undefined and `allowsManualEntry` is true: do not disable the input and do not show the "provider required" error
- [x] 4.2 When the user clicks or focuses the input in the no-provider + allowsManualEntry case, open the manual-entry modal (do not open an empty dropdown)
- [x] 4.3 When `provider` is null/undefined and `allowsManualEntry` is false: keep existing behavior (disabled input, error message, no lookup)

## 5. Tests

- [x] 5.1 Add unit tests: allowsManualEntry defaults to true; with allowsManualEntry false and no provider, input is disabled with error
- [x] 5.2 Add unit tests: no provider and allowsManualEntry true, click/focus opens modal; submitting manual form calls onChange and closes modal; cancel does not call onChange
- [x] 5.3 Add unit tests: provider returns no results and allowsManualEntry true, "enter manually" option appears and selecting it opens modal

## 6. Storybook

- [x] 6.1 Add story: manual entry when no provider (allowsManualEntry default), click input opens modal
- [x] 6.2 Add story: provider returns no results, "enter manually" option opens modal
- [x] 6.3 Add story: allowsManualEntry false with no provider shows disabled + error; allowsManualEntry false with provider and no results shows only "no results" message
