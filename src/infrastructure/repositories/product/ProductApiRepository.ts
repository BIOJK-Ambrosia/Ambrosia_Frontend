import type { Product } from '@/domain/product/entities/Product';
import type { ProductRepository } from '@/domain/product/repositories/ProductRepository';
import { axiosClient } from '@/infrastructure/api/axiosClient';

export class ProductApiRepository implements ProductRepository {
  async getAll(): Promise<Product[]> {
    const response = await axiosClient.get<Product[]>('/products');
    return response.data;
  }
}
