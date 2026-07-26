import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DocumentParsingPage } from './DocumentParsingPage';
import { useToastStore } from '@/presentation/stores/toastStore';

describe('DocumentParsingPage', () => {
  beforeEach(() => {
    useToastStore.setState({ toasts: [] });
  });

  it('renders the document queue and extraction results', () => {
    render(<DocumentParsingPage />);

    expect(screen.getByText('Pusat Input Dokumen')).toBeInTheDocument();
    expect(screen.getByText('Inv-9982-Agro.pdf')).toBeInTheDocument();
    expect(screen.getByText('Hasil Ekstraksi')).toBeInTheDocument();
    expect(screen.getByDisplayValue('PT. Agro Industri Mandiri')).toBeInTheDocument();
    expect(screen.getByText('Rekomendasi Gemini AI')).toBeInTheDocument();
    expect(screen.getByText('Negotiate')).toBeInTheDocument();
  });

  it('renders the sticky footer actions', () => {
    render(<DocumentParsingPage />);

    expect(screen.getByRole('button', { name: 'Tolak Dokumen' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit Manual' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Setujui Data/ })).toBeInTheDocument();
  });

  it('loads a different document’s fields when selected from the queue', async () => {
    const user = userEvent.setup();
    render(<DocumentParsingPage />);

    await user.click(screen.getByText('Quotation_Sumatera_Steel.pdf'));

    expect(screen.getByDisplayValue('PT. Sumatera Steel Jaya')).toBeInTheDocument();
  });

  it('removes the active document and auto-selects the next one on approval', async () => {
    const user = userEvent.setup();
    render(<DocumentParsingPage />);

    await user.click(screen.getByRole('button', { name: /Setujui Data/ }));

    expect(screen.queryByText('Inv-9982-Agro.pdf')).not.toBeInTheDocument();
    expect(screen.getByDisplayValue('PT. Sumatera Steel Jaya')).toBeInTheDocument();
    expect(useToastStore.getState().toasts[0].message).toBe('Dokumen disetujui');
  });

  it('toggles extraction fields from read-only to editable', async () => {
    const user = userEvent.setup();
    render(<DocumentParsingPage />);

    expect(screen.getByDisplayValue('PT. Agro Industri Mandiri')).toHaveAttribute('readonly');

    await user.click(screen.getByRole('button', { name: 'Edit Manual' }));

    expect(screen.getByDisplayValue('PT. Agro Industri Mandiri')).not.toHaveAttribute('readonly');
  });
});
