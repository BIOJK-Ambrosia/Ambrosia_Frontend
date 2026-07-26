import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TriggerBadge } from './TriggerBadge';

describe('TriggerBadge', () => {
  it('renders the stock-based label', () => {
    render(<TriggerBadge type="stock" />);

    expect(screen.getByText('Stock-based')).toBeInTheDocument();
  });

  it('renders the macro-based label', () => {
    render(<TriggerBadge type="macro" />);

    expect(screen.getByText('Macro-based')).toBeInTheDocument();
  });
});
