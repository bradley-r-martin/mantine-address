# address-restrictions Specification (Delta)

## MODIFIED Requirements

### Requirement: Component accepts address restrictions

The component SHALL accept an optional `accept` prop of the form `{ country?: string | Country; region?: string | Region }`. When set, only addresses that match the given country (and optionally the given region/state) SHALL be accepted. An address SHALL be accepted only if: (1) when `accept.country` is set, the address’s country matches that value (normalised, case-insensitive); (2) when `accept.region` is set, the address’s state matches the region’s abbreviation or the string value (normalised). An address that does not satisfy these conditions SHALL be treated as invalid: the component SHALL NOT call `onChange` with that address, and SHALL display a validation error (e.g. on the component or in the manual form).

#### Scenario: Accept prop is omitted

- **WHEN** the consumer does not pass `accept` (or passes undefined)
- **THEN** any address selected via autocomplete or submitted via manual entry SHALL be accepted and `onChange` SHALL be called as today
- **THEN** no restriction-based validation SHALL be applied

#### Scenario: Single country only

- **WHEN** the consumer passes `accept={{ country: 'AU' }}` (or equivalent) and the user selects or enters an address with country not matching (e.g. US)
- **THEN** the component SHALL NOT call `onChange` with that address
- **THEN** the component SHALL show a validation error (e.g. "Address must be within the allowed region" or equivalent)

#### Scenario: Country and region

- **WHEN** the consumer passes `accept={{ country: 'AU', region: REGIONS.NEW_SOUTH_WALES }}` (or region abbreviation `'NSW'`) and the user selects or enters an address in Australia with state "QLD"
- **THEN** the address SHALL be invalid (state does not match the accepted region)
- **THEN** the component SHALL NOT call `onChange` and SHALL show a validation error

#### Scenario: Address satisfies accept

- **WHEN** `accept` is set and the user selects or enters an address that satisfies every non-empty constraint (country matches when `accept.country` is set, state matches when `accept.region` is set)
- **THEN** the component SHALL call `onChange` with that address
- **THEN** no restriction-related validation error SHALL be shown

#### Scenario: Accept applies to autocomplete selection

- **WHEN** a provider is set, `accept` is set, and the user selects a suggestion from the dropdown
- **THEN** after `getDetails` resolves, the component SHALL evaluate the address against `accept`
- **THEN** if the address fails, the component SHALL NOT update the selected address and SHALL NOT call `onChange`; it SHALL display a validation error
- **THEN** if the address passes, the component SHALL behave as today (update selection, call `onChange`)

#### Scenario: Accept applies to manual form submit

- **WHEN** `accept` is set and the user submits the manual-entry form with an address that does not satisfy `accept`
- **THEN** the component SHALL NOT close the modal with success and SHALL NOT call `onChange`
- **THEN** the form SHALL display validation error(s) so the user can correct the address
- **THEN** when the user submits an address that satisfies `accept`, the component SHALL commit the address, call `onChange`, and close the modal

### Requirement: Manual form country and state options respect accept

When `accept.country` is set, the manual-entry form's Country select SHALL list only that country (or the single matching country from the library's canonical list). When `accept.region` is set and the State field is a select (e.g. for Australia or United States), the State select SHALL list only the state corresponding to that region (e.g. the region’s abbreviation). When the State field is a text input (country with no state list), the entered state SHALL be validated on submit against `accept.region` if provided (e.g. string comparison to the abbreviation).

#### Scenario: Country select shows only accepted country

- **WHEN** the consumer passes `accept={{ country: 'AU' }}` and the user opens the manual-entry modal
- **THEN** the Country select SHALL show only Australia (or the corresponding name for AU from the canonical list)
- **THEN** the user SHALL NOT be able to select a different country from the dropdown

#### Scenario: State select shows only accepted region

- **WHEN** the consumer passes `accept={{ country: 'AU', region: REGIONS.NEW_SOUTH_WALES }}` (or `region: 'NSW'`), the user opens the manual-entry modal and the country has a state list (e.g. Australia)
- **THEN** the State select SHALL show only the state for the accepted region (e.g. NSW)
- **THEN** the user SHALL NOT be able to select a state outside the accepted region from the dropdown

## REMOVED Requirements

### Requirement: Restrictions prop with multiple countries, states, postcodes, suburbs

**Reason:** Replaced by the single `accept` prop with at most one country and one region. Postcode and suburb filtering are not supported by providers and are out of scope for the simplified API.

**Migration:** Use `accept={{ country: string | Country, region?: string | Region }}` instead of `restrictions={{ allowedCountries, allowedRegions | allowedStates, ... }}`. For postcode or suburb filtering, validate the address in the consumer (e.g. in `onChange`) or restrict manually-entered options outside the component.

### Requirement: Postcode and suburb validated on submit

**Reason:** Postcode and suburb are no longer part of the component’s acceptance criteria.

**Migration:** After receiving an address in `onChange`, check `address.postcode` and `address.suburb` in the consumer and show an error or reject the address if they fall outside allowed values.
