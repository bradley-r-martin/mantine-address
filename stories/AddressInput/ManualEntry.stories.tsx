import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider, Stack, Text, Code } from '@mantine/core';
import { AddressInput } from '@/AddressInput';
import type { Address } from '@/types';
import { international } from '@/formatters';
import { emptyProvider } from '../mocks/addressInputMocks';
import { useState } from 'react';

const meta: Meta<typeof AddressInput> = {
  component: AddressInput,
  title: 'AddressInput/Manual Entry',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AddressInput>;

export const NoProvider: Story = {
  name: 'No provider (click opens modal)',
  render: () => (
    <Stack gap="xs" style={{ maxWidth: 480 }}>
      <Text size="sm" c="dimmed">
        No provider — manual-only. Click the input to open the manual-entry
        modal with all address fields.
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
};

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
};
