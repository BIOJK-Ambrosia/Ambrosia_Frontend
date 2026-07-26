import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { RecommendationCard } from './RecommendationCard';

describe('RecommendationCard', () => {
  it('renders the narrative and title in panel variant', () => {
    render(<RecommendationCard narrative="Harga di bawah median pasar." />);

    expect(screen.getByText('Harga di bawah median pasar.')).toBeInTheDocument();
    expect(screen.getByText('Gemini AI Recommendation')).toBeInTheDocument();
  });

  it('renders panel actions when provided', () => {
    render(
      <RecommendationCard narrative="Saran pengadaan lebih awal." actions={<span>ACCEPT SUGGESTION</span>} />,
    );

    expect(screen.getByText('ACCEPT SUGGESTION')).toBeInTheDocument();
  });

  it('renders the compact variant', () => {
    render(<RecommendationCard verdict="negotiate" narrative="12% di atas rata-rata." variant="compact" />);

    expect(screen.getByText('Negotiate')).toBeInTheDocument();
    expect(screen.getByText('12% di atas rata-rata.')).toBeInTheDocument();
  });
});
