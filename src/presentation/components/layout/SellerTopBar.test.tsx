import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SellerTopBar } from './SellerTopBar';

function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={['/vendor/dashboard']}>
      <Routes>
        <Route
          path="/vendor/dashboard"
          element={<SellerTopBar vendorName="PT Agro Industri Mandiri" dateLabel="Senin, 27 Juli 2026" />}
        />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

describe('SellerTopBar', () => {
  it('navigates to /login when logout is clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter();

    await user.click(screen.getByRole('button', { name: 'Logout' }));

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });
});
