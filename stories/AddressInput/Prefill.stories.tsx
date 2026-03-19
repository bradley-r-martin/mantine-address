import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider, Stack, Text, Code } from '@mantine/core';
import { AddressInput } from '@/AddressInput';
import { AUSTRALIA } from '@/regions';
import { emptyProvider } from '../mocks/addressInputMocks';

const meta: Meta<typeof AddressInput> = {
  component: AddressInput,
  title: 'AddressInput/Prefill',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Use the **prefill** prop to pre-fill the manual-entry form with constants (e.g. `AUSTRALIA`, `AUSTRALIA.NEW_SOUTH_WALES`). Prefer constants over string codes for type safety and consistency with the `accept` prop.',
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

export const CountryAndRegionConstants: Story = {
  name: 'Country and region (constants)',
  render: () => (
    <Stack gap="xs" style={{ maxWidth: 480 }}>
      <Text size="sm" c="dimmed">
        <Code>
          prefill=
          {'{{ country: AUSTRALIA, state: AUSTRALIA.NEW_SOUTH_WALES }}'}
        </Code>{' '}
        — open the manual modal to see Australia and New South Wales pre-filled.
      </Text>
      <AddressInput
        {...({ provider: null } as unknown as ComponentProps<
          typeof AddressInput
        >)}
        prefill={{
          country: AUSTRALIA,
          state: AUSTRALIA.NEW_SOUTH_WALES,
        }}
        label="Address"
        placeholder="Click to enter address manually…"
      />
    </Stack>
  ),
};

export const CountryOnly: Story = {
  name: 'Country only',
  render: () => (
    <Stack gap="xs" style={{ maxWidth: 480 }}>
      <Text size="sm" c="dimmed">
        <Code>prefill={'{{ country: AUSTRALIA }}'}</Code> — only country is
        pre-filled; state and other fields are empty when the modal opens.
      </Text>
      <AddressInput
        {...({ provider: null } as unknown as ComponentProps<
          typeof AddressInput
        >)}
        prefill={{ country: AUSTRALIA }}
        label="Address"
        placeholder="Click to enter address manually…"
      />
    </Stack>
  ),
};

export const PrefillWithAccept: Story = {
  name: 'Prefill with accept',
  render: () => (
    <Stack gap="xs" style={{ maxWidth: 480 }}>
      <Text size="sm" c="dimmed">
        <Code>prefill</Code> and <Code>accept</Code> both use constants. Only
        Australian addresses are accepted; manual form opens with NSW
        pre-filled.
      </Text>
      <AddressInput
        {...({ provider: null } as unknown as ComponentProps<
          typeof AddressInput
        >)}
        prefill={{
          country: AUSTRALIA,
          state: AUSTRALIA.NEW_SOUTH_WALES,
        }}
        accept={{
          country: AUSTRALIA,
          region: AUSTRALIA.NEW_SOUTH_WALES,
        }}
        label="Address"
        placeholder="Click to enter address manually…"
      />
    </Stack>
  ),
};

export const PrefillWithProvider: Story = {
  name: 'Prefill with provider (no results → Enter manually)',
  render: () => (
    <Stack gap="xs" style={{ maxWidth: 480 }}>
      <Text size="sm" c="dimmed">
        With a provider that returns no results, choose &quot;Enter
        manually&quot; — the manual form opens with <Code>prefill</Code> applied
        (e.g. AU + VIC).
      </Text>
      <AddressInput
        provider={emptyProvider}
        prefill={{
          country: AUSTRALIA,
          state: AUSTRALIA.VICTORIA,
        }}
        label="Address"
        placeholder="Type then choose Enter manually…"
      />
    </Stack>
  ),
};
