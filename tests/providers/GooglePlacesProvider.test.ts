import { describe, it, expect, vi, afterEach } from 'vitest';
import { GooglePlacesProvider } from '@/providers/GooglePlacesProvider';

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

  const LatLng = vi.fn(function (
    this: { lat: number; lng: number },
    lat: number,
    lng: number
  ) {
    this.lat = lat;
    this.lng = lng;
  });
  (
    window as Window & {
      google?: { maps: { places: typeof places; LatLng: typeof LatLng } };
    }
  ).google = {
    maps: { places, LatLng },
  };

  return { mockGetPlacePredictions, mockGetDetails };
}

function removeGoogle(): void {
  delete (window as Window & { google?: unknown }).google;
}

describe('GooglePlacesProvider', () => {
  afterEach(() => {
    removeGoogle();
    vi.restoreAllMocks();
  });

  describe('constructor', () => {
    it('creates an instance with an apiKey', () => {
      const provider = new GooglePlacesProvider({ apiKey: 'MY_KEY' });
      expect(provider).toBeInstanceOf(GooglePlacesProvider);
      expect(provider.apiKey).toBe('MY_KEY');
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

      const provider = new GooglePlacesProvider({ apiKey: 'KEY' });
      const results = await provider.getSuggestions('123 Main');

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

      const provider = new GooglePlacesProvider({ apiKey: 'KEY' });
      const results = await provider.getSuggestions('123 Main');

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

      const provider = new GooglePlacesProvider({ apiKey: 'KEY' });
      const results = await provider.getSuggestions('zzzznonexistent');

      expect(results).toEqual([]);
    });

    it('rejects on API error status', async () => {
      const { mockGetPlacePredictions } = setupGoogleMock();
      mockGetPlacePredictions.mockImplementation(
        (_req: unknown, cb: (predictions: null, status: string) => void) => {
          cb(null, 'REQUEST_DENIED');
        }
      );

      const provider = new GooglePlacesProvider({ apiKey: 'KEY' });
      await expect(provider.getSuggestions('test')).rejects.toThrow(
        'REQUEST_DENIED'
      );
    });

    it('returns empty array for empty input without calling API', async () => {
      setupGoogleMock();

      const provider = new GooglePlacesProvider({ apiKey: 'KEY' });
      const results = await provider.getSuggestions('');

      expect(results).toEqual([]);
    });

    it('throws when google is not loaded', async () => {
      removeGoogle();

      const provider = new GooglePlacesProvider({ apiKey: 'KEY' });
      await expect(provider.getSuggestions('test')).rejects.toThrow(
        'Google Maps JavaScript API is not loaded'
      );
    });

    it('passes single country in componentRestrictions when accept.country is set', async () => {
      const { mockGetPlacePredictions } = setupGoogleMock();
      mockGetPlacePredictions.mockImplementation(
        (
          req: { componentRestrictions?: { country: string[] } },
          cb: (predictions: unknown, status: string) => void
        ) => {
          expect(req.componentRestrictions).toEqual({ country: ['au'] });
          cb([], 'OK');
        }
      );

      const provider = new GooglePlacesProvider({ apiKey: 'KEY' });
      await provider.getSuggestions('123 Main', {
        accept: { country: 'AU' },
      });

      expect(mockGetPlacePredictions).toHaveBeenCalled();
    });

    it('passes location and radius when accept.region is a Region object with location', async () => {
      const { mockGetPlacePredictions } = setupGoogleMock();
      mockGetPlacePredictions.mockImplementation(
        (
          req: { location?: { lat: number; lng: number }; radius?: number },
          cb: (predictions: unknown, status: string) => void
        ) => {
          expect(req.componentRestrictions).toEqual({ country: ['au'] });
          expect(req.location).toBeDefined();
          expect((req.location as { lat: number; lng: number }).lat).toBe(
            -33.8688
          );
          expect((req.location as { lat: number; lng: number }).lng).toBe(
            151.2093
          );
          expect(req.radius).toBe(1000);
          cb([], 'OK');
        }
      );

      const provider = new GooglePlacesProvider({ apiKey: 'KEY' });
      await provider.getSuggestions('123 Main', {
        accept: {
          country: 'AU',
          region: {
            name: 'New South Wales',
            abbreviation: 'NSW',
            location: { latitude: -33.8688, longitude: 151.2093, radius: 1000 },
          },
        },
      });

      expect(mockGetPlacePredictions).toHaveBeenCalled();
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

    it('returns mapped Address (uniform canonical shape) on success', async () => {
      const { mockGetDetails } = setupGoogleMock();
      mockGetDetails.mockImplementation(
        (_req: unknown, cb: (result: unknown, status: string) => void) => {
          cb(
            {
              address_components: mockAddressComponents,
              place_id: 'place1',
              geometry: undefined,
            },
            'OK'
          );
        }
      );

      const provider = new GooglePlacesProvider({ apiKey: 'KEY' });
      const address = await provider.getDetails('place1');

      expect(address).toEqual({
        place_id: 'place1',
        street_number: '123',
        street_name: 'Main St',
        street_type: undefined,
        street_suffix: undefined,
        suburb: 'Springfield',
        state: 'IL',
        postcode: '62701',
        country: 'US',
        latitude: undefined,
        longitude: undefined,
      });
      expect(address).not.toHaveProperty('streetAddress');
      expect(address).not.toHaveProperty('city');
      expect(address).not.toHaveProperty('postalCode');
    });

    it('rejects on non-OK status', async () => {
      const { mockGetDetails } = setupGoogleMock();
      mockGetDetails.mockImplementation(
        (_req: unknown, cb: (result: null, status: string) => void) => {
          cb(null, 'NOT_FOUND');
        }
      );

      const provider = new GooglePlacesProvider({ apiKey: 'KEY' });
      await expect(provider.getDetails('bad_id')).rejects.toThrow('NOT_FOUND');
    });

    it('throws when google is not loaded', async () => {
      removeGoogle();

      const provider = new GooglePlacesProvider({ apiKey: 'KEY' });
      await expect(provider.getDetails('place1')).rejects.toThrow(
        'Google Maps JavaScript API is not loaded'
      );
    });
  });
});
