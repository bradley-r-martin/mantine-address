import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Stack, Text, Code } from '@mantine/core';
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
  parameters: {
    docs: {
      description: {
        story:
          "Usage:\n\n```tsx\nimport { AddressInput, AUSTRALIA } from 'mantine-address';\n\n<AddressInput\n  provider={null}\n  prefill={{ country: AUSTRALIA, state: AUSTRALIA.NEW_SOUTH_WALES }}\n/>\n```\n",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Usage:\n\n```tsx\nimport { AddressInput, AUSTRALIA } from 'mantine-address';\n\n<AddressInput provider={null} prefill={{ country: AUSTRALIA }} />\n```\n",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Usage:\n\n```tsx\nimport { AddressInput, AUSTRALIA } from 'mantine-address';\n\n<AddressInput\n  provider={null}\n  prefill={{ country: AUSTRALIA, state: AUSTRALIA.NEW_SOUTH_WALES }}\n  accept={{ country: AUSTRALIA, region: AUSTRALIA.NEW_SOUTH_WALES }}\n/>\n```\n",
      },
    },
  },
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
  parameters: {
    docs: {
      description: {
        story:
          "Usage:\n\n```tsx\nimport { AddressInput, AUSTRALIA } from 'mantine-address';\n\n<AddressInput\n  provider={provider}\n  prefill={{ country: AUSTRALIA, state: AUSTRALIA.VICTORIA }}\n/>\n```\n",
      },
    },
  },
};
