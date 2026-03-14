## RENAMED Requirements

- **FROM:** Interface name `AddressFormatAdapter`
- **TO:** `AddressFormatProvider`

- **FROM:** Terminology "adapter" / "formatter" in requirement text where it refers to the interface
- **TO:** "provider" for the interface; "formatter" remains for the prop/display role where used in the existing spec

## MODIFIED Requirements

### Requirement: Address format provider interface is defined

The library SHALL define an interface `AddressFormatProvider` with a single method `format(address: Address): string` (or equivalent, e.g. `toString(address: Address): string`) that returns a display string for the given uniform `Address`. The interface SHALL be the sole contract for address display formatting used by the component.

#### Scenario: Interface is exported

- **WHEN** a consumer imports the type from the package
- **THEN** `AddressFormatProvider` is available and describes an object with the format/display method for addresses

#### Scenario: Custom formatter implements interface

- **WHEN** a consumer provides an object implementing `AddressFormatProvider` (e.g. `{ toString(address) { return address.street_name ?? ''; } }`) as the format prop
- **THEN** the component uses that object to format the selected address for display without error

---

### Requirement: Default international formatter is provided and used when formatter is omitted

The library SHALL provide a built-in **international** formatter instance (e.g. `international`) that formats any `Address` into a single-line string using a consistent international convention. When the component is rendered without a `format` prop, the component SHALL use this international formatter for display.

#### Scenario: No formatter prop

- **WHEN** a consumer renders the address component with a lookup provider and no `format` prop
- **THEN** the selected address is displayed using the international formatter

#### Scenario: International formatter is exported

- **WHEN** a consumer imports the international formatter from the package
- **THEN** they may pass it explicitly as the `format` prop or use it elsewhere to format addresses

---

### Requirement: Australian formatter is provided

The library SHALL provide a built-in Australian formatter instance (e.g. `australian`) that formats an `Address` according to Australian display conventions. The formatter SHALL accept any `Address`; it does not restrict or validate the address's country.

#### Scenario: Australian formatter used for display

- **WHEN** a consumer renders the address component with a lookup provider and `format={australian}` and the user selects an address
- **THEN** the displayed value is formatted using Australian conventions

#### Scenario: Australian formatter is exported

- **WHEN** a consumer imports the australian formatter from the package
- **THEN** they may pass it as the `format` prop to get Australian-style display

---

### Requirement: Formatter is display-only

The format prop SHALL affect only how the selected address is displayed in the input. It SHALL NOT restrict which addresses can be selected, SHALL NOT validate the address by country, and SHALL NOT filter suggestions.

#### Scenario: Non-AU address with Australian formatter

- **WHEN** the consumer uses the Australian format provider and the user selects a US address
- **THEN** the address is displayed using the Australian formatter's rules; the component does not reject or alter the selected address data
