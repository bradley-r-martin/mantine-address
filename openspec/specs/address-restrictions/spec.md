# address-restrictions Specification

## Purpose

TBD - created by archiving change address-defaults-and-restrictions. Update Purpose after archive.

## Requirements

### Requirement: Component accepts address restrictions

The component SHALL accept an optional `restrictions` prop that limits which addresses are acceptable. The prop SHALL allow specifying allowed countries, states, postcodes, and/or suburbs (e.g. arrays of codes or strings). When restrictions are provided, an address SHALL be accepted only if it satisfies every non-empty restriction (AND semantics). An address that does not satisfy the restrictions SHALL be treated as invalid: the component SHALL NOT call `onChange` with that address, and SHALL display a validation error (e.g. on the component or in the manual form).

#### Scenario: Restrictions prop is omitted

- **WHEN** the consumer does not pass `restrictions` (or passes undefined)
- **THEN** any address selected via autocomplete or submitted via manual entry SHALL be accepted and `onChange` SHALL be called as today
- **THEN** no restriction-based validation SHALL be applied

#### Scenario: Allowed countries only

- **WHEN** the consumer passes `restrictions={{ allowedCountries: ['AU'] }}` and the user selects or enters an address with country not in the list (e.g. US)
- **THEN** the component SHALL NOT call `onChange` with that address
- **THEN** the component SHALL show a validation error (e.g. "Address must be within the allowed region" or equivalent)

#### Scenario: Allowed countries and state

- **WHEN** the consumer passes `restrictions={{ allowedCountries: ['AU'], allowedStates: ['NSW', 'VIC'] }}` and the user selects or enters an address in Australia with state "QLD"
- **THEN** the address SHALL be invalid (state not in allowed list)
- **THEN** the component SHALL NOT call `onChange` and SHALL show a validation error

#### Scenario: Address satisfies all restrictions

- **WHEN** restrictions are set and the user selects or enters an address that satisfies every non-empty restriction (e.g. country in allowedCountries, state in allowedStates if provided, postcode in allowedPostcodes if provided, suburb in allowedSuburbs if provided)
- **THEN** the component SHALL call `onChange` with that address
- **THEN** no restriction-related validation error SHALL be shown

#### Scenario: Restrictions apply to autocomplete selection

- **WHEN** a provider is set, restrictions are set, and the user selects a suggestion from the dropdown
- **THEN** after `getDetails` resolves, the component SHALL evaluate the address against the restrictions
- **THEN** if the address fails restrictions, the component SHALL NOT update the selected address and SHALL NOT call `onChange`; it SHALL display a validation error
- **THEN** if the address passes restrictions, the component SHALL behave as today (update selection, call `onChange`)

#### Scenario: Restrictions apply to manual form submit

- **WHEN** restrictions are set and the user submits the manual-entry form with an address that does not satisfy the restrictions
- **THEN** the component SHALL NOT close the modal with success and SHALL NOT call `onChange`
- **THEN** the form SHALL display validation error(s) so the user can correct the address
- **THEN** when the user submits an address that satisfies restrictions, the component SHALL commit the address, call `onChange`, and close the modal

### Requirement: Manual form country and state options respect restrictions

When `restrictions.allowedCountries` is set, the manual-entry form's Country select SHALL list only countries that are in the allowed list (intersection with the library's canonical countries list). When `restrictions.allowedStates` is set and the State field is a select (e.g. for Australia or United States), the State select SHALL list only states that are in the allowed list. When the State field is a text input (country with no state list), the entered state SHALL be validated on submit against `allowedStates` if provided.

#### Scenario: Country select filtered by allowed countries

- **WHEN** the consumer passes `restrictions={{ allowedCountries: ['AU', 'NZ'] }}` and the user opens the manual-entry modal
- **THEN** the Country select SHALL show only Australia and New Zealand (or the corresponding names for AU and NZ from the canonical list)
- **THEN** the user SHALL NOT be able to select a country outside the allowed list from the dropdown

#### Scenario: State select filtered by allowed states

- **WHEN** the consumer passes `restrictions={{ allowedStates: ['NSW', 'VIC'] }}`, the user opens the manual-entry modal and selects Australia as country
- **THEN** the State select SHALL show only NSW and VIC (or the corresponding state options for those codes)
- **THEN** the user SHALL NOT be able to select a state outside the allowed list from the dropdown

#### Scenario: Postcode and suburb validated on submit

- **WHEN** the consumer passes `restrictions={{ allowedPostcodes: ['2000', '2001'] }}` and the user submits the manual form with postcode "3000"
- **THEN** the form SHALL NOT commit and SHALL show a validation error (e.g. postcode or summary message)
- **THEN** when the user changes postcode to "2000" and submits, the address SHALL be accepted
- **WHEN** the consumer passes `restrictions={{ allowedSuburbs: ['Sydney', 'Melbourne'] }}` and the user submits with suburb "Brisbane"
- **THEN** the form SHALL NOT commit and SHALL show a validation error; when the user corrects to an allowed suburb and submits, the address SHALL be accepted
