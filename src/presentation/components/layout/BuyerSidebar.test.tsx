import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BuyerSidebar } from './BuyerSidebar';

describe('BuyerSidebar', () => {
  it('renders all 12 buyer navigation items', () => {
    render(
      <MemoryRouter>
        <BuyerSidebar />
      </MemoryRouter>,
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Forecasting')).toBeInTheDocument();
    expect(screen.getByText('RFQ')).toBeInTheDocument();
    expect(screen.getByText('Document Parsing')).toBeInTheDocument();
    expect(screen.getByText('ROI')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
    expect(screen.getByText('Help Center')).toBeInTheDocument();
  });

  it('marks the current route as active', () => {
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <BuyerSidebar />
      </MemoryRouter>,
    );

    expect(screen.getByText('Dashboard').closest('a')).toHaveClass('border-secondary');
  });
});
