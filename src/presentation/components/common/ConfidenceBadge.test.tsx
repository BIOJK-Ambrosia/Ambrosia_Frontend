import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ConfidenceBadge } from './ConfidenceBadge';

describe('ConfidenceBadge', () => {
  it('renders the confidence level and percentage', () => {
    render(<ConfidenceBadge level="high" percentage={98} />);

    expect(screen.getByText(/High/)).toBeInTheDocument();
    expect(screen.getByText(/98%/)).toBeInTheDocument();
  });

  it('renders the low-confidence variant', () => {
    render(<ConfidenceBadge level="low" percentage={42} />);

    expect(screen.getByText(/Low/)).toBeInTheDocument();
  });
});
