import { describe, expect, it, vi } from 'vitest';
import type { ProductRepository } from '@/domain/product/repositories/ProductRepository';
import { createGetProductList } from './getProductList';

describe('getProductList', () => {
  it('delegates to the repository and returns its result', async () => {
    const products = [{ id: '1', name: 'Coffee', price: 4.5 }];
    const repository: ProductRepository = { getAll: vi.fn().mockResolvedValue(products) };

    const getProductList = createGetProductList(repository);
    const result = await getProductList();

    expect(repository.getAll).toHaveBeenCalledOnce();
    expect(result).toEqual(products);
  });
});
