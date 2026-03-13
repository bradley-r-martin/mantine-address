import { describe, it, expect } from 'vitest';
import { AddressInput } from './index';

describe('library', () => {
  it('exports AddressInput', () => {
    expect(AddressInput).toBeDefined();
    // Factory component is ForwardRefExoticComponent (object with extend/withProps)
    expect(
      typeof AddressInput === 'function' || typeof AddressInput === 'object'
    ).toBe(true);
  });
});
