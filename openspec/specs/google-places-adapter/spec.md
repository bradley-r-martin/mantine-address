## ADDED Requirements

### Requirement: GooglePlacesProvider implements AddressLookupProvider

The library SHALL export a `GooglePlacesProvider` class that implements the `AddressLookupProvider` interface using the Google Places Autocomplete and Place Details APIs.

#### Scenario: Type compatibility

- **WHEN** a consumer assigns `new GooglePlacesProvider({ apiKey: "..." })` to a variable typed as `AddressLookupProvider`
- **THEN** TypeScript accepts the assignment without error

---

### Requirement: Provider is constructed with an API key

`GooglePlacesProvider` SHALL accept a required `apiKey` string in its constructor options. The API key MUST be passed to the underlying Google Places API calls.

#### Scenario: Construction with API key

- **WHEN** `new GooglePlacesProvider({ apiKey: "MY_KEY" })` is called
- **THEN** the instance is created without error

---

### Requirement: getSuggestions calls Google Places Autocomplete

`GooglePlacesProvider.getSuggestions(input)` SHALL call the Google Places Autocomplete API (via `window.google.maps.places.AutocompleteService`) and return an array of `AddressSuggestion` objects mapping Google predictions to `{ id: place_id, label: description }`.

#### Scenario: Successful autocomplete

- **WHEN** `getSuggestions("1600 Pennsylv")` is called with `window.google` available
- **THEN** the returned array contains suggestions with `id` equal to the Google `place_id` and `label` equal to the prediction `description`

#### Scenario: Google Maps not loaded

- **WHEN** `getSuggestions` is called and `window.google` is undefined
- **THEN** the promise rejects with a descriptive error message indicating the Google Maps script is not loaded

---

### Requirement: getDetails calls Google Place Details

`GooglePlacesProvider.getDetails(id)` SHALL call the Google Place Details API using `window.google.maps.places.PlacesService` and map the result to an `AddressDetails`/`Address` object with normalized fields.

#### Scenario: Successful detail fetch

- **WHEN** `getDetails("ChIJN1t_tDeuEmsRUsoyG83frY4")` is called with a valid place id
- **THEN** the returned address object contains the expected structured fields derived from the Google address components

#### Scenario: Place Details API error

- **WHEN** `getDetails` receives a non-OK status from the Google API
- **THEN** the returned promise rejects with an error including the Google status code

---

### Requirement: GooglePlacesProvider is exported from package root

The `GooglePlacesProvider` class SHALL be exported from the package's main entry point.

#### Scenario: Named import works

- **WHEN** a consumer writes `import { GooglePlacesProvider } from 'mantine-address-input'`
- **THEN** TypeScript resolves the class without error
