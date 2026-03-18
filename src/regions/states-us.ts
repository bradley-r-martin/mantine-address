import type { Country, Region } from './types';

export const UNITED_STATES: Country = { code: 'US', name: 'United States' };

export const REGIONS: Record<string, Region> = {
  ALABAMA: {
    name: 'Alabama',
    abbreviation: 'AL',
    location: { latitude: 32.3182, longitude: -86.9023, radius: 300000 },
  },
  ALASKA: {
    name: 'Alaska',
    abbreviation: 'AK',
    location: { latitude: 64.8378, longitude: -153.4937, radius: 800000 },
  },
  ARIZONA: {
    name: 'Arizona',
    abbreviation: 'AZ',
    location: { latitude: 34.0489, longitude: -111.0937, radius: 400000 },
  },
  ARKANSAS: {
    name: 'Arkansas',
    abbreviation: 'AR',
    location: { latitude: 34.7465, longitude: -92.2896, radius: 250000 },
  },
  CALIFORNIA: {
    name: 'California',
    abbreviation: 'CA',
    location: { latitude: 36.7783, longitude: -119.4179, radius: 500000 },
  },
  COLORADO: {
    name: 'Colorado',
    abbreviation: 'CO',
    location: { latitude: 39.113, longitude: -105.3111, radius: 350000 },
  },
  CONNECTICUT: {
    name: 'Connecticut',
    abbreviation: 'CT',
    location: { latitude: 41.6032, longitude: -73.0877, radius: 100000 },
  },
  DELAWARE: {
    name: 'Delaware',
    abbreviation: 'DE',
    location: { latitude: 38.9108, longitude: -75.5277, radius: 80000 },
  },
  DISTRICT_OF_COLUMBIA: {
    name: 'District of Columbia',
    abbreviation: 'DC',
    location: { latitude: 38.9072, longitude: -77.0369, radius: 30000 },
  },
  FLORIDA: {
    name: 'Florida',
    abbreviation: 'FL',
    location: { latitude: 27.6648, longitude: -81.5158, radius: 350000 },
  },
  GEORGIA: {
    name: 'Georgia',
    abbreviation: 'GA',
    location: { latitude: 32.1574, longitude: -82.9071, radius: 300000 },
  },
  HAWAII: {
    name: 'Hawaii',
    abbreviation: 'HI',
    location: { latitude: 19.8968, longitude: -155.5828, radius: 250000 },
  },
  IDAHO: {
    name: 'Idaho',
    abbreviation: 'ID',
    location: { latitude: 44.0682, longitude: -114.742, radius: 350000 },
  },
  ILLINOIS: {
    name: 'Illinois',
    abbreviation: 'IL',
    location: { latitude: 40.6331, longitude: -89.3985, radius: 300000 },
  },
  INDIANA: {
    name: 'Indiana',
    abbreviation: 'IN',
    location: { latitude: 40.2672, longitude: -86.1349, radius: 200000 },
  },
  IOWA: {
    name: 'Iowa',
    abbreviation: 'IA',
    location: { latitude: 41.878, longitude: -93.0977, radius: 250000 },
  },
  KANSAS: {
    name: 'Kansas',
    abbreviation: 'KS',
    location: { latitude: 38.5266, longitude: -96.7265, radius: 250000 },
  },
  KENTUCKY: {
    name: 'Kentucky',
    abbreviation: 'KY',
    location: { latitude: 37.6681, longitude: -84.6701, radius: 250000 },
  },
  LOUISIANA: {
    name: 'Louisiana',
    abbreviation: 'LA',
    location: { latitude: 31.1695, longitude: -91.8678, radius: 250000 },
  },
  MAINE: {
    name: 'Maine',
    abbreviation: 'ME',
    location: { latitude: 45.2538, longitude: -69.4455, radius: 250000 },
  },
  MARYLAND: {
    name: 'Maryland',
    abbreviation: 'MD',
    location: { latitude: 39.0458, longitude: -76.6413, radius: 150000 },
  },
  MASSACHUSETTS: {
    name: 'Massachusetts',
    abbreviation: 'MA',
    location: { latitude: 42.4072, longitude: -71.3824, radius: 150000 },
  },
  MICHIGAN: {
    name: 'Michigan',
    abbreviation: 'MI',
    location: { latitude: 43.3266, longitude: -84.5361, radius: 350000 },
  },
  MINNESOTA: {
    name: 'Minnesota',
    abbreviation: 'MN',
    location: { latitude: 46.7296, longitude: -94.6859, radius: 350000 },
  },
  MISSISSIPPI: {
    name: 'Mississippi',
    abbreviation: 'MS',
    location: { latitude: 32.3547, longitude: -89.3985, radius: 250000 },
  },
  MISSOURI: {
    name: 'Missouri',
    abbreviation: 'MO',
    location: { latitude: 37.9643, longitude: -91.8318, radius: 300000 },
  },
  MONTANA: {
    name: 'Montana',
    abbreviation: 'MT',
    location: { latitude: 46.8797, longitude: -110.3626, radius: 400000 },
  },
  NEBRASKA: {
    name: 'Nebraska',
    abbreviation: 'NE',
    location: { latitude: 41.4925, longitude: -99.9018, radius: 300000 },
  },
  NEVADA: {
    name: 'Nevada',
    abbreviation: 'NV',
    location: { latitude: 38.8026, longitude: -116.4194, radius: 350000 },
  },
  NEW_HAMPSHIRE: {
    name: 'New Hampshire',
    abbreviation: 'NH',
    location: { latitude: 43.1939, longitude: -71.5724, radius: 100000 },
  },
  NEW_JERSEY: {
    name: 'New Jersey',
    abbreviation: 'NJ',
    location: { latitude: 40.0583, longitude: -74.4057, radius: 120000 },
  },
  NEW_MEXICO: {
    name: 'New Mexico',
    abbreviation: 'NM',
    location: { latitude: 34.5199, longitude: -105.8701, radius: 350000 },
  },
  NEW_YORK: {
    name: 'New York',
    abbreviation: 'NY',
    location: { latitude: 43.2994, longitude: -74.2179, radius: 350000 },
  },
  NORTH_CAROLINA: {
    name: 'North Carolina',
    abbreviation: 'NC',
    location: { latitude: 35.7596, longitude: -79.0193, radius: 300000 },
  },
  NORTH_DAKOTA: {
    name: 'North Dakota',
    abbreviation: 'ND',
    location: { latitude: 47.5515, longitude: -101.002, radius: 300000 },
  },
  OHIO: {
    name: 'Ohio',
    abbreviation: 'OH',
    location: { latitude: 40.4173, longitude: -82.9071, radius: 250000 },
  },
  OKLAHOMA: {
    name: 'Oklahoma',
    abbreviation: 'OK',
    location: { latitude: 35.0078, longitude: -97.0929, radius: 300000 },
  },
  OREGON: {
    name: 'Oregon',
    abbreviation: 'OR',
    location: { latitude: 43.8041, longitude: -120.5542, radius: 350000 },
  },
  PENNSYLVANIA: {
    name: 'Pennsylvania',
    abbreviation: 'PA',
    location: { latitude: 41.2033, longitude: -77.1945, radius: 300000 },
  },
  RHODE_ISLAND: {
    name: 'Rhode Island',
    abbreviation: 'RI',
    location: { latitude: 41.5801, longitude: -71.4774, radius: 50000 },
  },
  SOUTH_CAROLINA: {
    name: 'South Carolina',
    abbreviation: 'SC',
    location: { latitude: 33.8361, longitude: -81.1637, radius: 200000 },
  },
  SOUTH_DAKOTA: {
    name: 'South Dakota',
    abbreviation: 'SD',
    location: { latitude: 43.9695, longitude: -99.9018, radius: 300000 },
  },
  TENNESSEE: {
    name: 'Tennessee',
    abbreviation: 'TN',
    location: { latitude: 35.5175, longitude: -86.5804, radius: 250000 },
  },
  TEXAS: {
    name: 'Texas',
    abbreviation: 'TX',
    location: { latitude: 31.9686, longitude: -99.9018, radius: 600000 },
  },
  UTAH: {
    name: 'Utah',
    abbreviation: 'UT',
    location: { latitude: 39.321, longitude: -111.0937, radius: 350000 },
  },
  VERMONT: {
    name: 'Vermont',
    abbreviation: 'VT',
    location: { latitude: 44.5588, longitude: -72.5778, radius: 100000 },
  },
  VIRGINIA: {
    name: 'Virginia',
    abbreviation: 'VA',
    location: { latitude: 37.4316, longitude: -78.6569, radius: 300000 },
  },
  WASHINGTON: {
    name: 'Washington',
    abbreviation: 'WA',
    location: { latitude: 47.7511, longitude: -120.7401, radius: 350000 },
  },
  WEST_VIRGINIA: {
    name: 'West Virginia',
    abbreviation: 'WV',
    location: { latitude: 38.5976, longitude: -80.4549, radius: 200000 },
  },
  WISCONSIN: {
    name: 'Wisconsin',
    abbreviation: 'WI',
    location: { latitude: 43.7844, longitude: -88.7879, radius: 300000 },
  },
  WYOMING: {
    name: 'Wyoming',
    abbreviation: 'WY',
    location: { latitude: 43.076, longitude: -107.2903, radius: 350000 },
  },
};

export default { ...UNITED_STATES, REGIONS };
