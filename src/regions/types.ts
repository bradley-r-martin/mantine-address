/** Country entry for use in a Country select (e.g. ISO 3166-1 alpha-2 code + display name). */
export interface Country {
  code: string;
  name: string;
}

/** Region (state/province) with location for autocomplete bias. Your REGIONS use this shape. */
export interface Region {
  name: string;
  abbreviation: string;
  location: {
    latitude: number;
    longitude: number;
    radius: number;
  };
}
