import type {
  AddressDetails,
  AddressLookupAdapter,
  AddressSuggestion,
} from '../types';

export interface GooglePlacesAdapterOptions {
  apiKey: string;
}

function assertGoogleMapsLoaded(): void {
  if (
    typeof window === 'undefined' ||
    !(window as Window & { google?: { maps?: { places?: unknown } } }).google
      ?.maps?.places
  ) {
    throw new Error(
      '[GooglePlacesAdapter] Google Maps JavaScript API is not loaded. ' +
        'Add the following script to your HTML before using this adapter:\n' +
        '<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY&libraries=places"></script>'
    );
  }
}

function mapAddressComponents(
  components: google.maps.GeocoderAddressComponent[]
): AddressDetails {
  const get = (type: string): string | undefined =>
    components.find((c) => c.types.includes(type))?.long_name || undefined;

  const streetNumber = get('street_number') ?? '';
  const route = get('route') ?? '';
  const streetAddress =
    [streetNumber, route].filter(Boolean).join(' ') || undefined;

  return {
    streetAddress,
    city: get('locality') ?? get('administrative_area_level_3'),
    state: get('administrative_area_level_1'),
    postalCode: get('postal_code'),
    country: get('country'),
  };
}

export class GooglePlacesAdapter implements AddressLookupAdapter {
  readonly apiKey: string;

  constructor({ apiKey }: GooglePlacesAdapterOptions) {
    this.apiKey = apiKey;
  }

  async getSuggestions(input: string): Promise<AddressSuggestion[]> {
    assertGoogleMapsLoaded();

    if (!input) return [];

    const service = new google.maps.places.AutocompleteService();

    return new Promise((resolve, reject) => {
      service.getPlacePredictions(
        { input, types: ['address'] },
        (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
            resolve([]);
            return;
          }
          if (
            status !== google.maps.places.PlacesServiceStatus.OK ||
            !predictions
          ) {
            reject(
              new Error(`[GooglePlacesAdapter] Autocomplete error: ${status}`)
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
        }
      );
    });
  }

  async getDetails(id: string): Promise<AddressDetails> {
    assertGoogleMapsLoaded();

    const mapEl = document.createElement('div');
    const service = new google.maps.places.PlacesService(mapEl);

    return new Promise((resolve, reject) => {
      service.getDetails(
        { placeId: id, fields: ['address_components'] },
        (result, status) => {
          if (
            status !== google.maps.places.PlacesServiceStatus.OK ||
            !result?.address_components
          ) {
            reject(
              new Error(`[GooglePlacesAdapter] Place Details error: ${status}`)
            );
            return;
          }
          resolve(mapAddressComponents(result.address_components));
        }
      );
    });
  }
}
