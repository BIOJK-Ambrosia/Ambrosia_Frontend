import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LandingPage } from './LandingPage';

describe('LandingPage', () => {
  it('renders the hero and a link to login', () => {
    render(
      <MemoryRouter>
        <LandingPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Ambrosia')).toBeInTheDocument();
    expect(screen.getByText(/AI Decision Intelligence Layer/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Masuk/ })).toHaveAttribute('href', '/login');
  });
});
