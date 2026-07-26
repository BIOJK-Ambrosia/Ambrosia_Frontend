import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VendorPortalPage } from './VendorPortalPage';
import { useToastStore } from '@/presentation/stores/toastStore';
import { useVendorSessionStore } from '@/presentation/stores/vendorSessionStore';
import { HISTORY_ITEMS, RFQ_NOTIFICATIONS } from './mockData';

describe('VendorPortalPage', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
    useVendorSessionStore.setState({ notifications: RFQ_NOTIFICATIONS, history: HISTORY_ITEMS });
  });

  it('renders RFQ notifications and the submit form', () => {
    render(<VendorPortalPage />);

    expect(screen.getByText('Notifikasi RFQ Baru')).toBeInTheDocument();
    expect(screen.getByText('Biji Kopi Arabica Gayo (Grade A)')).toBeInTheDocument();
    expect(screen.getByText('Submit Penawaran Baru')).toBeInTheDocument();
  });

  it('removes a notification and toasts when dismissed', async () => {
    const user = userEvent.setup();
    render(<VendorPortalPage />);

    const [dismissButton] = screen.getAllByRole('button', { name: 'Abaikan' });
    await user.click(dismissButton);

    expect(screen.queryByText('Biji Kopi Arabica Gayo (Grade A)')).not.toBeInTheDocument();
    expect(useToastStore.getState().toasts[0].message).toBe('Notifikasi diabaikan');
  });

  it('blocks bid submission and shows errors when fields are empty', async () => {
    const user = userEvent.setup();
    render(<VendorPortalPage />);

    await user.click(screen.getByRole('button', { name: 'Kirim Penawaran Sekarang' }));

    expect(screen.getByText('Harga wajib diisi dan lebih dari 0')).toBeInTheDocument();
    expect(screen.getByText('Biji Kopi Arabica Gayo (Grade A)')).toBeInTheDocument();
  });

  it('submits a valid bid, moving the RFQ into the shared history store', async () => {
    const user = userEvent.setup();
    render(<VendorPortalPage />);

    await user.type(screen.getByLabelText('Harga per kg (IDR)'), '45000');
    await user.type(screen.getByLabelText('Lead Time (Hari)'), '7');
    await user.click(screen.getByRole('button', { name: 'Kirim Penawaran Sekarang' }));

    expect(screen.queryByText(/Quantity: 2,500 kg/)).not.toBeInTheDocument();
    expect(useToastStore.getState().toasts[0].message).toBe('Penawaran terkirim');
    expect(useVendorSessionStore.getState().history[0].title).toBe('Biji Kopi Arabica Gayo (Grade A)');
  });

  it('saves a draft without changing the notification list', async () => {
    const user = userEvent.setup();
    render(<VendorPortalPage />);

    await user.click(screen.getByRole('button', { name: 'Simpan Draft' }));

    expect(screen.getByText('Biji Kopi Arabica Gayo (Grade A)')).toBeInTheDocument();
    expect(useToastStore.getState().toasts[0].message).toBe('Draft disimpan');
  });
});
