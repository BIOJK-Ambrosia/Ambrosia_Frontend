import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { BuyerLayout } from './BuyerLayout';

describe('BuyerLayout', () => {
  it('renders the sidebar, top bar, and routed content', () => {
    const router = createMemoryRouter(
      [
        {
          element: <BuyerLayout />,
          children: [{ index: true, element: <div>Page Content</div> }],
        },
      ],
      { initialEntries: ['/'] },
    );

    render(<RouterProvider router={router} />);

    expect(screen.getByText('Ambrosia Procurement')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Cari PR, Vendor, atau Alert...')).toBeInTheDocument();
    expect(screen.getByText('Page Content')).toBeInTheDocument();
  });
});
