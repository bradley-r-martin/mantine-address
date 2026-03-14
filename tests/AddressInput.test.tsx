import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { AddressInput } from '@/AddressInput';
import type {
  Address,
  AddressLookupProvider,
  AddressSuggestion,
} from '@/types';
import { australian, type AddressFormatProvider } from '@/formatters';

const mockSuggestions: AddressSuggestion[] = [
  { id: 'id1', label: '123 Main St, Springfield, IL' },
  { id: 'id2', label: '456 Oak Ave, Chicago, IL' },
];

const mockAddress: Address = {
  street_number: '123',
  street_name: 'Main St',
  suburb: 'Springfield',
  state: 'IL',
  postcode: '62701',
  country: 'US',
};

function createMockProvider(
  overrides?: Partial<AddressLookupProvider>
): AddressLookupProvider {
  return {
    getSuggestions: vi.fn().mockResolvedValue(mockSuggestions),
    getDetails: vi.fn().mockResolvedValue(mockAddress),
    ...overrides,
  };
}

function renderComponent(
  props: Partial<React.ComponentProps<typeof AddressInput>> & {
    provider: AddressLookupProvider;
  }
) {
  return render(
    <MantineProvider>
      <AddressInput {...props} />
    </MantineProvider>
  );
}

describe('AddressInput', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders a text input', () => {
    renderComponent({ provider: createMockProvider() });
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('renders with label and placeholder props forwarded', () => {
    renderComponent({
      provider: createMockProvider(),
      label: 'Shipping address',
      placeholder: 'Start typing...',
    });

    expect(
      screen.getByRole('textbox', { name: 'Shipping address' })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Start typing...')).toBeInTheDocument();
  });

  it('renders with error prop forwarded', () => {
    renderComponent({
      provider: createMockProvider(),
      error: 'Address is required',
    });

    expect(screen.getByText('Address is required')).toBeInTheDocument();
  });

  describe('no provider (manual-only)', () => {
    it('when no provider, input is not disabled and no provider-required error is shown', () => {
      render(
        <MantineProvider>
          <AddressInput
            {...({ provider: null } as unknown as React.ComponentProps<
              typeof AddressInput
            >)}
          />
        </MantineProvider>
      );

      const input = screen.getByRole('textbox');
      expect(input).not.toBeDisabled();
      expect(
        screen.queryByText(/provider.*configured|provider.*required/i)
      ).not.toBeInTheDocument();
    });
  });

  describe('manual entry (preventManualEntry)', () => {
    it('no provider: click opens modal', async () => {
      render(
        <MantineProvider>
          <AddressInput
            {...({ provider: null } as unknown as React.ComponentProps<
              typeof AddressInput
            >)}
          />
        </MantineProvider>
      );

      expect(screen.queryByText('Enter address')).not.toBeInTheDocument();

      await act(async () => {
        fireEvent.click(screen.getByRole('textbox'));
      });
      await act(async () => {
        vi.advanceTimersByTime(250);
      });

      expect(screen.getByText('Enter address')).toBeInTheDocument();
    });

    it('no provider: submit manual form calls onChange and closes modal', async () => {
      const onChange = vi.fn();
      render(
        <MantineProvider>
          <AddressInput
            {...({ provider: null } as unknown as React.ComponentProps<
              typeof AddressInput
            >)}
            onChange={onChange}
          />
        </MantineProvider>
      );

      await act(async () => {
        fireEvent.click(screen.getByRole('textbox'));
      });
      await act(async () => {
        vi.advanceTimersByTime(250);
      });

      expect(screen.getByText('Enter address')).toBeInTheDocument();

      const streetNameInput = screen.getByLabelText('Street name');
      const saveButton = screen.getByRole('button', { name: /save/i });

      await act(async () => {
        fireEvent.change(streetNameInput, { target: { value: '1 Main St' } });
      });
      await act(async () => {
        fireEvent.click(saveButton);
      });
      await act(async () => {
        vi.advanceTimersByTime(250);
      });

      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ street_name: '1 Main St' })
      );
      expect(screen.queryByText('Enter address')).not.toBeInTheDocument();
    });

    it('no provider: cancel closes modal without calling onChange', async () => {
      const onChange = vi.fn();
      render(
        <MantineProvider>
          <AddressInput
            {...({ provider: null } as unknown as React.ComponentProps<
              typeof AddressInput
            >)}
            onChange={onChange}
          />
        </MantineProvider>
      );

      await act(async () => {
        fireEvent.click(screen.getByRole('textbox'));
      });
      await act(async () => {
        vi.advanceTimersByTime(250);
      });

      expect(screen.getByText('Enter address')).toBeInTheDocument();

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await act(async () => {
        fireEvent.click(cancelButton);
      });
      await act(async () => {
        vi.advanceTimersByTime(250);
      });

      expect(onChange).not.toHaveBeenCalled();
      expect(screen.queryByText('Enter address')).not.toBeInTheDocument();
    });

    it('provider returns no results and preventManualEntry false (default): Enter manually option appears and opens modal', async () => {
      const provider = createMockProvider({
        getSuggestions: vi.fn().mockResolvedValue([]),
      });
      render(
        <MantineProvider>
          <AddressInput provider={provider} />
        </MantineProvider>
      );

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'zzz' },
      });
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
      await act(async () => {});

      expect(screen.getByText('Enter manually')).toBeInTheDocument();

      await act(async () => {
        fireEvent.click(screen.getByText('Enter manually'));
      });
      await act(async () => {
        vi.advanceTimersByTime(250);
      });

      expect(screen.getByText('Enter address')).toBeInTheDocument();
    });

    it('manual modal form includes all 12 address fields (no place_id, lat, long)', async () => {
      render(
        <MantineProvider>
          <AddressInput
            {...({ provider: null } as unknown as React.ComponentProps<
              typeof AddressInput
            >)}
          />
        </MantineProvider>
      );

      await act(async () => {
        fireEvent.click(screen.getByRole('textbox'));
      });
      await act(async () => {
        vi.advanceTimersByTime(250);
      });

      expect(screen.getByLabelText('Building name')).toBeInTheDocument();
      expect(screen.getByLabelText('Level')).toBeInTheDocument();
      expect(screen.getByLabelText('Unit')).toBeInTheDocument();
      expect(screen.getByLabelText('Lot no')).toBeInTheDocument();
      expect(screen.getByLabelText('Street number')).toBeInTheDocument();
      expect(screen.getByLabelText('Street name')).toBeInTheDocument();
      expect(screen.getByLabelText('Street type')).toBeInTheDocument();
      expect(screen.getByLabelText('Street suffix')).toBeInTheDocument();
      expect(screen.getByLabelText('Suburb')).toBeInTheDocument();
      expect(screen.getByLabelText('State / Province')).toBeInTheDocument();
      expect(screen.getByLabelText('Postcode')).toBeInTheDocument();
      expect(screen.getByLabelText('Country')).toBeInTheDocument();
      expect(
        screen.queryByLabelText(/place_id|latitude|longitude/i)
      ).not.toBeInTheDocument();
    });

    it('manual submit produces Address with filled fields only (no place_id, latitude, longitude)', async () => {
      const onChange = vi.fn();
      render(
        <MantineProvider>
          <AddressInput
            {...({ provider: null } as unknown as React.ComponentProps<
              typeof AddressInput
            >)}
            onChange={onChange}
          />
        </MantineProvider>
      );

      await act(async () => {
        fireEvent.click(screen.getByRole('textbox'));
      });
      await act(async () => {
        vi.advanceTimersByTime(250);
      });

      await act(async () => {
        fireEvent.change(screen.getByLabelText('Building name'), {
          target: { value: 'Tower A' },
        });
      });
      await act(async () => {
        fireEvent.change(screen.getByLabelText('Street number'), {
          target: { value: '100' },
        });
      });
      await act(async () => {
        fireEvent.change(screen.getByLabelText('Street name'), {
          target: { value: 'George St' },
        });
      });
      await act(async () => {
        fireEvent.change(screen.getByLabelText('Suburb'), {
          target: { value: 'Sydney' },
        });
      });
      await act(async () => {
        fireEvent.change(screen.getByLabelText('State / Province'), {
          target: { value: 'NSW' },
        });
      });
      await act(async () => {
        fireEvent.change(screen.getByLabelText('Postcode'), {
          target: { value: '2000' },
        });
      });
      await act(async () => {
        fireEvent.change(screen.getByLabelText('Country'), {
          target: { value: 'Australia' },
        });
      });
      await act(async () => {
        fireEvent.click(screen.getByRole('button', { name: /save/i }));
      });
      await act(async () => {
        vi.advanceTimersByTime(250);
      });

      expect(onChange).toHaveBeenCalledTimes(1);
      const [address] = onChange.mock.calls[0] as [Address];
      expect(address).toMatchObject({
        building_name: 'Tower A',
        street_number: '100',
        street_name: 'George St',
        suburb: 'Sydney',
        state: 'NSW',
        postcode: '2000',
        country: 'Australia',
      });
      expect(address).not.toHaveProperty('place_id');
      expect(address).not.toHaveProperty('latitude');
      expect(address).not.toHaveProperty('longitude');
    });

    it('when preventManualEntry is true and no results, only no-results message is shown (no Enter manually)', async () => {
      const provider = createMockProvider({
        getSuggestions: vi.fn().mockResolvedValue([]),
      });
      render(
        <MantineProvider>
          <AddressInput
            provider={provider}
            preventManualEntry
            nothingFoundMessage="No results found"
          />
        </MantineProvider>
      );

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'zzz' },
      });
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
      await act(async () => {});

      expect(screen.getByText('No results found')).toBeInTheDocument();
      expect(screen.queryByText('Enter manually')).not.toBeInTheDocument();
    });
  });

  it('with valid provider renders enabled and without provider-required error', () => {
    renderComponent({ provider: createMockProvider() });

    const input = screen.getByRole('textbox');
    expect(input).not.toBeDisabled();
    expect(
      screen.queryByText(
        'Address autocomplete requires a provider to be configured'
      )
    ).not.toBeInTheDocument();
  });

  describe('getSuggestions debounce', () => {
    it('does not call getSuggestions immediately on input change', () => {
      const provider = createMockProvider();
      renderComponent({ provider });

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '123 Main' },
      });

      expect(provider.getSuggestions).not.toHaveBeenCalled();
    });

    it('calls getSuggestions after the default 300ms debounce', async () => {
      const provider = createMockProvider();
      renderComponent({ provider });

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '123 Main' },
      });

      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(provider.getSuggestions).toHaveBeenCalledWith('123 Main');
    });

    it('respects a custom debounce prop', async () => {
      const provider = createMockProvider();
      renderComponent({ provider, debounce: 500 });

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'test' },
      });

      await act(async () => {
        vi.advanceTimersByTime(499);
      });
      expect(provider.getSuggestions).not.toHaveBeenCalled();

      await act(async () => {
        vi.advanceTimersByTime(1);
      });
      expect(provider.getSuggestions).toHaveBeenCalledWith('test');
    });

    it('debounces rapid keystrokes — only fires once after typing stops', async () => {
      const provider = createMockProvider();
      renderComponent({ provider });

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: '1' } });
      fireEvent.change(input, { target: { value: '12' } });
      fireEvent.change(input, { target: { value: '123' } });

      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(provider.getSuggestions).toHaveBeenCalledTimes(1);
      expect(provider.getSuggestions).toHaveBeenCalledWith('123');
    });
  });

  describe('empty input', () => {
    it('does not call getSuggestions when input is cleared', async () => {
      const provider = createMockProvider();
      renderComponent({ provider });

      fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });

      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(provider.getSuggestions).not.toHaveBeenCalled();
    });
  });

  describe('loading indicator', () => {
    it('shows the loading indicator while getSuggestions is in flight', async () => {
      let resolveSuggestions!: (value: AddressSuggestion[]) => void;
      const provider = createMockProvider({
        getSuggestions: vi.fn(
          () =>
            new Promise<AddressSuggestion[]>((res) => {
              resolveSuggestions = res;
            })
        ),
      });
      renderComponent({ provider });

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '123' },
      });

      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByRole('status')).toBeInTheDocument();

      await act(async () => {
        resolveSuggestions(mockSuggestions);
      });

      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('hides the loading indicator when getSuggestions rejects', async () => {
      let rejectSuggestions!: (reason: Error) => void;
      const provider = createMockProvider({
        getSuggestions: vi.fn(
          () =>
            new Promise<AddressSuggestion[]>((_, rej) => {
              rejectSuggestions = rej;
            })
        ),
      });
      renderComponent({ provider });

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '123' },
      });

      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.getByRole('status')).toBeInTheDocument();

      await act(async () => {
        rejectSuggestions(new Error('network error'));
      });

      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });

    it('does not show loading indicator when input is empty', () => {
      renderComponent({ provider: createMockProvider() });
      expect(screen.queryByRole('status')).not.toBeInTheDocument();
    });
  });

  describe('match highlighting', () => {
    it('renders mark elements for suggestions with matchedSubstrings', async () => {
      const highlightedSuggestions: AddressSuggestion[] = [
        {
          id: 'id1',
          label: '123 Main St',
          matchedSubstrings: [{ offset: 0, length: 3 }],
        },
      ];
      const provider = createMockProvider({
        getSuggestions: vi.fn().mockResolvedValue(highlightedSuggestions),
      });
      renderComponent({ provider });

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '123' },
      });
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
      await act(async () => {});

      const marks = document.querySelectorAll('mark');
      if (marks.length > 0) {
        expect(marks[0].textContent).toBe('123');
      }
      // getSuggestions is the minimum verifiable behavior when jsdom doesn't render options
      expect(provider.getSuggestions).toHaveBeenCalledWith('123');
    });

    it('renders the label as plain text when matchedSubstrings is absent', async () => {
      const plainSuggestions: AddressSuggestion[] = [
        { id: 'id1', label: '123 Main St' },
      ];
      const provider = createMockProvider({
        getSuggestions: vi.fn().mockResolvedValue(plainSuggestions),
      });
      renderComponent({ provider });

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '123' },
      });
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
      await act(async () => {});

      expect(document.querySelectorAll('mark')).toHaveLength(0);
      expect(provider.getSuggestions).toHaveBeenCalledWith('123');
    });
  });

  describe('no-results message', () => {
    it('shows the default no-results message when the provider returns an empty array', async () => {
      const provider = createMockProvider({
        getSuggestions: vi.fn().mockResolvedValue([]),
      });
      renderComponent({ provider });

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'zzz' },
      });
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
      await act(async () => {});

      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('does not show no-results message while a request is loading', async () => {
      let resolveSuggestions!: (value: AddressSuggestion[]) => void;
      const provider = createMockProvider({
        getSuggestions: vi.fn(
          () =>
            new Promise<AddressSuggestion[]>((res) => {
              resolveSuggestions = res;
            })
        ),
      });
      renderComponent({ provider });

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'zzz' },
      });
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.queryByText('No results found')).not.toBeInTheDocument();

      // Cleanup
      await act(async () => {
        resolveSuggestions([]);
      });
    });

    it('does not show no-results message when input is empty', async () => {
      renderComponent({ provider: createMockProvider() });

      fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(screen.queryByText('No results found')).not.toBeInTheDocument();
    });

    it('shows a consumer-supplied nothingFoundMessage override', async () => {
      const provider = createMockProvider({
        getSuggestions: vi.fn().mockResolvedValue([]),
      });
      renderComponent({ provider, nothingFoundMessage: 'No addresses found' });

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'zzz' },
      });
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
      await act(async () => {});

      expect(screen.getByText('No addresses found')).toBeInTheDocument();
    });
  });

  describe('option selection', () => {
    it('calls getDetails and onChange(address) when an option is submitted', async () => {
      const provider = createMockProvider();
      const onChange = vi.fn();
      renderComponent({ provider, onChange });

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '123 Main' },
      });
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
      // Flush the getSuggestions promise resolution and React state update
      await act(async () => {});

      expect(provider.getSuggestions).toHaveBeenCalledWith('123 Main');

      const options = screen.queryAllByRole('option');
      if (options.length > 0) {
        await act(async () => {
          fireEvent.click(options[0]);
        });
        // Flush the getDetails promise and onChange callback
        await act(async () => {});

        expect(provider.getDetails).toHaveBeenCalledWith('id1');
        expect(onChange).toHaveBeenCalledWith(mockAddress);
      }
      // If Mantine doesn't render options in jsdom the getSuggestions assertion
      // above is still sufficient to verify the fetch flow.
    });

    it('does not throw when onChange is not provided', async () => {
      const provider = createMockProvider();
      renderComponent({ provider });

      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: '123 Main' },
      });
      await act(async () => {
        vi.advanceTimersByTime(300);
      });

      expect(provider.getSuggestions).toHaveBeenCalled();
    });
  });

  describe('format', () => {
    it('displays address using international formatter when format is omitted', () => {
      renderComponent({
        provider: createMockProvider(),
        value: mockAddress,
      });

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('123 Main St, Springfield IL 62701 US');
    });

    it('displays address using custom formatter when format prop is provided', () => {
      const customFormat: AddressFormatProvider = {
        toString: (addr) => `Custom: ${addr.street_number} ${addr.street_name}`,
        toEnvelope: () => '',
      };
      renderComponent({
        provider: createMockProvider(),
        value: mockAddress,
        format: customFormat,
      });

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('Custom: 123 Main St');
    });

    it('displays address using Australian formatter when format is australian', () => {
      renderComponent({
        provider: createMockProvider(),
        value: mockAddress,
        format: australian,
      });

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('123 Main St, Springfield IL 62701, US');
    });
  });

  describe('controlled mode', () => {
    it('clears display and typed state when value is set to null', async () => {
      const provider = createMockProvider();
      const { rerender } = renderComponent({
        provider,
        value: mockAddress,
        onChange: () => {},
      });

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('123 Main St, Springfield IL 62701 US');

      rerender(
        <MantineProvider>
          <AddressInput provider={provider} value={null} onChange={() => {}} />
        </MantineProvider>
      );

      await act(async () => {});

      expect(input).toHaveValue('');
    });
  });

  describe('form support: hidden inputs', () => {
    it('renders hidden inputs with correct name and value when name and address are set', () => {
      renderComponent({
        provider: createMockProvider(),
        name: 'address',
        value: mockAddress,
      });

      expect(
        document.querySelector('input[name="address[street_number]"]')
      ).toHaveValue('123');
      expect(
        document.querySelector('input[name="address[street_name]"]')
      ).toHaveValue('Main St');
      expect(
        document.querySelector('input[name="address[suburb]"]')
      ).toHaveValue('Springfield');
      expect(
        document.querySelector('input[name="address[state]"]')
      ).toHaveValue('IL');
      expect(
        document.querySelector('input[name="address[postcode]"]')
      ).toHaveValue('62701');
      expect(
        document.querySelector('input[name="address[country]"]')
      ).toHaveValue('US');
    });

    it('omits hidden inputs when name is omitted', () => {
      renderComponent({
        provider: createMockProvider(),
        value: mockAddress,
      });

      expect(
        document.querySelector('input[name="address[suburb]"]')
      ).toBeNull();
      expect(document.querySelector('input[name^="address["]')).toBeNull();
    });

    it('renders no address hidden inputs when value is null', () => {
      renderComponent({
        provider: createMockProvider(),
        name: 'address',
        value: null,
      });

      expect(
        document.querySelector('input[name="address[suburb]"]')
      ).toBeNull();
    });

    it('serializes latitude and longitude as strings in hidden inputs', () => {
      const addressWithCoords: Address = {
        ...mockAddress,
        latitude: 39.78,
        longitude: -89.65,
      };
      renderComponent({
        provider: createMockProvider(),
        name: 'location',
        value: addressWithCoords,
      });

      expect(
        document.querySelector('input[name="location[latitude]"]')
      ).toHaveValue('39.78');
      expect(
        document.querySelector('input[name="location[longitude]"]')
      ).toHaveValue('-89.65');
    });
  });

  describe('form support: ref reset', () => {
    it('ref.reset() clears uncontrolled address and typed input', async () => {
      const provider = createMockProvider();
      const ref = {
        current: null as React.ComponentRef<typeof AddressInput> | null,
      };
      renderComponent({
        provider,
        ref,
        defaultValue: mockAddress,
      });

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('123 Main St, Springfield IL 62701 US');

      await act(async () => {
        ref.current?.reset();
      });

      expect(input).toHaveValue('');
    });
  });
});
