import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MantineProvider, createTheme } from '@mantine/core';
import { AddressInput } from './AddressInput';
import type { AddressLookupProvider, AddressSuggestion } from './types';

describe('MantineProvider defaultProps (factory / useProps)', () => {
  describe('AddressInput', () => {
    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
      vi.restoreAllMocks();
    });

    it('uses theme defaultProps for nothingFoundMessage when provider returns empty', async () => {
      const emptyProvider: AddressLookupProvider = {
        getSuggestions: vi.fn().mockResolvedValue([] as AddressSuggestion[]),
        getDetails: vi.fn().mockResolvedValue({}),
      };
      const theme = createTheme({
        components: {
          AddressInput: AddressInput.extend({
            defaultProps: { nothingFoundMessage: 'No addresses' },
          }),
        },
      });
      render(
        <MantineProvider theme={theme}>
          <AddressInput provider={emptyProvider} />
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
      const emptyProvider: AddressLookupProvider = {
        getSuggestions: vi.fn().mockResolvedValue([] as AddressSuggestion[]),
        getDetails: vi.fn().mockResolvedValue({}),
      };
      const theme = createTheme({
        components: {
          AddressInput: AddressInput.extend({
            defaultProps: { nothingFoundMessage: 'From theme' },
          }),
        },
      });
      render(
        <MantineProvider theme={theme}>
          <AddressInput
            provider={emptyProvider}
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

    it('uses component-level defaults when theme does not set AddressInput', async () => {
      const emptyProvider: AddressLookupProvider = {
        getSuggestions: vi.fn().mockResolvedValue([] as AddressSuggestion[]),
        getDetails: vi.fn().mockResolvedValue({}),
      };
      render(
        <MantineProvider>
          <AddressInput provider={emptyProvider} />
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
