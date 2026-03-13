import type { Meta, StoryObj } from '@storybook/react';
import {
  MantineProvider,
  Stack,
  Text,
  Code,
  Title,
  Table,
  Badge,
  Group,
} from '@mantine/core';
import type { Address } from '../types';
import {
  AU_STREET_TYPES,
  AU_STREET_SUFFIXES,
  AU_STATE_NAMES_TO_CODES,
  validateAustralianPostcode,
  isAustralianAddress,
  formatAustralianState,
  validateAustralianState,
  validateAustralianAddress,
} from './australian-address';

const meta: Meta = {
  title: 'Australian Address',
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

type Story = StoryObj;

export const StreetTypes: Story = {
  name: 'AU_STREET_TYPES',
  render: () => {
    const entries = Object.entries(AU_STREET_TYPES).slice(0, 24);
    return (
      <Stack gap="md">
        <Title order={3}>Australian street type mapping</Title>
        <Text size="sm" c="dimmed">
          Full name → abbreviation for region-specific display. Consumes the
          uniform Address; use in transformers when formatting for AU.
        </Text>
        <Table withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Full name</Table.Th>
              <Table.Th>Abbreviation</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {entries.map(([full, abbr]) => (
              <Table.Tr key={full}>
                <Table.Td>{full}</Table.Td>
                <Table.Td>
                  <Code>{abbr}</Code>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
        <Text size="xs" c="dimmed">
          (Showing first 24; total {Object.keys(AU_STREET_TYPES).length}{' '}
          mappings)
        </Text>
      </Stack>
    );
  },
};

export const StreetSuffixes: Story = {
  name: 'AU_STREET_SUFFIXES',
  render: () => (
    <Stack gap="md">
      <Title order={3}>Australian street suffixes</Title>
      <Text size="sm" c="dimmed">
        Cardinal and ordinal directions for street lines (e.g. Main St N).
      </Text>
      <Group gap="xs">
        {AU_STREET_SUFFIXES.map((s) => (
          <Badge key={s} variant="light">
            {s}
          </Badge>
        ))}
      </Group>
    </Stack>
  ),
};

export const StateCodes: Story = {
  name: 'AU_STATE_CODES and names',
  render: () => (
    <Stack gap="md">
      <Title order={3}>Australian state / territory codes</Title>
      <Text size="sm" c="dimmed">
        AU_STATE_CODES and AU_STATE_NAMES_TO_CODES for validation and
        formatAustralianState.
      </Text>
      <Table withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Code</Table.Th>
            <Table.Th>Full name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {Object.entries(AU_STATE_NAMES_TO_CODES).map(([name, code]) => (
            <Table.Tr key={code}>
              <Table.Td>
                <Code>{code}</Code>
              </Table.Td>
              <Table.Td>{name}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Stack>
  ),
};

function ValidationDemo({ address }: { address: Address }) {
  const isAU = isAustralianAddress(address);
  const postcodeValid = validateAustralianPostcode(address);
  const stateValid = validateAustralianState(address);
  const validation = validateAustralianAddress(address);
  const stateFormatted = formatAustralianState(address);

  return (
    <Stack gap="sm">
      <Code block>{JSON.stringify(address, null, 2)}</Code>
      <Group gap="md">
        <Text size="sm">
          isAustralianAddress:{' '}
          <Badge color={isAU ? 'green' : 'gray'}>{String(isAU)}</Badge>
        </Text>
        {isAU && (
          <>
            <Text size="sm">
              postcode valid:{' '}
              <Badge color={postcodeValid ? 'green' : 'red'}>
                {String(postcodeValid)}
              </Badge>
            </Text>
            <Text size="sm">
              state valid:{' '}
              <Badge color={stateValid ? 'green' : 'red'}>
                {String(stateValid)}
              </Badge>
            </Text>
            <Text size="sm">
              formatAustralianState: <Code>{stateFormatted ?? '—'}</Code>
            </Text>
            <Text size="sm">
              validateAustralianAddress.valid:{' '}
              <Badge color={validation.valid ? 'green' : 'red'}>
                {String(validation.valid)}
              </Badge>
            </Text>
          </>
        )}
      </Group>
    </Stack>
  );
}

export const ValidationValidAU: Story = {
  name: 'Validation — valid AU address',
  render: () => (
    <Stack gap="xl">
      <Title order={3}>Australian validation helpers</Title>
      <Text size="sm" c="dimmed">
        validateAustralianPostcode, validateAustralianState,
        validateAustralianAddress. Input: uniform Address.
      </Text>
      <ValidationDemo
        address={{
          suburb: 'Sydney',
          state: 'NSW',
          postcode: '2000',
          country: 'AU',
        }}
      />
    </Stack>
  ),
};

export const ValidationInvalidPostcode: Story = {
  name: 'Validation — invalid postcode',
  render: () => (
    <Stack gap="xl">
      <Title order={3}>Invalid Australian postcode</Title>
      <Text size="sm" c="dimmed">
        Postcode must be 4 digits. State is valid (NSW).
      </Text>
      <ValidationDemo
        address={{
          suburb: 'Melbourne',
          state: 'VIC',
          postcode: '300',
          country: 'AU',
        }}
      />
    </Stack>
  ),
};

export const ValidationNonAU: Story = {
  name: 'Validation — non-AU address',
  render: () => (
    <Stack gap="xl">
      <Title order={3}>Non-Australian address</Title>
      <Text size="sm" c="dimmed">
        validateAustralianAddress returns valid: true for non-AU (no AU rules
        applied).
      </Text>
      <ValidationDemo
        address={{
          suburb: 'Springfield',
          state: 'IL',
          postcode: '62701',
          country: 'US',
        }}
      />
    </Stack>
  ),
};

export const FormatState: Story = {
  name: 'formatAustralianState',
  render: () => (
    <Stack gap="md">
      <Title order={3}>formatAustralianState</Title>
      <Text size="sm" c="dimmed">
        Converts full state name to code when possible. Input: uniform Address.
      </Text>
      <Stack gap="xs">
        <Text size="sm">
          state &quot;New South Wales&quot; →{' '}
          <Code>
            {formatAustralianState({ state: 'New South Wales' }) ?? '—'}
          </Code>
        </Text>
        <Text size="sm">
          state &quot;NSW&quot; →{' '}
          <Code>{formatAustralianState({ state: 'NSW' }) ?? '—'}</Code>
        </Text>
        <Text size="sm">
          state &quot;Victoria&quot; →{' '}
          <Code>{formatAustralianState({ state: 'Victoria' }) ?? '—'}</Code>
        </Text>
      </Stack>
    </Stack>
  ),
};
