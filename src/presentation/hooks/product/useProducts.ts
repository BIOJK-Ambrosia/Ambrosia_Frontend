import { useQuery } from '@tanstack/react-query';
import { getProductList } from '@/app/composition/productComposition';

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProductList,
  });
}
