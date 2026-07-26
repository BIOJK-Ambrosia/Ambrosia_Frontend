import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MethodologyNotice } from './MethodologyNotice';

describe('MethodologyNotice', () => {
  it('renders the title and content', () => {
    render(<MethodologyNotice title="Catatan Metodologi">Akurasi historis 92%.</MethodologyNotice>);

    expect(screen.getByText('Catatan Metodologi')).toBeInTheDocument();
    expect(screen.getByText('Akurasi historis 92%.')).toBeInTheDocument();
  });
});
