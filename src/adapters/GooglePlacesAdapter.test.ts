import { describe, it, expect, vi, afterEach } from 'vitest';
import { GooglePlacesAdapter } from './GooglePlacesAdapter';

type GoogleMock = {
  maps: {
    places: {
      AutocompleteService: ReturnType<typeof vi.fn>;
      PlacesService: ReturnType<typeof vi.fn>;
      PlacesServiceStatus: { OK: string; ZERO_RESULTS: string };
    };
  };
};

function setupGoogleMock(overrides?: Partial<GoogleMock['maps']['places']>): {
  mockGetPlacePredictions: ReturnType<typeof vi.fn>;
  mockGetDetails: ReturnType<typeof vi.fn>;
} {
  const mockGetPlacePredictions = vi.fn();
  const mockGetDetails = vi.fn();

  const places: GoogleMock['maps']['places'] = {
    AutocompleteService: vi.fn(function (this: unknown) {
      void this;
      return { getPlacePredictions: mockGetPlacePredictions };
    }),
    PlacesService: vi.fn(function (this: unknown) {
      void this;
      return { getDetails: mockGetDetails };
    }),
    PlacesServiceStatus: { OK: 'OK', ZERO_RESULTS: 'ZERO_RESULTS' },
    ...overrides,
  };

  (window as Window & { google?: unknown }).google = { maps: { places } };

  return { mockGetPlacePredictions, mockGetDetails };
}

function removeGoogle(): void {
  delete (window as Window & { google?: unknown }).google;
}

describe('GooglePlacesAdapter', () => {
  afterEach(() => {
    removeGoogle();
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('creates an instance with an apiKey', () => {
      const adapter = new GooglePlacesAdapter({ apiKey: 'MY_KEY' });
      expect(adapter).toBeInstanceOf(GooglePlacesAdapter);
      expect(adapter.apiKey).toBe('MY_KEY');
    });
  });

  describe('getSuggestions', () => {
    it('returns mapped suggestions on success', async () => {
      const { mockGetPlacePredictions } = setupGoogleMock();
      mockGetPlacePredictions.mockImplementation(
        (_req: unknown, cb: (predictions: unknown, status: string) => void) => {
          cb(
            [
              {
                place_id: 'place1',
                description: '123 Main St, Springfield, IL',
              },
              { place_id: 'place2', description: '123 Main Ave, Chicago, IL' },
            ],
            'OK'
          );
        }
      );

      const adapter = new GooglePlacesAdapter({ apiKey: 'KEY' });
      const results = await adapter.getSuggestions('123 Main');

      expect(results).toHaveLength(2);
      expect(results[0]).toEqual({
        id: 'place1',
        label: '123 Main St, Springfield, IL',
        matchedSubstrings: undefined,
      });
      expect(results[1]).toEqual({
        id: 'place2',
        label: '123 Main Ave, Chicago, IL',
        matchedSubstrings: undefined,
      });
    });

    it('populates matchedSubstrings from prediction.matched_substrings', async () => {
      const { mockGetPlacePredictions } = setupGoogleMock();
      mockGetPlacePredictions.mockImplementation(
        (_req: unknown, cb: (predictions: unknown, status: string) => void) => {
          cb(
            [
              {
                place_id: 'place1',
                description: '123 Main St, Springfield, IL',
                matched_substrings: [
                  { offset: 0, length: 3 },
                  { offset: 4, length: 4 },
                ],
              },
            ],
            'OK'
          );
        }
      );

      const adapter = new GooglePlacesAdapter({ apiKey: 'KEY' });
      const results = await adapter.getSuggestions('123 Main');

      expect(results).toHaveLength(1);
      expect(results[0].matchedSubstrings).toEqual([
        { offset: 0, length: 3 },
        { offset: 4, length: 4 },
      ]);
    });

    it('returns an empty array on ZERO_RESULTS', async () => {
      const { mockGetPlacePredictions } = setupGoogleMock();
      mockGetPlacePredictions.mockImplementation(
        (_req: unknown, cb: (predictions: null, status: string) => void) => {
          cb(null, 'ZERO_RESULTS');
        }
      );

      const adapter = new GooglePlacesAdapter({ apiKey: 'KEY' });
      const results = await adapter.getSuggestions('zzzznonexistent');

      expect(results).toEqual([]);
    });

    it('rejects on API error status', async () => {
      const { mockGetPlacePredictions } = setupGoogleMock();
      mockGetPlacePredictions.mockImplementation(
        (_req: unknown, cb: (predictions: null, status: string) => void) => {
          cb(null, 'REQUEST_DENIED');
        }
      );

      const adapter = new GooglePlacesAdapter({ apiKey: 'KEY' });
      await expect(adapter.getSuggestions('test')).rejects.toThrow(
        'REQUEST_DENIED'
      );
    });

    it('returns empty array for empty input without calling API', async () => {
      setupGoogleMock();

      const adapter = new GooglePlacesAdapter({ apiKey: 'KEY' });
      const results = await adapter.getSuggestions('');

      expect(results).toEqual([]);
    });

    it('throws when google is not loaded', async () => {
      removeGoogle();

      const adapter = new GooglePlacesAdapter({ apiKey: 'KEY' });
      await expect(adapter.getSuggestions('test')).rejects.toThrow(
        'Google Maps JavaScript API is not loaded'
      );
    });
  });

  describe('getDetails', () => {
    const mockAddressComponents: google.maps.GeocoderAddressComponent[] = [
      { long_name: '123', short_name: '123', types: ['street_number'] },
      { long_name: 'Main St', short_name: 'Main St', types: ['route'] },
      {
        long_name: 'Springfield',
        short_name: 'Springfield',
        types: ['locality', 'political'],
      },
      {
        long_name: 'Illinois',
        short_name: 'IL',
        types: ['administrative_area_level_1', 'political'],
      },
      { long_name: '62701', short_name: '62701', types: ['postal_code'] },
      {
        long_name: 'United States',
        short_name: 'US',
        types: ['country', 'political'],
      },
    ];

    it('returns mapped AddressDetails on success', async () => {
      const { mockGetDetails } = setupGoogleMock();
      mockGetDetails.mockImplementation(
        (_req: unknown, cb: (result: unknown, status: string) => void) => {
          cb({ address_components: mockAddressComponents }, 'OK');
        }
      );

      const adapter = new GooglePlacesAdapter({ apiKey: 'KEY' });
      const details = await adapter.getDetails('place1');

      expect(details).toEqual({
        streetAddress: '123 Main St',
        city: 'Springfield',
        state: 'Illinois',
        postalCode: '62701',
        country: 'United States',
      });
    });

    it('rejects on non-OK status', async () => {
      const { mockGetDetails } = setupGoogleMock();
      mockGetDetails.mockImplementation(
        (_req: unknown, cb: (result: null, status: string) => void) => {
          cb(null, 'NOT_FOUND');
        }
      );

      const adapter = new GooglePlacesAdapter({ apiKey: 'KEY' });
      await expect(adapter.getDetails('bad_id')).rejects.toThrow('NOT_FOUND');
    });

    it('throws when google is not loaded', async () => {
      removeGoogle();

      const adapter = new GooglePlacesAdapter({ apiKey: 'KEY' });
      await expect(adapter.getDetails('place1')).rejects.toThrow(
        'Google Maps JavaScript API is not loaded'
      );
    });
  });
});
