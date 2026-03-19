import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack, Text, Code } from '@mantine/core';
import { AddressInput } from '@/AddressInput';
import type { Address } from '@/types';
import { international } from '@/formatters';
import { emptyProvider } from '../mocks/addressInputMocks';
import { useState } from 'react';

const meta: Meta<typeof AddressInput> = {
  component: AddressInput,
  title: 'AddressInput/Manual entry',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Manual-entry behaviours for **AddressInput**: pre-filling the form, handling no-results, and controlling whether users can enter manually.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddressInput>;

function CountryStateDisplayStory() {
  const [address, setAddress] = useState<Address | null>(null);
  const singleLine = address ? international.toString(address) : null;
  return (
    <Stack gap="md" style={{ maxWidth: 480 }}>
      <Text size="sm" c="dimmed">
        Choose Country (e.g. Australia, United States); State is a dropdown for
        AU/US, text input for others. Submit to see the address below.
      </Text>
      <AddressInput
        {...({ provider: null } as unknown as ComponentProps<
          typeof AddressInput
        >)}
        label="Address"
        placeholder="Click to enter address manually…"
        value={address}
        onChange={setAddress}
      />
      {address != null && (
        <Stack gap="xs">
          <Text size="sm" fw={500}>
            Submitted address:
          </Text>
          <Code block>{JSON.stringify(address, null, 2)}</Code>
          {singleLine != null && (
            <>
              <Text size="sm" fw={500}>
                Formatted:
              </Text>
              <Code block>{singleLine}</Code>
            </>
          )}
        </Stack>
      )}
    </Stack>
  );
}

export const CountryStateSelect: Story = {
  name: 'Country & State (select vs text)',
  render: () => <CountryStateDisplayStory />,
  parameters: {
    docs: {
      description: {
        story:
          "Usage:\n\n```tsx\nimport { AddressInput } from 'mantine-address';\n\n<AddressInput provider={null} />\n```\n",
      },
    },
  },
};

export const DefaultAddress: Story = {
  name: 'defaultAddress (form pre-fill)',
  render: () => (
    <Stack gap="xs" style={{ maxWidth: 480 }}>
      <Text size="sm" c="dimmed">
        <Code>defaultAddress={"{{ country: 'AU', state: 'NSW' }}"}</Code> — open
        the manual modal to see Country and State pre-filled.
      </Text>
      <AddressInput
        {...({ provider: null } as unknown as ComponentProps<
          typeof AddressInput
        >)}
        defaultAddress={{ country: 'AU', state: 'NSW' }}
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
          "Usage:\n\n```tsx\nimport { AddressInput } from 'mantine-address';\n\n<AddressInput\n  provider={null}\n  defaultAddress={{ country: 'AU', state: 'NSW' }}\n/>\n```\n",
      },
    },
  },
};

export const NoResultsEnterManually: Story = {
  name: 'No results (Enter manually option)',
  args: {
    provider: emptyProvider,
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
          "Usage:\n\n```tsx\nimport { AddressInput } from 'mantine-address';\n\n<AddressInput\n  provider={provider}\n  preventManualEntry={false}\n  nothingFoundMessage='No results found'\n/>\n```\n",
      },
    },
  },
};

export const PreventManualEntry: Story = {
  name: 'preventManualEntry true',
  render: () => (
    <Stack gap="xs" style={{ maxWidth: 480 }}>
      <Text size="sm" c="dimmed">
        Provider returns no results + <Code>preventManualEntry</Code> true. No
        &quot;Enter manually&quot; option.
      </Text>
      <AddressInput
        provider={emptyProvider}
        preventManualEntry
        label="Address"
        placeholder="Type anything…"
        nothingFoundMessage="No results found"
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Usage:\n\n```tsx\nimport { AddressInput } from 'mantine-address';\n\n<AddressInput provider={provider} preventManualEntry />\n```\n",
      },
    },
  },
};

export const BringYourOwnData: Story = {
  name: 'data prop (custom countries + regions)',
  render: () => (
    <Stack gap="xs" style={{ maxWidth: 480 }}>
      <Text size="sm" c="dimmed">
        Demonstrates <Code>data</Code> prop. Country list is limited to
        Australia, and State options come from a custom async{' '}
        <Code>regions</Code> resolver.
      </Text>
      <AddressInput
        {...({ provider: null } as unknown as ComponentProps<
          typeof AddressInput
        >)}
        label="Address"
        placeholder="Click to enter address manually…"
        data={{
          countries: [{ code: 'AU', name: 'Australia' }],
          regions: async (code) =>
            code.trim().toUpperCase() === 'AU'
              ? {
                  NEW_SOUTH_WALES: {
                    name: 'New South Wales',
                    abbreviation: 'NSW',
                    location: {
                      latitude: -33.8688,
                      longitude: 151.2093,
                      radius: 1000,
                    },
                  },
                }
              : undefined,
        }}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Usage:\n\n```tsx\nimport { AddressInput, type AddressData } from 'mantine-address';\n\nconst data: AddressData = {\n  countries: [{ code: 'AU', name: 'Australia' }],\n  regions: async (code) =>\n    code.toUpperCase() === 'AU'\n      ? {\n          NEW_SOUTH_WALES: {\n            name: 'New South Wales',\n            abbreviation: 'NSW',\n            location: { latitude: -33.8688, longitude: 151.2093, radius: 1000 },\n          },\n        }\n      : undefined,\n};\n\n<AddressInput provider={null} data={data} />\n```\n",
      },
    },
  },
};

export const BringYourOwnDataWithSuburbsAndPostcodes: Story = {
  name: 'data prop (suburbs + postcodes autocomplete)',
  render: () => (
    <Stack gap="xs" style={{ maxWidth: 480 }}>
      <Text size="sm" c="dimmed">
        Demonstrates <Code>data</Code> prop with async <Code>suburbs</Code> and{' '}
        <Code>postcodes</Code>. When provided, Suburb/Postcode become
        autocomplete inputs for the selected country.
      </Text>
      <AddressInput
        {...({ provider: null } as unknown as ComponentProps<
          typeof AddressInput
        >)}
        label="Address"
        placeholder="Click to enter address manually…"
        data={{
          countries: [{ code: 'AU', name: 'Australia' }],
          suburbs: async (code) =>
            code.trim().toUpperCase() === 'AU'
              ? ['Sydney', 'Surry Hills', 'Newtown', 'Parramatta']
              : undefined,
          postcodes: async (code) =>
            code.trim().toUpperCase() === 'AU'
              ? ['2000', '2010', '2042', '2150']
              : undefined,
        }}
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Usage:\n\n```tsx\nimport { AddressInput, type AddressData } from 'mantine-address';\n\nconst data: AddressData = {\n  countries: [{ code: 'AU', name: 'Australia' }],\n  suburbs: async (code) => (code.toUpperCase() === 'AU' ? ['Sydney'] : undefined),\n  postcodes: async (code) => (code.toUpperCase() === 'AU' ? ['2000'] : undefined),\n};\n\n<AddressInput provider={null} data={data} />\n```\n",
      },
    },
  },
};
