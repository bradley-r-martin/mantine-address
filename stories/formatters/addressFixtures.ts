import type { Address } from '@/types';

export const fullAddress: Address = {
  place_id: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
  unit: '5',
  building_name: 'Tower A',
  level: '2',
  street_number: '123',
  street_name: 'Collins',
  street_type: 'St',
  suburb: 'Melbourne',
  state: 'VIC',
  postcode: '3000',
  country: 'AU',
};

export const minimalAddress: Address = {
  street_name: 'Only Street',
  suburb: 'Town',
};

export const usAddress: Address = {
  street_number: '1600',
  street_name: 'Pennsylvania Avenue',
  street_type: 'NW',
  suburb: 'Washington',
  state: 'DC',
  postcode: '20500',
  country: 'US',
};

export const withSuffix: Address = {
  street_number: '42',
  street_name: 'Main',
  street_type: 'St',
  street_suffix: 'N',
  suburb: 'Sydney',
  state: 'NSW',
  postcode: '2000',
  country: 'AU',
};
