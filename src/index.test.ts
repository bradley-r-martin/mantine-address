import { describe, it, expect } from 'vitest';
import { AddressInput } from './index';

describe('library', () => {
  it('exports AddressInput', () => {
    expect(AddressInput).toBeDefined();
    expect(typeof AddressInput).toBe('function');
  });
});
