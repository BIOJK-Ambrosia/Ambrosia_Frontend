import { createBrowserRouter } from 'react-router-dom';
import { ProductListPage } from '@/presentation/pages/product/ProductListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductListPage />,
  },
]);
