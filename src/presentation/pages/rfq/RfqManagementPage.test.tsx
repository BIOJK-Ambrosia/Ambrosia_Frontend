import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RfqManagementPage } from './RfqManagementPage';
import { useToastStore } from '@/presentation/stores/toastStore';

describe('RfqManagementPage', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
  });

  it('renders the filter bar and RFQ cards', () => {
    render(<RfqManagementPage />);

    expect(screen.getByRole('button', { name: /Create New RFQ/ })).toBeInTheDocument();
    expect(screen.getByText('Steel Coil #4429')).toBeInTheDocument();
    expect(screen.getByText('Hydraulic Pumps x40')).toBeInTheDocument();
    expect(screen.getByText('Model Methodology & Prediction Integrity')).toBeInTheDocument();
  });

  it('shows the awaiting-data placeholder for RFQs without a vendor response', () => {
    render(<RfqManagementPage />);

    expect(screen.getByText('Response not yet received')).toBeInTheDocument();
    expect(screen.getByText('Waiting for quote to analyze.')).toBeInTheDocument();
  });

  it('filters the list by status', async () => {
    const user = userEvent.setup();
    render(<RfqManagementPage />);

    await user.selectOptions(screen.getByLabelText('Status'), 'Menunggu');

    expect(screen.getByText('Industrial Lubricants (Batch B)')).toBeInTheDocument();
    expect(screen.queryByText('Steel Coil #4429')).not.toBeInTheDocument();
  });

  it('filters the list by category', async () => {
    const user = userEvent.setup();
    render(<RfqManagementPage />);

    await user.selectOptions(screen.getByLabelText('Category'), 'Equipment');

    expect(screen.getByText('Hydraulic Pumps x40')).toBeInTheDocument();
    expect(screen.queryByText('Steel Coil #4429')).not.toBeInTheDocument();
  });

  it('adds a new RFQ card via the create form', async () => {
    const user = userEvent.setup();
    render(<RfqManagementPage />);

    await user.click(screen.getByRole('button', { name: /Create New RFQ/ }));
    await user.type(screen.getByPlaceholderText('Judul RFQ'), 'Kemasan Botol Kaca');
    await user.type(screen.getByPlaceholderText('Kategori'), 'Packaging');
    await user.type(screen.getByPlaceholderText('Nama Vendor'), 'PT. Kaca Nusantara');
    await user.click(screen.getByRole('button', { name: 'Simpan' }));

    expect(screen.getByText('Kemasan Botol Kaca')).toBeInTheDocument();
    expect(useToastStore.getState().toasts[0].message).toBe('RFQ baru dibuat');
  });

  it('marks a card as submitted and toasts when its primary action is clicked', async () => {
    const user = userEvent.setup();
    render(<RfqManagementPage />);

    await user.click(screen.getByRole('button', { name: 'Send Reminder' }));

    expect(useToastStore.getState().toasts[0].message).toBe(
      'Send Reminder untuk Industrial Lubricants (Batch B)'
    );
  });
});
