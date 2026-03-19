### Requirement: AddressInput accepts a data object for address datasets

The library SHALL define an `AddressData` interface and SHALL allow `AddressInput` to receive an optional `data` prop of that type. When `data` is omitted, the component SHALL use the library's default `AddressData` implementation.

The `AddressData` interface SHALL include:

- `countries`: a synchronous, canonical list of countries suitable for a Country select, where each entry includes a stable `code` and display `name`
- `regions` (optional): an asynchronous resolver function that accepts a country code and resolves to a regions dataset for that country, or `undefined` when no regions dataset is available

The `AddressData` interface SHOULD reserve optional fields for future datasets (e.g. `postcodes`, `suburbs`) using the same pattern: an asynchronous resolver that resolves to a dataset or `undefined`.

#### Scenario: Component uses default data when data prop is omitted

- **WHEN** a consumer renders `AddressInput` without providing the `data` prop
- **THEN** the component SHALL use the library's default `AddressData` implementation
- **THEN** the Country control in the manual-entry form SHALL still be populated from a canonical country list

#### Scenario: Consumer can bring their own data

- **WHEN** a consumer provides a `data` object to `AddressInput`
- **THEN** the component SHALL use `data.countries` to populate the Country select
- **THEN** the component SHALL call `data.regions(countryCode)` (when provided) to resolve the State/Region list for the selected country

### Requirement: Countries list is synchronous and stable

The `data.countries` list SHALL be available synchronously and SHALL be treated as the canonical source for the Country select. Each entry SHALL include `code` and `name` as strings. The list SHALL be ordered in a consistent way suitable for display in a select (e.g. sorted by `name`).

#### Scenario: Countries list can populate a select

- **WHEN** the manual-entry form renders the Country control
- **THEN** the Country select SHALL be populated from `data.countries`
- **THEN** each option SHALL provide a value that can be stored in `Address.country` (e.g. the country code)

### Requirement: Regions resolver loads on demand and may be absent

When `data.regions` is provided, it SHALL be an async resolver function. For a given country code:

- if region/state data exists, the resolver SHALL resolve to a dataset that can be rendered as options in the State/Region select
- if region/state data does not exist, the resolver SHALL resolve to `undefined`

If `data.regions` is not provided, the component SHALL behave as if no country has a regions dataset.

#### Scenario: Regions resolver returns dataset for configured country

- **WHEN** the selected country is a country that has a configured regions dataset (e.g. AU)
- **THEN** `data.regions('AU')` SHALL resolve to a non-undefined dataset
- **THEN** the manual-entry form SHALL be able to render a State select populated from that dataset

#### Scenario: Regions resolver returns undefined for unconfigured country

- **WHEN** the selected country is a country that has no configured regions dataset
- **THEN** `data.regions(code)` SHALL resolve to `undefined` (or `data.regions` is absent)
- **THEN** the manual-entry form SHALL render State as a plain text input for that country

### Requirement: Library default data supports lazy loading via dynamic import

The library's default `AddressData` implementation SHOULD load regions datasets on demand (e.g. using dynamic `import()`), so that unused datasets are not required by consumers who do not need them.

#### Scenario: Default data resolves regions lazily

- **WHEN** a consumer uses `AddressInput` with the default `data` implementation
- **THEN** regions datasets for configured countries SHOULD be loaded only when needed (e.g. when the manual-entry State control needs options for a selected country)
