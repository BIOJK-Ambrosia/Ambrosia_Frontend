import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VendorRegistrationPage } from './VendorRegistrationPage';

describe('VendorRegistrationPage', () => {
  it('renders the registration stepper and form sections', () => {
    render(<VendorRegistrationPage />);

    expect(screen.getByText('Registrasi Vendor Baru')).toBeInTheDocument();
    expect(screen.getByText('Informasi Legalitas')).toBeInTheDocument();
    expect(screen.getByText('Kategori Komoditas')).toBeInTheDocument();
  });

  it('blocks submission and shows validation errors when the form is empty', async () => {
    const user = userEvent.setup();
    render(<VendorRegistrationPage />);

    await user.click(screen.getByRole('button', { name: 'Kirim Registrasi' }));

    expect(screen.getByText('Nama Perusahaan wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Pilih minimal 1 kategori komoditas')).toBeInTheDocument();
    expect(screen.queryByText('Menunggu Verifikasi Admin')).not.toBeInTheDocument();
  });

  it('shows the pending-verification status view after submitting a valid form', async () => {
    const user = userEvent.setup();
    render(<VendorRegistrationPage />);

    await user.type(screen.getByPlaceholderText('PT. Global Solusi Industri'), 'PT. Contoh Sejahtera');
    await user.type(screen.getByPlaceholderText('1234567890123'), '9998887776665');
    await user.type(screen.getByPlaceholderText('00.000.000.0-000.000'), '11.222.333.4-555.000');
    await user.type(screen.getByPlaceholderText('John Doe'), 'Jane Doe');
    await user.type(screen.getByPlaceholderText('+62 812 3456 7890'), '+62 811 2233 4455');
    await user.click(screen.getByRole('checkbox', { name: 'Raw Materials' }));
    await user.click(screen.getByRole('button', { name: 'Kirim Registrasi' }));

    expect(screen.getByText('Menunggu Verifikasi Admin')).toBeInTheDocument();
    expect(screen.getByText(/Ref\. ID: VEND-REG-99120-X/)).toBeInTheDocument();
  });
});
