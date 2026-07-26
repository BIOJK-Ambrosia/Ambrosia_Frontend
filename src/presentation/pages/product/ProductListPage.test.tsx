import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductListPage } from './ProductListPage';
import { useProducts } from '@/presentation/hooks/product/useProducts';

vi.mock('@/presentation/hooks/product/useProducts');

describe('ProductListPage', () => {
  it('shows a loading state while fetching', () => {
    vi.mocked(useProducts).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as ReturnType<typeof useProducts>);

    render(<ProductListPage />);

    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('renders the product list once loaded', () => {
    vi.mocked(useProducts).mockReturnValue({
      data: [{ id: '1', name: 'Coffee', price: 4.5 }],
      isLoading: false,
      isError: false,
    } as ReturnType<typeof useProducts>);

    render(<ProductListPage />);

    expect(screen.getByText('Coffee — $4.50')).toBeInTheDocument();
  });
});
