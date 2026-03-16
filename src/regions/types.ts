/** Country entry for use in a Country select (e.g. ISO 3166-1 alpha-2 code + display name). */
export interface Country {
  code: string;
  name: string;
}

/** State/territory option for use in a State select (code + display name). */
export interface StateOption {
  code: string;
  name: string;
}
