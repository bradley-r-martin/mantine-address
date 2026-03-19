# storybook Specification (delta)

## ADDED Requirements

### Requirement: Restriction stories provide country and region selection

The Storybook stories that document address restrictions (e.g. `AddressInput/Restrictions`) SHALL provide a way to choose a country and, when the chosen country has a state/region list, a region from the Storybook UI, and SHALL pass the selected values to `AddressInput`’s `accept` prop so that users can test different country and region combinations without editing story source code.

#### Scenario: User selects country and region in restriction story

- **WHEN** a developer opens a restriction documentation story that uses the country/region selector
- **THEN** a country select (e.g. “Any”, AU, US) and, when applicable, a region select (e.g. NSW, VIC for AU; CA, NY for US) are visible
- **THEN** changing the country or region updates the `accept` prop passed to `AddressInput` and the component reflects the new restriction (e.g. manual form or autocomplete validation)

#### Scenario: No restriction when “Any” or equivalent is selected

- **WHEN** the user selects “Any” (or equivalent) for country in the restriction story
- **THEN** `AddressInput` receives no country (or region) restriction and accepts any address as per the address-restrictions spec
