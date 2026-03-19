import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider, createTheme } from '@mantine/core';
import { AddressInput } from '@/AddressInput';
import { mockProvider } from '../mocks/addressInputMocks';

/**
 * Nested theme so the preview does not depend on Storybook's root MantineProvider.
 * Same pattern consumers use at the app root.
 */
const demoTheme = createTheme({
  components: {
    AddressInput: {
      defaultProps: {
        provider: mockProvider,
        label: 'Address',
        placeholder: 'Start typing an address…',
        debounce: 300,
      },
    },
  },
});

function WithGlobalAddressInputDefaults() {
  return (
    <MantineProvider theme={demoTheme}>
      {/* provider (and other defaults) come from theme.components.AddressInput.defaultProps */}
      <AddressInput />
    </MantineProvider>
  );
}

const meta = {
  title: 'AddressInput/Global defaults',
  parameters: {
    docs: {
      description: {
        component:
          'Supply a shared **provider** and other **AddressInput** defaults once via `MantineProvider` and `theme.components.AddressInput.defaultProps`. Instance props still override theme defaults.',
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const ViaMantineTheme: Story = {
  name: 'Defaults via MantineProvider theme',
  render: () => <WithGlobalAddressInputDefaults />,
};
