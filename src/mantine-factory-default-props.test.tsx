import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MantineProvider, createTheme } from '@mantine/core';
import { AddressInput } from './AddressInput';
import { AddressAutocomplete } from './AddressAutocomplete';
import type { AddressLookupAdapter, AddressSuggestion } from './types';

describe('MantineProvider defaultProps (factory / useProps)', () => {
  describe('AddressInput', () => {
    it('uses theme defaultProps when component has no override', () => {
      const theme = createTheme({
        components: {
          AddressInput: AddressInput.extend({
            defaultProps: { label: 'Street address' },
          }),
        },
      });
      render(
        <MantineProvider theme={theme}>
          <AddressInput />
        </MantineProvider>
      );
      expect(
        screen.getByRole('textbox', { name: 'Street address' })
      ).toBeInTheDocument();
    });

    it('explicit props override theme defaultProps', () => {
      const theme = createTheme({
        components: {
          AddressInput: AddressInput.extend({
            defaultProps: { label: 'From theme' },
          }),
        },
      });
      render(
        <MantineProvider theme={theme}>
          <AddressInput label="Custom label" />
        </MantineProvider>
      );
      expect(
        screen.getByRole('textbox', { name: 'Custom label' })
      ).toBeInTheDocument();
    });

    it('uses component-level defaults when theme does not set AddressInput', () => {
      render(
        <MantineProvider>
          <AddressInput />
        </MantineProvider>
      );
      expect(
        screen.getByRole('textbox', { name: 'Address' })
      ).toBeInTheDocument();
    });
  });

  describe('AddressAutocomplete', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
      vi.restoreAllMocks();
    });

    it('uses theme defaultProps for nothingFoundMessage when adapter returns empty', async () => {
      const emptyAdapter: AddressLookupAdapter = {
        getSuggestions: vi.fn().mockResolvedValue([] as AddressSuggestion[]),
        getDetails: vi.fn().mockResolvedValue({}),
      };
      const theme = createTheme({
        components: {
          AddressAutocomplete: AddressAutocomplete.extend({
            defaultProps: { nothingFoundMessage: 'No addresses' },
          }),
        },
      });
      render(
        <MantineProvider theme={theme}>
          <AddressAutocomplete adapter={emptyAdapter} />
        </MantineProvider>
      );
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'zzz' },
      });
      await act(async () => {
        vi.advanceTimersByTime(300);
      });
      await act(async () => {});
      expect(screen.getByText('No addresses')).toBeInTheDocument();
    });

    it('explicit props override theme defaultProps', async () => {
      const emptyAdapter: AddressLookupAdapter = {
        getSuggestions: vi.fn().mockResolvedValue([] as AddressSuggestion[]),
        getDetails: vi.fn().mockResolvedValue({}),
      };
      const theme = createTheme({
        components: {
          AddressAutocomplete: AddressAutocomplete.extend({
            defaultProps: { nothingFoundMessage: 'From theme' },
          }),
        },
      });
      render(
        <MantineProvider theme={theme}>
          <AddressAutocomplete
            adapter={emptyAdapter}
            nothingFoundMessage="From props"
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
      expect(screen.getByText('From props')).toBeInTheDocument();
    });

    it('uses component-level defaults when theme does not set AddressAutocomplete', async () => {
      const emptyAdapter: AddressLookupAdapter = {
        getSuggestions: vi.fn().mockResolvedValue([] as AddressSuggestion[]),
        getDetails: vi.fn().mockResolvedValue({}),
      };
      render(
        <MantineProvider>
          <AddressAutocomplete adapter={emptyAdapter} />
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
    });
  });
});
