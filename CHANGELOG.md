# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Breaking

- **Address type:** Replaced the flat `AddressDetails` type with a uniform canonical `Address` type. All address fields are now optional and use structured names: `street_number`, `street_name`, `suburb`, `postcode`, etc. (replacing `streetAddress`, `city`, `postalCode`). A deprecated type alias `AddressDetails = Address` is exported for one release to ease migration.
- **Adapter contract:** `AddressLookupAdapter.getDetails(id)` now returns `Promise<Address>` instead of `Promise<AddressDetails>`. Adapters must map provider responses into the canonical `Address` shape only.
- **Component callback:** `AddressAutocomplete` prop `onAddressSelect` now receives the canonical `Address` type instead of `AddressDetails`.

### Added

- **Formatting utilities:** `addressToString`, `addressToStreetString`, and `addressToEnvelopeString` for formatting the uniform `Address` to single-line, street-only, or multi-line envelope strings.
- **Australian address helpers:** Optional region-specific constants and validators (`AU_STREET_TYPES`, `AU_STATE_CODES`, `validateAustralianPostcode`, `validateAustralianAddress`, etc.) that consume the uniform `Address` for display or validation.
- **GooglePlacesAdapter:** Now returns the canonical `Address` with `place_id`, `latitude`, and `longitude` when available; requests `geometry` and `place_id` from the Places API.
