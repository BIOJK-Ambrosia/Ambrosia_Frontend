import type { Product } from '@/domain/product/entities/Product';
import type { ProductRepository } from '@/domain/product/repositories/ProductRepository';

export function createGetProductList(repository: ProductRepository) {
  return async function getProductList(): Promise<Product[]> {
    return repository.getAll();
  };
}
