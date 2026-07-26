import { describe, expect, it, vi } from 'vitest';
import { axiosClient } from '@/infrastructure/api/axiosClient';
import { ProductApiRepository } from './ProductApiRepository';

vi.mock('@/infrastructure/api/axiosClient', () => ({
  axiosClient: { get: vi.fn() },
}));

describe('ProductApiRepository', () => {
  it('fetches products from the /products endpoint', async () => {
    const products = [{ id: '1', name: 'Coffee', price: 4.5 }];
    vi.mocked(axiosClient.get).mockResolvedValue({ data: products });

    const repository = new ProductApiRepository();
    const result = await repository.getAll();

    expect(axiosClient.get).toHaveBeenCalledWith('/products');
    expect(result).toEqual(products);
  });
});
