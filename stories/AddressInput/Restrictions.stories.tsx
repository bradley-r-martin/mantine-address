import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import { AddressInput } from '@/AddressInput';
import type { Address } from '@/types';
import { RestrictionsDemo } from './RestrictionsDemo';
import { mockProvider } from '../mocks/addressInputMocks';

const meta: Meta<typeof AddressInput> = {
  component: AddressInput,
  title: 'AddressInput/Restrictions',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Restrict which addresses are accepted via the `accept` prop (single country, optional single region). Use the **country** and **region** selects above to try different combinations (e.g. "Australia only", "NSW only", "US + California") without editing code. Manual entry and autocomplete both validate against the selected restriction.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof AddressInput>;

export const ManualEntryWithCountryRegionSelect: Story = {
  name: 'Manual entry with country/region select',
  render: () => (
    <RestrictionsDemo
      provider={
        null as unknown as ComponentProps<typeof AddressInput>['provider']
      }
      label="Address"
      placeholder="Click to enter address…"
      onChange={(address) => console.log('Address:', address)}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Manual entry only (no provider). Change the country and region dropdowns to restrict accepted addresses.\n\nUsage:\n\n```tsx\nimport { AddressInput } from 'mantine-address';\n\n<AddressInput provider={null} accept={{ country: 'AU', region: 'NSW' }} />\n```\n",
      },
    },
  },
};

export const AutocompleteWithCountryRegionSelect: Story = {
  name: 'Autocomplete with country/region select',
  render: () => (
    <RestrictionsDemo
      provider={mockProvider}
      label="Address"
      placeholder='Type "123 Main" — mock returns US address; set country to AU to see selection rejected'
      debounce={300}
      onChange={(address: Address | null) =>
        address != null && console.log('Accepted:', address)
      }
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          "With a provider, selecting a suggestion validates the resolved address against the chosen country/region.\n\nUsage:\n\n```tsx\nimport { AddressInput } from 'mantine-address';\n\n<AddressInput provider={provider} accept={{ country: 'AU' }} />\n```\n",
      },
    },
  },
};
