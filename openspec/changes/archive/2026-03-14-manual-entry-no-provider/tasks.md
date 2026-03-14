## 1. Props and types

- [x] 1.1 Remove `allowsManualEntry` from `AddressInputProps` and add `preventManualEntry?: boolean` (default `false`) in `src/AddressInput.tsx`
- [x] 1.2 Update `defaultProps` to use `preventManualEntry: false` and remove `allowsManualEntry`
- [x] 1.3 Update JSDoc for `provider` (optional; when absent, manual-only) and add JSDoc for `preventManualEntry` (only applies when provider is set)

## 2. No-provider branch (manual-only)

- [x] 2.1 In the `provider == null` branch, remove the conditional on `allowsManualEntry`; always render enabled input that opens the manual-entry modal on focus/click (no disabled state, no `PROVIDER_REQUIRED_MESSAGE` error)
- [x] 2.2 Remove or update the `PROVIDER_REQUIRED_MESSAGE` constant and any comments that reference "provider required" or `allowsManualEntry` in the no-provider path

## 3. Provider path (dropdown and preventManualEntry)

- [x] 3.1 Replace use of `allowsManualEntry` with `!preventManualEntry` when building dropdown data for no-results (show "Enter manually" option only when `preventManualEntry` is false or omitted)
- [x] 3.2 Update the comment for `ENTER_MANUALLY_VALUE` to reference `preventManualEntry` instead of `allowsManualEntry`

## 4. Tests and Storybook

- [x] 4.1 Update unit tests that reference `allowsManualEntry` or no-provider disabled/error behavior to use `preventManualEntry` and assert manual-only behavior when no provider
- [x] 4.2 Update Storybook stories that use `allowsManualEntry` to use `preventManualEntry` and add or adjust a story for no-provider manual-only
