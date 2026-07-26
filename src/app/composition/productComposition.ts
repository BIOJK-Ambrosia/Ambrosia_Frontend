import { createGetProductList } from '@/application/product/use-cases/getProductList';
import { ProductApiRepository } from '@/infrastructure/repositories/product/ProductApiRepository';

const productRepository = new ProductApiRepository();

export const getProductList = createGetProductList(productRepository);
