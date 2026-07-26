import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { BuyerRegisterPage } from './BuyerRegisterPage';

function renderPage() {
  return render(
    <MemoryRouter>
      <BuyerRegisterPage />
    </MemoryRouter>,
  );
}

describe('BuyerRegisterPage', () => {
  it('renders the registration form', () => {
    renderPage();

    expect(screen.getByText('Registrasi Buyer')).toBeInTheDocument();
    expect(screen.getByText('Organisasi Sudah Terdaftar')).toBeInTheDocument();
  });

  it('blocks submission and shows errors when required fields are empty', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Daftar' }));

    expect(screen.getByText('Nama lengkap wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Client ID wajib diisi')).toBeInTheDocument();
    expect(screen.queryByText('Registrasi Berhasil')).not.toBeInTheDocument();
  });

  it('requires Nama Perusahaan instead of Client ID when registering a new organization', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.click(screen.getByRole('button', { name: 'Daftarkan Organisasi Baru' }));
    await user.click(screen.getByRole('button', { name: 'Daftar' }));

    expect(screen.getByText('Nama perusahaan wajib diisi')).toBeInTheDocument();
    expect(screen.queryByText('Client ID wajib diisi')).not.toBeInTheDocument();
  });

  it('shows the success screen after a valid submission', async () => {
    const user = userEvent.setup();
    renderPage();

    await user.type(screen.getByPlaceholderText('Budi Procurement'), 'Budi Procurement');
    await user.type(screen.getByPlaceholderText('procurement_user_1'), 'procurement_user_1');
    await user.type(screen.getByPlaceholderText('********'), 'SecretPassword123!');
    await user.type(screen.getByPlaceholderText('client-uuid-12345'), 'client-uuid-12345');
    await user.click(screen.getByRole('button', { name: 'Daftar' }));

    expect(screen.getByText('Registrasi Berhasil')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Ke Halaman Login/ })).toBeInTheDocument();
  });
});
