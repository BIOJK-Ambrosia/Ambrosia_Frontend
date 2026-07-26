import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SellerDashboardPage } from './SellerDashboardPage';
import { useVendorSessionStore } from '@/presentation/stores/vendorSessionStore';
import { HISTORY_ITEMS, RFQ_NOTIFICATIONS } from './mockData';

function renderPage() {
  return render(
    <MemoryRouter>
      <SellerDashboardPage />
    </MemoryRouter>,
  );
}

describe('SellerDashboardPage', () => {
  beforeEach(() => {
    useVendorSessionStore.setState({ notifications: RFQ_NOTIFICATIONS, history: HISTORY_ITEMS });
  });

  it('renders the KPI row from the vendor session store', () => {
    renderPage();

    expect(screen.getByText('94.2/100')).toBeInTheDocument();
    expect(screen.getByText('LEVEL GOLD')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(within(screen.getByText('RFQ Pending').parentElement!).getByText('2')).toBeInTheDocument();
    expect(within(screen.getByText('Kontrak Dimenangkan').parentElement!).getByText('1')).toBeInTheDocument();
  });

  it('renders a preview of notifications and history', () => {
    renderPage();

    expect(screen.getByText('Biji Kopi Arabica Gayo (Grade A)')).toBeInTheDocument();
    expect(screen.getByText('Kontrak Tepung Terigu')).toBeInTheDocument();
  });

  it('reflects a notification dismissed elsewhere via the shared store', () => {
    useVendorSessionStore.getState().dismissNotification('notif-1');

    renderPage();

    expect(within(screen.getByText('RFQ Pending').parentElement!).getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('Biji Kopi Arabica Gayo (Grade A)')).not.toBeInTheDocument();
  });
});
