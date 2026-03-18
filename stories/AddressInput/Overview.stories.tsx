import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider, Stack, Text, Code } from '@mantine/core';
import { AddressInput } from '@/AddressInput';
import type { Address } from '@/types';
import { international } from '@/formatters';
import { mockProvider } from '../mocks/addressInputMocks';
import { useState } from 'react';

const meta: Meta<typeof AddressInput> = {
  component: AddressInput,
  title: 'AddressInput/Overview',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Canonical examples for **AddressInput**. Start here to understand the two primary modes: autocomplete with a provider, and manual-only mode (no provider).',
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
};

export default meta;
type Story = StoryObj<typeof AddressInput>;

export const Autocomplete: Story = {
  name: 'Autocomplete (mock provider)',
  args: {
    provider: mockProvider,
    label: 'Shipping address',
    placeholder: 'Start typing an address…',
    debounce: 300,
    onChange: (address) => console.log('onChange:', address),
  },
};

function ManualOnlyStory() {
  const [address, setAddress] = useState<Address | null>(null);
  const singleLine = address ? international.toString(address) : null;

  return (
    <Stack gap="md" style={{ maxWidth: 480 }}>
      <Text size="sm" c="dimmed">
        No provider — manual-only. Click the input to open the manual-entry
        modal and submit an address.
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

export const ManualOnly: Story = {
  name: 'Manual-only (no provider)',
  render: () => <ManualOnlyStory />,
};
