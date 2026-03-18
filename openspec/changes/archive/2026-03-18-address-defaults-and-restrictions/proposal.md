## Why

Applications often need addresses constrained to a region (e.g. Australia-only, or a specific state, postcode or suburb) for compliance, shipping rules, or business logic. They may also want to pre-fill manual entry (e.g. default country or state) to reduce friction. Today the component does not support default values for the manual-entry form or validation/restriction of address fields, so consumers must implement constraints and defaults themselves.

## What Changes

- **Default values for manual entry**: Add optional props (e.g. `defaultCountry`, `defaultState`, `defaultPostcode`, `defaultSuburb`, or a single `defaultAddress` partial) so that when the user opens the manual-entry modal, certain fields are pre-filled. Defaults apply only to the manual form; they do not change the controlled/uncontrolled `value`/`defaultValue` of the component.
- **Address restrictions**: Add optional props to restrict which addresses are acceptable: e.g. allowed countries, allowed states, allowed postcodes, allowed suburbs. Restrictions SHALL apply to both autocomplete (e.g. filter or validate provider results, reject selection if outside allowed set) and manual entry (e.g. limit country/state selects to allowed values, validate postcode/suburb on submit). When an address does not satisfy restrictions, the component SHALL treat it as invalid (e.g. show validation error, do not call `onChange` with that value).
- **Public API**: New props on `AddressInput` and any new types (e.g. `AddressRestrictions`) exported from the package. No breaking changes to existing props; all new props optional. Compatible with current Mantine and TypeScript usage.

## Capabilities

### New Capabilities

- `address-defaults`: Default values for manual-entry form fields (country, state, postcode, suburb, and optionally other Address fields). How defaults are passed (per-field vs partial Address), and that they only affect the manual modal’s initial state.
- `address-restrictions`: Restrict addresses by country, state, postcode, and/or suburb. Restrictions apply to both provider-based selection and manual entry (filtering/validation). Behavior when a selected or entered address does not meet restrictions (validation state, no `onChange` for invalid).

### Modified Capabilities

- `manual-address-entry`: Form SHALL use default values when opening the modal; country/state selects (and optionally validation) SHALL respect restrictions when provided.
- `address-autocomplete`: When restrictions are set, the component SHALL only accept addresses that satisfy them (filter suggestions or validate on select; same for manual submit).

## Impact

- **Component**: `AddressInput` gains new optional props (defaults and restrictions). Internal manual-entry modal and autocomplete flow must apply defaults and enforce restrictions.
- **Types**: New or extended types (e.g. `AddressRestrictions`, or inline prop types) exported from the package.
- **Regions**: Restrictions may use existing `countries` / `getStatesForCountry` for allowed lists; possible new helpers (e.g. allowed postcodes/suburbs as arrays or predicates).
- **Tests**: New tests for default pre-fill in manual form and for restriction validation in both autocomplete and manual paths.
- **Storybook**: New stories demonstrating defaults and restrictions (e.g. Australia-only, specific state/postcode).

## Non-goals

- Geo-fencing or distance-based rules are out of scope.
- Custom validation messages or i18n for restriction errors are not required in this change (default messages are sufficient); can be revisited later.
- Changing provider API (e.g. passing restrictions into `getSuggestions`) is optional; filtering/validation on the client after results or on submit is sufficient for the use cases above.
