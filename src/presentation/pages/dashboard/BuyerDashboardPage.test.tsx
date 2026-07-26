import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BuyerDashboardPage } from './BuyerDashboardPage';
import { useToastStore } from '@/presentation/stores/toastStore';

describe('BuyerDashboardPage', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
  });

  it('renders the KPI summary row and key sections', () => {
    render(<BuyerDashboardPage />);

    expect(screen.getByText('Estimasi Penghematan')).toBeInTheDocument();
    expect(screen.getByText('Rp 12.4M')).toBeInTheDocument();
    expect(screen.getByText('Tren Harga: Cabai Rawit Merah')).toBeInTheDocument();
    expect(screen.getByText('Alert Terbaru')).toBeInTheDocument();
    expect(screen.getByText('Gemini AI Recommendation')).toBeInTheDocument();
    expect(screen.getByText('Status Vendor Scorecard')).toBeInTheDocument();
  });

  it('renders each alert with its trigger badge', () => {
    render(<BuyerDashboardPage />);

    expect(screen.getByText('Cabai rawit gudang pusat: 3 hari lagi habis')).toBeInTheDocument();
    expect(screen.getAllByText('Stock-based')).toHaveLength(2);
    expect(screen.getByText('Macro-based')).toBeInTheDocument();
  });

  it('removes an alert and shows a toast when its action is clicked', async () => {
    const user = userEvent.setup();
    render(<BuyerDashboardPage />);

    await user.click(screen.getByRole('button', { name: 'Re-stock Sekarang' }));

    expect(screen.queryByText('Cabai rawit gudang pusat: 3 hari lagi habis')).not.toBeInTheDocument();
    expect(useToastStore.getState().toasts[0].message).toBe('Re-stock Sekarang dicatat');
  });

  it('hides the recommendation card when dismissed', async () => {
    const user = userEvent.setup();
    render(<BuyerDashboardPage />);

    await user.click(screen.getByRole('button', { name: 'DISMISS' }));

    expect(screen.queryByText('Gemini AI Recommendation')).not.toBeInTheDocument();
  });

  it('shows a toast when the recommendation is accepted', async () => {
    const user = userEvent.setup();
    render(<BuyerDashboardPage />);

    await user.click(screen.getByRole('button', { name: 'ACCEPT SUGGESTION' }));

    expect(useToastStore.getState().toasts[0].message).toBe('Rekomendasi diterima');
  });
});
