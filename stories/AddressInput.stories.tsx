/// <reference types="vite/client" />
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider, Text, Stack, Code, createTheme } from '@mantine/core';
import { AddressInput } from '@/AddressInput';
import type {
  Address,
  AddressLookupProvider,
  AddressSuggestion,
} from '@/types';
import { international, australian } from '@/formatters';
import { mockProvider, STUB_ADDRESS } from './mocks/addressInputMocks';

const meta: Meta<typeof AddressInput> = {
  component: AddressInput,
  title: 'AddressInput',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Address input with optional autocomplete. When a lookup provider is supplied, the component shows suggestions and can optionally offer "Enter manually" when there are no results. When no provider is supplied, the component operates in manual-only mode: the input is enabled and clicking or focusing opens the manual-entry modal.',
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
        'Lookup provider for autocomplete suggestions and address details. When absent, the component runs in manual-only mode.',
      table: { type: { summary: 'AddressLookupProvider' } },
    },
    preventManualEntry: {
      description:
        'When true, do not show an "Enter manually" option when the provider returns no results.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
      control: 'boolean',
    },
    onChange: {
      description:
        'Called when the user selects an address or clears the field.',
      table: { type: { summary: '(address: Address | null) => void' } },
    },
    format: {
      description: 'Optional formatter for display. E.g. format={australian}.',
      table: { type: { summary: 'AddressFormatProvider' } },
    },
    debounce: {
      description:
        'Milliseconds to debounce before calling provider.getSuggestions.',
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      table: { defaultValue: { summary: '300' } },
    },
    defaultAddress: {
      description: 'Pre-fill the manual-entry form when the modal opens.',
      table: { type: { summary: 'Partial<Address>' } },
    },
    restrictions: {
      description:
        'Restrict which addresses are accepted (country, state, postcode, suburb).',
      table: { type: { summary: 'AddressRestrictions' } },
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof AddressInput>;

export const Default: Story = {
  name: 'Autocomplete (mock provider)',
  args: {
    provider: mockProvider,
    label: 'Shipping address',
    placeholder: 'Start typing an address…',
    debounce: 300,
    onChange: (address) => console.log('onChange:', address),
  },
};

export const WithCustomDebounce: Story = {
  name: 'Custom debounce (500ms)',
  args: {
    provider: mockProvider,
    label: 'Address',
    placeholder: 'Slower debounce…',
    debounce: 500,
  },
};

export const WithError: Story = {
  name: 'With error state',
  args: {
    provider: mockProvider,
    label: 'Address',
    placeholder: 'Start typing…',
    error: 'A valid street address is required.',
  },
};

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
  name: 'Formatted address display',
  render: () => <FormattedAddressStory />,
};

function FormattersStory() {
  const [address, setAddress] = useState<Address | null>(STUB_ADDRESS);
  return (
    <Stack gap="xl">
      <Stack gap="xs">
        <Text size="sm" fw={600} c="dimmed">
          International (default)
        </Text>
        <Text size="xs" c="dimmed">
          No format prop — uses international single-line.
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
          format={'{australian}'} — state as code (e.g. VIC).
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
          Set format in the theme so every AddressInput uses it.
        </Text>
        <FormattersViaThemeDemo />
      </Stack>
    </Stack>
  );
}

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
          Both use Australian format from the theme.
        </Text>
      </Stack>
    </MantineProvider>
  );
}

export const Formatters: Story = {
  name: 'Formatters',
  render: () => <FormattersStory />,
};

export const WithThemeDefaultProps: Story = {
  name: 'Theme defaultProps',
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
  args: { provider: mockProvider },
};

export const LoadingState: Story = {
  name: 'Loading state',
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

export const WithHighlightedMatches: Story = {
  name: 'Highlighted matches',
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

export const NoResults: Story = {
  name: 'No results',
  args: {
    provider: {
      getSuggestions: async () => {
        await new Promise((r) => setTimeout(r, 200));
        return [];
      },
      getDetails: async () => ({}),
    } satisfies AddressLookupProvider,
    label: 'Address',
    placeholder: 'Type anything — no results returned…',
    debounce: 300,
  },
};
