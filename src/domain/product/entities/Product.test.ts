import { describe, expect, it } from 'vitest';
import { createProduct } from './Product';

describe('createProduct', () => {
  it('returns the product when valid', () => {
    const product = createProduct({ id: '1', name: 'Coffee', price: 4.5 });
    expect(product).toEqual({ id: '1', name: 'Coffee', price: 4.5 });
  });

  it('throws when price is negative', () => {
    expect(() => createProduct({ id: '1', name: 'Coffee', price: -1 })).toThrow(
      'Product price cannot be negative: received -1',
    );
  });

  it('throws when name is empty', () => {
    expect(() => createProduct({ id: '1', name: '  ', price: 4.5 })).toThrow(
      'Product name cannot be empty',
    );
  });
});
