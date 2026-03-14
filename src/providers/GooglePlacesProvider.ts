import type {
  Address,
  AddressLookupProvider,
  AddressSuggestion,
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

  const address: Address = {
    place_id: placeId,
    street_number: getLong('street_number'),
    street_name: getLong('route'),
    street_type: undefined,
    street_suffix: undefined,
    suburb: getLong('locality') ?? getLong('administrative_area_level_3'),
    state: getLong('administrative_area_level_1'),
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
        }
      );
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
