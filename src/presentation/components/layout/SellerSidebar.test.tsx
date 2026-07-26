import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SellerSidebar } from './SellerSidebar';

describe('SellerSidebar', () => {
  it('renders all 5 seller navigation items', () => {
    render(
      <MemoryRouter>
        <SellerSidebar />
      </MemoryRouter>,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Notifikasi RFQ')).toBeInTheDocument();
    expect(screen.getByText('Submit Penawaran')).toBeInTheDocument();
    expect(screen.getByText('Skor & Histori Saya')).toBeInTheDocument();
    expect(screen.getByText('Status PO')).toBeInTheDocument();
  });
});
