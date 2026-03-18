import type { Meta, StoryObj } from '@storybook/react';
import {
  MantineProvider,
  Stack,
  Text,
  Code,
  Title,
  Divider,
} from '@mantine/core';
import { australian } from '@/formatters';
import type { Address } from '@/types';
import {
  fullAddress,
  minimalAddress,
  usAddress,
  withSuffix,
} from './addressFixtures';

const meta: Meta = {
  title: 'Formatting/Australian',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The **australian** formatter converts an Address to single-line or envelope text using Australian conventions: state as code (e.g. VIC), comma-separated locality. Optional fields are omitted.',
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
  const single = australian.toString(address);
  const envelope = australian.toEnvelope(address);
  const envelopeUpper = australian.toEnvelope(address, { uppercase: true });

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
        label="Address with unit, building, level, street components, suburb, state (VIC), postcode, country."
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
        label="Australian formatter applied to a US address; state/country shown as-is."
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
      <Title order={3}>Australian formatter</Title>
      <Text size="sm" c="dimmed">
        toString() and toEnvelope() with Australian conventions (state as code,
        comma-separated). Optional fields are omitted.
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
