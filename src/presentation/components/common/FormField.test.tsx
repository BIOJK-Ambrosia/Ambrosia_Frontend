import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders the label and input with placeholder', () => {
    render(<FormField label="Nama" placeholder="John Doe" name="name" />);

    expect(screen.getByText('Nama')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument();
  });

  it('renders an error message when provided', () => {
    render(<FormField label="Nama" placeholder="John Doe" name="name" error="Nama wajib diisi" />);

    expect(screen.getByText('Nama wajib diisi')).toBeInTheDocument();
  });

  it('defaults to a text input, or uses the given type', () => {
    render(<FormField label="Password" placeholder="********" name="password" type="password" />);

    expect(screen.getByPlaceholderText('********')).toHaveAttribute('type', 'password');
  });
});
