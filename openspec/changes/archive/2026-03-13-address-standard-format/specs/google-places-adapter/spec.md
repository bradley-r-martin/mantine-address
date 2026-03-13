## MODIFIED Requirements

### Requirement: getDetails calls Google Place Details

`GooglePlacesAdapter.getDetails(id)` SHALL call the Google Place Details API using `window.google.maps.places.PlacesService` and SHALL map the result to the canonical `Address` type. Mapping SHALL extract or derive fields such as place_id, street_number, street_name, street_type, suburb, state, postcode, country, and optionally latitude/longitude. The adapter SHALL perform provider-specific parsing only within the adapter; the returned object MUST conform to `Address` and MUST NOT include Google-specific properties.

#### Scenario: Successful detail fetch returns Address

- **WHEN** `getDetails("ChIJN1t_tDeuEmsRUsoyG83frY4")` is called with a valid place id
- **THEN** the returned promise resolves with an `Address` object whose fields are derived from the Google address components (e.g. street_number, street_name, street_type, suburb, state, postcode, country)

#### Scenario: Place Details API error

- **WHEN** `getDetails` receives a non-OK status from the Google API
- **THEN** the returned promise rejects with an error including the Google status code

#### Scenario: No provider-specific fields in result

- **WHEN** a consumer receives the result of `GooglePlacesAdapter.getDetails(id)`
- **THEN** the result is a plain object conforming to `Address` with no Google-specific fields (e.g. no raw address_components or place result shape)
