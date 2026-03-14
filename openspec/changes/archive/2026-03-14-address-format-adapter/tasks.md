## 1. Format adapter interface and default formatter

- [x] 1.1 Define `AddressFormatAdapter` interface (`format(address: Address): string`) in types or formatAddress module and export it
- [x] 1.2 Implement and export `internationalAddressFormat` adapter that formats using current `addressToString` behaviour (single-line, street then locality)
- [x] 1.3 Add unit tests for international formatter (e.g. full address, minimal address, empty fields)

## 2. Australian formatter

- [x] 2.1 Implement `australianAddressFormat` adapter that uses existing AU logic (e.g. `formatAustralianState`, current AU branch from `formatAddressForRegion`)
- [x] 2.2 Export `australianAddressFormat` from the package
- [x] 2.3 Add unit tests for Australian formatter (e.g. state as code, comma-separated output; non-AU address still formatted by AU rules)

## 3. AddressInput formatter prop and remove region

- [x] 3.1 Add optional `formatter?: AddressFormatAdapter` to `AddressInputProps`; resolve to `formatter ?? internationalAddressFormat` and use `formatter.format(address)` for all display (selected address and after option submit)
- [x] 3.2 Remove `region` prop and `AddressRegion` type from `AddressInput` component and props
- [x] 3.3 Update Storybook story that used `region="AU"` to use `formatter={australianAddressFormat}` and add or adjust story for default (international) display
- [x] 3.4 Add or update component tests: display uses formatter when provided; display uses international formatter when formatter omitted

## 4. Exports and deprecation

- [x] 4.1 Export `AddressFormatAdapter`, `internationalAddressFormat`, and `australianAddressFormat` from main entry (`src/index.ts`)
- [x] 4.2 Deprecate `formatAddressForRegion` and `AddressRegion` (JSDoc `@deprecated` and migration note) or remove them; per design decision

## 5. Documentation

- [x] 5.1 Update README: document `formatter` prop, display-only semantics, and migration from `region` to `formatter`; example with `australianAddressFormat`
- [x] 5.2 Update AddressInput JSDoc for `formatter` prop and remove `region` from documented props
