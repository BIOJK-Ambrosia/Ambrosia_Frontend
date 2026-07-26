import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { SellerLayout } from './SellerLayout';

describe('SellerLayout', () => {
  it('renders the sidebar, top bar, and routed content', () => {
    const router = createMemoryRouter(
      [
        {
          element: <SellerLayout />,
          children: [{ index: true, element: <div>Page Content</div> }],
        },
      ],
      { initialEntries: ['/'] },
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByText('Seller Portal')).toBeInTheDocument();
    expect(screen.getByText(/Halo, PT Agro Industri Mandiri/)).toBeInTheDocument();
    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });
});
