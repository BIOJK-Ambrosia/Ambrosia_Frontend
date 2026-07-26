import { formatCurrency } from '@/shared/utils/formatCurrency';
import { useProducts } from '@/presentation/hooks/product/useProducts';

export function ProductListPage() {
  const { data: products, isLoading, isError } = useProducts();

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <ul className="space-y-2 p-4">
      {products?.map((product) => (
        <li key={product.id} className="rounded border p-2">
          {product.name} — {formatCurrency(product.price)}
        </li>
      ))}
    </ul>
  );
}
