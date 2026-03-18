import type { Meta, StoryObj } from '@storybook/react';
import {
  MantineProvider,
  Stack,
  Text,
  Code,
  Title,
  Divider,
} from '@mantine/core';
import { international } from '@/formatters';
import type { Address } from '@/types';
import {
  fullAddress,
  minimalAddress,
  usAddress,
  withSuffix,
} from './addressFixtures';

const meta: Meta = {
  title: 'Formatting/International',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The **international** formatter converts an Address to single-line (toString) or envelope (toEnvelope) text. Region-agnostic; optional fields are omitted.',
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

type Story = StoryObj;

function FormattingDemo({
  address,
  label,
}: {
  address: Address;
  label: string;
}) {
  const single = international.toString(address);
  const envelope = international.toEnvelope(address);
  const envelopeUpper = international.toEnvelope(address, { uppercase: true });

  return (
    <Stack gap="md">
      <Text size="sm" fw={500} c="dimmed">
        {label}
      </Text>
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          formatter.toString(address)
        </Text>
        <Code block>{single || '(empty)'}</Code>
      </Stack>
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          formatter.toEnvelope(address)
        </Text>
        <Code block>{envelope || '(empty)'}</Code>
      </Stack>
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          formatter.toEnvelope(address, {'{ uppercase: true }'})
        </Text>
        <Code block>{envelopeUpper || '(empty)'}</Code>
      </Stack>
    </Stack>
  );
}

export const FullAddress: Story = {
  name: 'Full address (all fields)',
  render: () => (
    <Stack gap="xl">
      <Title order={3}>Formatting a full address</Title>
      <FormattingDemo
        address={fullAddress}
        label="Address with unit, building, level, street components, suburb, state, postcode, country."
      />
    </Stack>
  ),
};

export const MinimalAddress: Story = {
  name: 'Minimal address',
  render: () => (
    <Stack gap="xl">
      <Title order={3}>Minimal address</Title>
      <FormattingDemo
        address={minimalAddress}
        label="Only street name and suburb; optional fields omitted."
      />
    </Stack>
  ),
};

export const USAddress: Story = {
  name: 'US-style address',
  render: () => (
    <Stack gap="xl">
      <Title order={3}>US address</Title>
      <FormattingDemo
        address={usAddress}
        label="Uniform Address works for any region; formatting is region-agnostic."
      />
    </Stack>
  ),
};

export const WithStreetSuffix: Story = {
  name: 'With street suffix',
  render: () => (
    <Stack gap="xl">
      <Title order={3}>Address with street suffix</Title>
      <FormattingDemo
        address={withSuffix}
        label="street_suffix (e.g. N, S, E, W) included in street line."
      />
    </Stack>
  ),
};

export const AllVariants: Story = {
  name: 'All variants side by side',
  render: () => (
    <Stack gap="xl">
      <Title order={3}>International formatter</Title>
      <Text size="sm" c="dimmed">
        toString() and toEnvelope() on the uniform Address type. Optional fields
        are omitted.
      </Text>
      <Divider />
      <FormattingDemo address={fullAddress} label="Full (AU)" />
      <Divider />
      <FormattingDemo address={minimalAddress} label="Minimal" />
      <Divider />
      <FormattingDemo address={usAddress} label="US" />
    </Stack>
  ),
};
