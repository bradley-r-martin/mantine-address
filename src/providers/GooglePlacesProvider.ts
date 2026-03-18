import type {
  Address,
  AddressLookupProvider,
  AddressSuggestion,
  GetSuggestionsOptions,
} from '../types';

export interface GooglePlacesProviderOptions {
  apiKey: string;
}

function assertGoogleMapsLoaded(): void {
  if (
    typeof window === 'undefined' ||
    !(window as Window & { google?: { maps?: { places?: unknown } } }).google
      ?.maps?.places
  ) {
    throw new Error(
      '[GooglePlacesProvider] Google Maps JavaScript API is not loaded. ' +
        'Add the following script to your HTML before using this provider:\n' +
        '<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=places"></script>'
    );
  }
}

function mapAddressComponents(
  components: google.maps.GeocoderAddressComponent[],
  placeId?: string,
  lat?: number,
  lng?: number
): Address {
  const getLong = (type: string): string | undefined =>
    components.find((c) => c.types.includes(type))?.long_name || undefined;
  const getShort = (type: string): string | undefined =>
    components.find((c) => c.types.includes(type))?.short_name || undefined;

  // Prefer short_name for state (e.g. NSW, VIC) so it matches restriction codes and manual form.
  const stateComponent = components.find((c) =>
    c.types.includes('administrative_area_level_1')
  );
  const state =
    stateComponent?.short_name ?? stateComponent?.long_name ?? undefined;

  const address: Address = {
    place_id: placeId,
    street_number: getLong('street_number'),
    street_name: getLong('route'),
    street_type: undefined,
    street_suffix: undefined,
    suburb: getLong('locality') ?? getLong('administrative_area_level_3'),
    state,
    postcode: getLong('postal_code'),
    country: getShort('country') ?? getLong('country'),
    latitude: lat,
    longitude: lng,
  };
  return address;
}

export class GooglePlacesProvider implements AddressLookupProvider {
  readonly apiKey: string;

  constructor({ apiKey }: GooglePlacesProviderOptions) {
    this.apiKey = apiKey;
  }

  async getSuggestions(
    input: string,
    options?: GetSuggestionsOptions
  ): Promise<AddressSuggestion[]> {
    assertGoogleMapsLoaded();

    if (!input) return [];

    const service = new google.maps.places.AutocompleteService();

    const request: google.maps.places.AutocompletionRequest = {
      input,
      types: ['address'],
    };

    const accept = options?.accept;

    // Single country restriction.
    if (accept?.country) {
      const code = (
        typeof accept.country === 'string'
          ? accept.country
          : accept.country.code
      )
        .trim()
        .toLowerCase();
      if (code) {
        request.componentRestrictions = { country: [code] };
      }
    }

    // Location bias from accept.region when it provides a Region object with location.
    const region = accept?.region;
    if (region && typeof region === 'object' && region.location) {
      request.location = new google.maps.LatLng(
        region.location.latitude,
        region.location.longitude
      );
      request.radius = region.location.radius;
    }

    return new Promise((resolve, reject) => {
      service.getPlacePredictions(request, (predictions, status) => {
        if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          resolve([]);
          return;
        }
        if (
          status !== google.maps.places.PlacesServiceStatus.OK ||
          !predictions
        ) {
          reject(
            new Error(`[GooglePlacesProvider] Autocomplete error: ${status}`)
          );
          return;
        }
        resolve(
          predictions.map((p) => ({
            id: p.place_id ?? p.description,
            label: p.description,
            matchedSubstrings: p.matched_substrings?.map((ms) => ({
              offset: ms.offset,
              length: ms.length,
            })),
          }))
        );
      });
    });
  }

  async getDetails(id: string): Promise<Address> {
    assertGoogleMapsLoaded();

    const mapEl = document.createElement('div');
    const service = new google.maps.places.PlacesService(mapEl);

    return new Promise((resolve, reject) => {
      service.getDetails(
        {
          placeId: id,
          fields: ['address_components', 'geometry', 'place_id'],
        },
        (result, status) => {
          if (
            status !== google.maps.places.PlacesServiceStatus.OK ||
            !result?.address_components
          ) {
            reject(
              new Error(`[GooglePlacesProvider] Place Details error: ${status}`)
            );
            return;
          }
          const location = result.geometry?.location;
          const latValue = location?.lat;
          const lngValue = location?.lng;
          const lat =
            typeof latValue === 'number'
              ? latValue
              : typeof latValue === 'function'
                ? (latValue as () => number)()
                : undefined;
          const lng =
            typeof lngValue === 'number'
              ? lngValue
              : typeof lngValue === 'function'
                ? (lngValue as () => number)()
                : undefined;
          resolve(
            mapAddressComponents(
              result.address_components,
              result.place_id ?? id,
              lat,
              lng
            )
          );
        }
      );
    });
  }
}
