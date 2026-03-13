# mantine-address-input

Mantine plugin providing a reusable address input component for [Mantine](https://mantine.dev) apps, with real-time address autocomplete powered by a pluggable lookup adapter.

## Install

```bash
npm install mantine-address @mantine/core react
```

## Usage

### AddressAutocomplete with Google Places

`AddressAutocomplete` wraps Mantine's `Autocomplete` and delegates address lookup to an adapter. The built-in `GooglePlacesAdapter` uses the Google Places API.

**1. Load the Google Maps script in your HTML** (before your app bundle):

```html
<script
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&libraries=places"
  async
  defer
></script>
```

> **API key security:** Restrict your key to HTTP referrers in the [Google Cloud Console](https://console.cloud.google.com/) to prevent unauthorized use.

**2. Use the component:**

```tsx
import { AddressAutocomplete, GooglePlacesAdapter } from 'mantine-address';

const adapter = new GooglePlacesAdapter({ apiKey: 'YOUR_GOOGLE_API_KEY' });

function ShippingForm() {
  return (
    <AddressAutocomplete
      adapter={adapter}
      label="Shipping address"
      placeholder="Start typing an address…"
      onAddressSelect={(address) => {
        console.log(address);
        // { streetAddress, city, state, postalCode, country }
      }}
    />
  );
}
```

### Custom adapter

Any object that satisfies `AddressLookupAdapter` works. This makes it straightforward to swap in Mapbox, HERE, or a mock for tests:

```tsx
import type {
  AddressLookupAdapter,
  AddressSuggestion,
  AddressDetails,
} from 'mantine-address';

const myAdapter: AddressLookupAdapter = {
  async getSuggestions(input: string): Promise<AddressSuggestion[]> {
    const results = await myAddressApi.autocomplete(input);
    return results.map((r) => ({
      id: r.placeId,
      label: r.fullAddress,
      // Optional: provide match offsets so the component can bold the matched portion
      matchedSubstrings: r.matchedSubstrings, // Array<{ offset: number; length: number }>
    }));
  },

  async getDetails(id: string): Promise<AddressDetails> {
    const place = await myAddressApi.details(id);
    return {
      streetAddress: place.street,
      city: place.city,
      state: place.state,
      postalCode: place.zip,
      country: place.country,
    };
  },
};

<AddressAutocomplete adapter={myAdapter} label="Address" />;
```

#### `matchedSubstrings` — highlight what the user typed

Each `AddressSuggestion` returned by `getSuggestions` may include an optional `matchedSubstrings` field:

```ts
interface AddressSuggestion {
  id: string;
  label: string;
  matchedSubstrings?: Array<{ offset: number; length: number }>;
}
```

When present, `AddressAutocomplete` renders the matching portions of each suggestion label in **bold** inside the dropdown. Adapters that don't have this data can simply omit the field — the label renders as plain text. The built-in `GooglePlacesAdapter` populates this automatically from the Google Places API response.

### Props

| Prop                               | Type                                | Default              | Description                                                                                 |
| ---------------------------------- | ----------------------------------- | -------------------- | ------------------------------------------------------------------------------------------- |
| `adapter`                          | `AddressLookupAdapter`              | required             | Lookup service adapter                                                                      |
| `onAddressSelect`                  | `(address: AddressDetails) => void` | —                    | Called when user selects a suggestion                                                       |
| `debounce`                         | `number`                            | `300`                | Milliseconds to debounce before fetching suggestions                                        |
| `nothingFoundMessage`              | `React.ReactNode`                   | `"No results found"` | Message shown in the dropdown when the adapter returns an empty array for a non-empty query |
| + all Mantine `Autocomplete` props |                                     |                      | Forwarded to the underlying `Autocomplete` (label, placeholder, error, size, etc.)          |

#### Built-in UX behaviors

- **Loading indicator** — a spinner appears inside the input while `getSuggestions` is in flight. Provide a `rightSection` prop to replace it with your own element.
- **Match highlighting** — when an `AddressSuggestion` includes `matchedSubstrings`, the matched portion of the label is rendered in bold in the dropdown.
- **No-results message** — when the adapter returns `[]` for a non-empty query and no request is in flight, `nothingFoundMessage` is shown in the dropdown.

See [Storybook](https://bradley-r-martin.github.io/mantine-address/) for live examples (published on releases).

## Development

- **Format:** `npm run format` (write) / `npm run format:check` (check)
- **Lint:** `npm run lint`
- **Test:** `npm run test`
- **Build:** `npm run build`
- **Storybook:** `npm run storybook` (dev) / `npm run build:storybook` (static build)

PRs must target the `next` branch; the PR branch name must match an OpenSpec change (e.g. `setup-library`). CI runs tests, format, lint, commit message, build, and OpenSpec checks. See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch strategy, branch naming, commits, pre-commit hooks, and releases.
