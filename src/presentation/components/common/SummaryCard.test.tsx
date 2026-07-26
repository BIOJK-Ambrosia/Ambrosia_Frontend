import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SummaryCard } from './SummaryCard';

describe('SummaryCard', () => {
  it('renders the label and value', () => {
    render(<SummaryCard label="Estimasi Penghematan" value="Rp 12.4M" />);

    expect(screen.getByText('Estimasi Penghematan')).toBeInTheDocument();
    expect(screen.getByText('Rp 12.4M')).toBeInTheDocument();
  });

  it('renders a trend indicator when provided', () => {
    render(<SummaryCard label="Coverage Model" value="85%" trend={{ direction: 'up', label: '5%' }} />);

    expect(screen.getByText('5%')).toBeInTheDocument();
  });

  it('renders a badge when provided', () => {
    render(<SummaryCard label="Alert Aktif" value="Prioritas Tinggi" badge="3 ALERTS" />);

    expect(screen.getByText('3 ALERTS')).toBeInTheDocument();
  });
});
