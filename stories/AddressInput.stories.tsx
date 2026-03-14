/// <reference types="vite/client" />
import { useState, useEffect, useRef } from 'react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  MantineProvider,
  Button,
  Text,
  TextInput,
  Stack,
  Code,
  createTheme,
} from '@mantine/core';
import { AddressInput } from '@/AddressInput';
import type {
  Address,
  AddressLookupProvider,
  AddressSuggestion,
} from '@/types';
import { international, australian } from '@/formatters';
import { GooglePlacesProvider } from '@/providers/GooglePlacesProvider';

// Pre-filled at build time if the env var is set; users can override in the Controls panel.
const BUILD_TIME_KEY = import.meta.env['STORYBOOK_GOOGLE_MAPS_API_KEY'] as
  | string
  | undefined;

// --------------------------------------------------------------------------
// Mock provider used by non-Google stories
// --------------------------------------------------------------------------

const STUB_SUGGESTIONS: AddressSuggestion[] = [
  { id: 'id1', label: '123 Main St, Springfield, IL 62701, USA' },
  { id: 'id2', label: '123 Main Ave, Chicago, IL 60601, USA' },
  { id: 'id3', label: '123 Main Blvd, Peoria, IL 61602, USA' },
];

const STUB_ADDRESS: Address = {
  street_number: '123',
  street_name: 'Main St',
  suburb: 'Springfield',
  state: 'IL',
  postcode: '62701',
  country: 'US',
};

const mockProvider: AddressLookupProvider = {
  getSuggestions: async (input: string) => {
    if (!input) return [];
    await new Promise((r) => setTimeout(r, 200));
    return STUB_SUGGESTIONS.filter((s) =>
      s.label.toLowerCase().includes(input.toLowerCase())
    );
  },
  getDetails: async () => {
    await new Promise((r) => setTimeout(r, 100));
    return STUB_ADDRESS;
  },
};

// --------------------------------------------------------------------------
// Google Places story component — loads the Maps script at runtime
// --------------------------------------------------------------------------

type ScriptState = 'idle' | 'loading' | 'loaded' | 'error';

/** Module-level cache so we don't inject the script twice across story re-renders. */
const scriptCache: { state: ScriptState; key: string | null } = {
  state: 'idle',
  key: null,
};

interface GooglePlacesStoryProps {
  apiKey: string;
  debounce?: number;
  label?: string;
  placeholder?: string;
}

function GooglePlacesStory({
  apiKey,
  ...autocompleteProps
}: GooglePlacesStoryProps) {
  const [scriptState, setScriptState] = useState<ScriptState>(() => {
    // Sync with module-level cache on mount (handles Storybook hot-reload)
    if (scriptCache.state === 'loaded' && scriptCache.key === apiKey)
      return 'loaded';
    return apiKey ? 'idle' : 'idle';
  });

  const providerRef = useRef<GooglePlacesProvider | null>(null);

  useEffect(() => {
    if (!apiKey) {
      setScriptState('idle');
      return;
    }

    // Already loaded for this key
    if (scriptCache.state === 'loaded' && scriptCache.key === apiKey) {
      setScriptState('loaded');
      providerRef.current = new GooglePlacesProvider({ apiKey });
      return;
    }

    // Key changed while script was loaded with a different key — need a page reload
    if (scriptCache.state === 'loaded' && scriptCache.key !== apiKey) {
      setScriptState('error');
      return;
    }

    // Inject the script
    setScriptState('loading');
    scriptCache.state = 'loading';
    scriptCache.key = apiKey;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places`;
    script.async = true;

    script.addEventListener('load', () => {
      scriptCache.state = 'loaded';
      providerRef.current = new GooglePlacesProvider({ apiKey });
      setScriptState('loaded');
    });

    script.addEventListener('error', () => {
      scriptCache.state = 'error';
      setScriptState('error');
    });

    document.head.appendChild(script);
  }, [apiKey]);

  if (!apiKey) {
    return (
      <Stack gap="xs" p="md" style={{ maxWidth: 480 }}>
        <Text size="sm" c="dimmed">
          Paste your Google Maps API key in the <strong>Controls</strong> panel
          (below) to test live address lookup.
        </Text>
        <Text size="xs" c="dimmed">
          The key is only used in your browser — it is never sent anywhere else.
          Restrict it to <Code>http://localhost:*</Code> and the GitHub Pages
          URL for safety.
        </Text>
      </Stack>
    );
  }

  if (scriptState === 'loading') {
    return (
      <Stack gap="xs" p="md">
        <Text size="sm">Loading Google Maps…</Text>
      </Stack>
    );
  }

  if (scriptState === 'error' && scriptCache.key !== apiKey) {
    return (
      <Stack gap="xs" p="md">
        <Text size="sm" c="red">
          The Google Maps script was already loaded with a different API key.
          Reload the page and enter the new key.
        </Text>
        <Button
          size="xs"
          variant="light"
          onClick={() => window.location.reload()}
        >
          Reload page
        </Button>
      </Stack>
    );
  }

  if (scriptState === 'error') {
    return (
      <Stack gap="xs" p="md">
        <Text size="sm" c="red">
          Failed to load Google Maps. Check that your API key is valid and the{' '}
          <strong>Places API</strong> is enabled in your Google Cloud project.
        </Text>
      </Stack>
    );
  }

  if (scriptState === 'loaded' && providerRef.current) {
    return (
      <AddressInput
        provider={providerRef.current}
        label="Address (Google Places)"
        placeholder="Start typing a real address…"
        onChange={(address) =>
          address != null && console.log('[GooglePlaces] selected:', address)
        }
        {...autocompleteProps}
        style={{ maxWidth: 480 }}
      />
    );
  }

  return null;
}

// --------------------------------------------------------------------------
// Story metadata
// --------------------------------------------------------------------------

const meta: Meta<typeof AddressInput> = {
  component: AddressInput,
  title: 'AddressInput',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '**Autocomplete only.** This component supports address input via autocomplete from a lookup provider. A provider must be provided to supply suggestions; if no provider is loaded, the field is disabled and shows an error that the provider must be configured.',
      },
    },
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
  argTypes: {
    provider: {
      description:
        'Lookup provider that provides autocomplete suggestions and address details. Optional when allowsManualEntry is true (click/focus opens manual-entry modal). When allowsManualEntry is false, required; without a provider the field is disabled and shows an error. Must implement `AddressLookupProvider` (`getSuggestions`, `getDetails`).',
      table: { type: { summary: 'AddressLookupProvider' } },
    },
    allowsManualEntry: {
      description:
        'When true (default), allow setting an address via a manual-entry modal when the provider returns no results or when no provider is supplied. When false, provider is required and no manual option is shown.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
      control: 'boolean',
    },
    onChange: {
      description:
        'Called when the user selects an address or clears the field. Receives the Address or null.',
      table: { type: { summary: '(address: Address | null) => void' } },
    },
    format: {
      description:
        'Optional formatter; the component uses formatter.toString(address) for display. When omitted, the international formatter is used. E.g. format={australian}. Display-only; does not restrict which addresses can be selected.',
      table: { type: { summary: 'AddressFormatProvider' } },
    },
    debounce: {
      description:
        'Milliseconds to debounce before calling `provider.getSuggestions`. Default: 300.',
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      table: { defaultValue: { summary: '300' } },
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AddressInput>;

// --------------------------------------------------------------------------
// Stories — autocomplete only; provider required. No provider → error + disabled.
// --------------------------------------------------------------------------

/**
 * Autocomplete with a provider. The component only supports autocomplete;
 * a provider must be loaded to provide suggestions.
 */
export const Default: Story = {
  name: 'Autocomplete (provider provided)',
  args: {
    provider: mockProvider,
    label: 'Shipping address',
    placeholder: 'Start typing an address…',
    debounce: 300,
    onChange: (address) => console.log('onChange:', address),
  },
};

export const WithCustomDebounce: Story = {
  name: 'With Custom Debounce (500ms)',
  args: {
    provider: mockProvider,
    label: 'Address',
    placeholder: 'Slower debounce…',
    debounce: 500,
  },
};

export const WithError: Story = {
  name: 'With Error State',
  args: {
    provider: mockProvider,
    label: 'Address',
    placeholder: 'Start typing…',
    error: 'A valid street address is required.',
  },
};

/**
 * When no provider is loaded and manual entry is disabled, the field is disabled and
 * shows an error that the provider must be configured. Set allowsManualEntry={false}
 * to get this behavior when no provider is supplied.
 */
export const NoProviderLoaded: Story = {
  name: 'No provider loaded (error + disabled)',
  render: () => (
    <AddressInput
      {...({ provider: undefined } as unknown as ComponentProps<
        typeof AddressInput
      >)}
      allowsManualEntry={false}
      label="Address"
      placeholder="Provider required"
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'If no provider is loaded and `allowsManualEntry` is false, the field renders disabled with an error. With `allowsManualEntry` true (default), clicking the input opens the manual-entry modal instead.',
      },
    },
  },
};

/**
 * Select a suggestion to see the canonical Address formatted as single-line and envelope.
 */
function FormattedAddressStory() {
  const [address, setAddress] = useState<Address | null>(null);
  const singleLine = address ? international.toString(address) : null;
  const envelope = address
    ? international.toEnvelope(address, { uppercase: false })
    : null;
  return (
    <Stack gap="md">
      <AddressInput
        provider={mockProvider}
        label="Address"
        placeholder="Select an address…"
        value={address}
        onChange={setAddress}
      />
      {singleLine != null && (
        <Stack gap="xs">
          <Text size="sm" fw={500}>
            Single line (formatter.toString):
          </Text>
          <Code block>{singleLine}</Code>
          <Text size="sm" fw={500}>
            Envelope (formatter.toEnvelope):
          </Text>
          <Code block>{envelope ?? ''}</Code>
        </Stack>
      )}
    </Stack>
  );
}

export const WithFormattedAddressDisplay: Story = {
  name: 'With Formatted Address Display',
  render: () => <FormattedAddressStory />,
};

// --------------------------------------------------------------------------
// Formatters sub-story: international (default), australian, and via MantineProvider
// --------------------------------------------------------------------------

/**
 * Compares display formats and shows how to set a default format via the theme
 * so you don't need to pass `format` on every AddressInput.
 */
function FormattersStory() {
  const [address, setAddress] = useState<Address | null>(STUB_ADDRESS);

  return (
    <Stack gap="xl">
      <Stack gap="xs">
        <Text size="sm" fw={600} c="dimmed">
          International (default)
        </Text>
        <Text size="xs" c="dimmed">
          No <Code>format</Code> prop — uses the default international
          single-line format.
        </Text>
        <AddressInput
          provider={mockProvider}
          label="Address"
          placeholder="Select an address…"
          value={address}
          onChange={setAddress}
        />
      </Stack>

      <Stack gap="xs">
        <Text size="sm" fw={600} c="dimmed">
          Australian
        </Text>
        <Text size="xs" c="dimmed">
          <Code>format={'{australian}'}</Code> — state as code (e.g. VIC),
          comma-separated.
        </Text>
        <AddressInput
          provider={mockProvider}
          label="Address"
          placeholder="Select an address…"
          value={address}
          onChange={setAddress}
          format={australian}
        />
      </Stack>

      <Stack gap="xs">
        <Text size="sm" fw={600} c="dimmed">
          Format via MantineProvider
        </Text>
        <Text size="xs" c="dimmed">
          Set <Code>format</Code> in the theme so every AddressInput in the tree
          uses it without passing the prop.
        </Text>
        <FormattersViaThemeDemo />
      </Stack>
    </Stack>
  );
}

/**
 * Two AddressInputs inside a MantineProvider that sets default format to australian.
 * Neither input passes format — they inherit from the theme.
 */
function FormattersViaThemeDemo() {
  const theme = createTheme({
    components: {
      AddressInput: AddressInput.extend({
        defaultProps: {
          format: australian,
          label: 'Address (theme default: Australian)',
          placeholder: 'Select an address…',
        },
      }),
    },
  });

  const [address, setAddress] = useState<Address | null>(STUB_ADDRESS);

  return (
    <MantineProvider theme={theme}>
      <Stack gap="md">
        <AddressInput
          provider={mockProvider}
          value={address}
          onChange={setAddress}
        />
        <AddressInput
          provider={mockProvider}
          value={address}
          onChange={setAddress}
        />
        <Text size="xs" c="dimmed">
          Both inputs use Australian format from the theme; no{' '}
          <Code>format</Code> prop on either.
        </Text>
      </Stack>
    </MantineProvider>
  );
}

export const Formatters: Story = {
  name: 'Formatters',
  render: () => <FormattersStory />,
  parameters: {
    docs: {
      description: {
        story:
          "**International (default):** single-line format. **Australian:** state as code (e.g. VIC), comma-separated. **Via MantineProvider:** set `format` in the theme with `createTheme({ components: { AddressInput: AddressInput.extend({ defaultProps: { format: australian } }) } })` so you don't need to pass `format` on each AddressInput.",
      },
    },
  },
};

/**
 * Paste your Google Maps API key into the **apiKey** control below to test live address
 * autocomplete backed by the Google Places API.
 *
 * If `STORYBOOK_GOOGLE_MAPS_API_KEY` was set at build time the field is pre-filled.
 */
/**
 * Default props and theming via `MantineProvider` and `createTheme`.
 * The theme sets default `nothingFoundMessage` and `label` for `AddressInput`.
 * Type a query that returns no results to see the themed "No addresses" message.
 */
export const WithThemeDefaultProps: Story = {
  name: 'With theme defaultProps',
  decorators: [
    (Story) => {
      const theme = createTheme({
        components: {
          AddressInput: AddressInput.extend({
            defaultProps: {
              nothingFoundMessage: 'No addresses found',
              label: 'Address (themed)',
              placeholder: 'Type to see theme defaults…',
            },
          }),
        },
      });
      return (
        <MantineProvider theme={theme}>
          <Story />
        </MantineProvider>
      );
    },
  ],
  args: {
    provider: mockProvider,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Theme sets `nothingFoundMessage`, `label`, and `placeholder`. Type a query with no matches (e.g. "zzz") to see the themed no-results message.',
      },
    },
  },
};

/**
 * The mock provider's `getSuggestions` never resolves, so the loading
 * indicator stays visible indefinitely. Useful for inspecting the spinner UI.
 */
export const LoadingState: Story = {
  name: 'Loading State',
  args: {
    provider: {
      getSuggestions: async () => new Promise<AddressSuggestion[]>(() => {}),
      getDetails: async () => ({}),
    } satisfies AddressLookupProvider,
    label: 'Address',
    placeholder: 'Type to see loading spinner…',
    debounce: 0,
  },
};

const HIGHLIGHTED_SUGGESTIONS: AddressSuggestion[] = [
  {
    id: 'id1',
    label: '123 Main St, Springfield, IL 62701, USA',
    matchedSubstrings: [{ offset: 0, length: 8 }],
  },
  {
    id: 'id2',
    label: '123 Main Ave, Chicago, IL 60601, USA',
    matchedSubstrings: [{ offset: 0, length: 8 }],
  },
  {
    id: 'id3',
    label: '123 Main Blvd, Peoria, IL 61602, USA',
    matchedSubstrings: [{ offset: 0, length: 8 }],
  },
];

/**
 * The mock provider returns suggestions with `matchedSubstrings` populated.
 * The matched portion of each label ("123 Main") is rendered in bold.
 */
export const WithHighlightedMatches: Story = {
  name: 'With Highlighted Matches',
  args: {
    provider: {
      getSuggestions: async (input: string) => {
        if (!input) return [];
        await new Promise((r) => setTimeout(r, 150));
        return HIGHLIGHTED_SUGGESTIONS;
      },
      getDetails: async () => ({
        street_number: '123',
        street_name: 'Main St',
        suburb: 'Springfield',
        state: 'IL',
        postcode: '62701',
        country: 'US',
      }),
    } satisfies AddressLookupProvider,
    label: 'Address',
    placeholder: 'Type "123 Main" to see highlighted matches…',
    debounce: 300,
    onChange: (address) => address != null && console.log('Selected:', address),
  },
};

/**
 * The mock provider always returns an empty array, so the "No results found"
 * message appears in the dropdown after the debounce interval.
 */
export const NoResults: Story = {
  name: 'No Results',
  args: {
    provider: {
      getSuggestions: async (input: string) => {
        if (!input) return [];
        await new Promise((r) => setTimeout(r, 200));
        return [];
      },
      getDetails: async () => ({}),
    } satisfies AddressLookupProvider,
    label: 'Address',
    placeholder: 'Type anything — no results will be returned…',
    debounce: 300,
  },
};

// --------------------------------------------------------------------------
// Manual entry (allowsManualEntry)
// --------------------------------------------------------------------------

/**
 * When no provider is supplied and allowsManualEntry is true (the default),
 * the input stays enabled. Click or focus the input to open the manual-entry
 * modal and enter an address by hand.
 */
export const ManualEntryNoProvider: Story = {
  name: 'Manual entry / No provider (click opens modal)',
  render: () => (
    <Stack gap="xs" style={{ maxWidth: 480 }}>
      <Text size="sm" c="dimmed">
        No provider; <Code>allowsManualEntry</Code> defaults to true. Click the
        input to open the manual-entry modal.
      </Text>
      <AddressInput
        {...({ provider: null } as unknown as ComponentProps<
          typeof AddressInput
        >)}
        label="Address"
        placeholder="Click to enter address manually…"
        onChange={(address) => console.log('Manual address:', address)}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'With no provider and `allowsManualEntry` true (default), the input is not disabled. Clicking or focusing the input opens a modal where the user can enter address fields manually.',
      },
    },
  },
};

/** Provider that always returns no suggestions (for manual-entry demo). */
const emptyProvider: AddressLookupProvider = {
  getSuggestions: async (input: string) => {
    if (!input) return [];
    await new Promise((r) => setTimeout(r, 200));
    return [];
  },
  getDetails: async () => ({}),
};

/**
 * When the provider returns no results and allowsManualEntry is true, the
 * dropdown shows an "Enter manually" option. Select it to open the
 * manual-entry modal (optionally pre-filled with your query).
 */
export const NoResultsEnterManually: Story = {
  name: 'Manual entry / No results (Enter manually option)',
  args: {
    provider: emptyProvider,
    allowsManualEntry: true,
    label: 'Address',
    placeholder:
      'Type something — no suggestions; then choose "Enter manually"…',
    debounce: 300,
    onChange: (address: Address | null) =>
      address != null && console.log('Manual address:', address),
  },
  parameters: {
    docs: {
      description: {
        story:
          'When the provider returns no results for a non-empty query and `allowsManualEntry` is true, the dropdown shows an "Enter manually" option. Selecting it opens the manual-entry modal.',
      },
    },
  },
};

/**
 * When allowsManualEntry is false: with no provider the input is disabled and
 * shows the provider-required error; with a provider that returns no results,
 * only the "No results found" message is shown (no "Enter manually" option).
 */
function AllowsManualEntryFalseStory() {
  return (
    <Stack gap="xl" style={{ maxWidth: 480 }}>
      <Stack gap="xs">
        <Text size="sm" fw={600} c="dimmed">
          No provider + allowsManualEntry false
        </Text>
        <Text size="xs" c="dimmed">
          Input is disabled with error; no manual-entry option.
        </Text>
        <AddressInput
          {...({ provider: null } as unknown as ComponentProps<
            typeof AddressInput
          >)}
          allowsManualEntry={false}
          label="Address"
          placeholder="Provider required"
        />
      </Stack>
      <Stack gap="xs">
        <Text size="sm" fw={600} c="dimmed">
          Provider returns no results + allowsManualEntry false
        </Text>
        <Text size="xs" c="dimmed">
          Only &quot;No results found&quot; in the dropdown; no &quot;Enter
          manually&quot; option.
        </Text>
        <AddressInput
          provider={emptyProvider}
          allowsManualEntry={false}
          label="Address"
          placeholder="Type anything…"
          nothingFoundMessage="No results found"
        />
      </Stack>
    </Stack>
  );
}

export const AllowsManualEntryFalse: Story = {
  name: 'Manual entry / allowsManualEntry false',
  render: () => <AllowsManualEntryFalseStory />,
  parameters: {
    docs: {
      description: {
        story:
          'With `allowsManualEntry={false}`: (1) No provider → input disabled and shows provider-required error. (2) Provider returns no results → only the no-results message is shown, no "Enter manually" option.',
      },
    },
  },
};

// --------------------------------------------------------------------------
// Form support: controlled and uncontrolled
// --------------------------------------------------------------------------

/**
 * Controlled: parent holds state, Clear button sets address to null.
 */
function ControlledStory() {
  const [address, setAddress] = useState<Address | null>(null);
  return (
    <Stack gap="md" style={{ maxWidth: 480 }}>
      <AddressInput
        provider={mockProvider}
        label="Address (controlled)"
        placeholder="Select an address…"
        value={address}
        onChange={setAddress}
      />
      <Stack gap="xs">
        <Text size="sm" c="dimmed">
          Current value: {address ? international.toString(address) : '—'}
        </Text>
        <Button variant="light" size="xs" onClick={() => setAddress(null)}>
          Clear
        </Button>
      </Stack>
    </Stack>
  );
}

export const FormControlled: Story = {
  name: 'Form / Controlled',
  render: () => <ControlledStory />,
};

/**
 * Uncontrolled: only defaultValue, no value/onChange.
 */
export const FormUncontrolled: Story = {
  name: 'Form / Uncontrolled',
  args: {
    provider: mockProvider,
    label: 'Address (uncontrolled)',
    placeholder: 'Select an address…',
    defaultValue: null,
  },
};

// --------------------------------------------------------------------------
// Form support: Mantine form and native form
// --------------------------------------------------------------------------

/**
 * Form with address field (controlled); Reset clears the form and the address.
 * With @mantine/form you would use: value={form.values.address},
 * onChange={(address) => form.setFieldValue('address', address)}, and form.reset().
 */
function MantineFormStory() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState<Address | null>(null);
  const reset = () => {
    setName('');
    setAddress(null);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        console.log('Submit:', { name, address });
      }}
    >
      <Stack gap="md" style={{ maxWidth: 480 }}>
        <TextInput
          label="Name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />
        <AddressInput
          provider={mockProvider}
          label="Address"
          placeholder="Select an address…"
          value={address}
          onChange={setAddress}
        />
        <Stack gap="xs">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="light" onClick={reset}>
            Reset form
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

export const FormMantineForm: Story = {
  name: 'Form / With reset (Mantine form pattern)',
  render: () => <MantineFormStory />,
};

/**
 * Native form with name prop; submit shows FormData with address[suburb], etc.
 */
function NativeFormStory() {
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(
    null
  );
  return (
    <Stack gap="md" style={{ maxWidth: 480 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const data: Record<string, string> = {};
          new FormData(form).forEach((value, key) => {
            data[key] = String(value);
          });
          setSubmitted(data);
        }}
      >
        <AddressInput
          provider={mockProvider}
          name="address"
          label="Address"
          placeholder="Select an address…"
        />
        <Button type="submit" mt="md">
          Submit (log FormData)
        </Button>
      </form>
      {submitted != null && (
        <Code block>{JSON.stringify(submitted, null, 2)}</Code>
      )}
    </Stack>
  );
}

export const FormNativeForm: Story = {
  name: 'Form / Native form (hidden inputs)',
  render: () => <NativeFormStory />,
};

export const WithGooglePlacesProvider = {
  name: 'With Google Places Provider',
  render: (args: unknown) => {
    const { apiKey, debounce, label, placeholder } =
      args as GooglePlacesStoryProps;
    return (
      <GooglePlacesStory
        apiKey={apiKey}
        debounce={debounce}
        label={label}
        placeholder={placeholder}
      />
    );
  },
  args: {
    apiKey: BUILD_TIME_KEY ?? '',
    debounce: 300,
    label: undefined,
    placeholder: undefined,
  },
  argTypes: {
    apiKey: {
      name: 'Google Maps API Key',
      description:
        'Paste your Google Maps API key here. The key is only used in this browser session.',
      control: { type: 'text' },
      table: { category: 'Google Places', type: { summary: 'string' } },
    },
    debounce: {
      name: 'Debounce (ms)',
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      table: {
        category: 'AddressInput',
        defaultValue: { summary: '300' },
      },
    },
    label: {
      control: 'text',
      table: { category: 'AddressInput' },
    },
    placeholder: {
      control: 'text',
      table: { category: 'AddressInput' },
    },
  },
} satisfies StoryObj;
