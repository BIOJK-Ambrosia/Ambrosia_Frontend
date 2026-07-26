import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { LoginPage } from './LoginPage';

function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={['/login']}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<div>Buyer Dashboard</div>} />
        <Route path="/vendor/dashboard" element={<div>Seller Dashboard</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('LoginPage', () => {
  it('renders the login form with a Buyer/Seller toggle', () => {
    renderWithRouter();

    expect(screen.getByText('Ambrosia')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buyer' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Seller' })).toBeInTheDocument();
  });

  it('blocks submission and shows errors when fields are empty', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.click(screen.getByRole('button', { name: 'Masuk' }));

    expect(screen.getByText('ID/Username wajib diisi')).toBeInTheDocument();
    expect(screen.getByText('Password wajib diisi')).toBeInTheDocument();
  });

  it('redirects to the Buyer dashboard by default after valid login', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.type(screen.getByPlaceholderText('procurement_user_1'), 'procurement_user_1');
    await user.type(screen.getByPlaceholderText('********'), 'SecretPassword123!');
    await user.click(screen.getByRole('button', { name: 'Masuk' }));

    expect(screen.getByText('Buyer Dashboard')).toBeInTheDocument();
  });

  it('redirects to the Seller dashboard when Seller is selected', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.click(screen.getByRole('button', { name: 'Seller' }));
    await user.type(screen.getByPlaceholderText('procurement_user_1'), 'vendor_cabai_1');
    await user.type(screen.getByPlaceholderText('********'), 'SecretPassword123!');
    await user.click(screen.getByRole('button', { name: 'Masuk' }));

    expect(screen.getByText('Seller Dashboard')).toBeInTheDocument();
  });
});
