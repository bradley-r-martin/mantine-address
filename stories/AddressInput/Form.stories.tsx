import type { Meta, StoryObj } from '@storybook/react';
import {
  MantineProvider,
  Button,
  Stack,
  Text,
  TextInput,
  Code,
} from '@mantine/core';
import { AddressInput } from '@/AddressInput';
import type { Address } from '@/types';
import { international } from '@/formatters';
import { mockProvider } from '../mocks/addressInputMocks';
import { useState } from 'react';

const meta: Meta<typeof AddressInput> = {
  component: AddressInput,
  title: 'AddressInput/Usage',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Common integration patterns for **AddressInput**: controlled vs uncontrolled usage, form reset, and native form submission.',
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

export const WithError: Story = {
  name: 'With error state',
  args: {
    provider: mockProvider,
    label: 'Address',
    placeholder: 'Start typing…',
    error: 'A valid street address is required.',
  },
};

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

export const Controlled: Story = {
  name: 'Controlled',
  render: () => <ControlledStory />,
};

export const Uncontrolled: Story = {
  name: 'Uncontrolled',
  args: {
    provider: mockProvider,
    label: 'Address (uncontrolled)',
    placeholder: 'Select an address…',
    defaultValue: null,
  },
};

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

export const WithReset: Story = {
  name: 'With reset (Mantine form pattern)',
  render: () => <MantineFormStory />,
};

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

export const NativeForm: Story = {
  name: 'Native form (hidden inputs)',
  render: () => <NativeFormStory />,
};
