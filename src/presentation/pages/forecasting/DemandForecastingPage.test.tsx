import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DemandForecastingPage } from './DemandForecastingPage';

describe('DemandForecastingPage', () => {
  it('renders the chart header and inventory health panel', () => {
    render(<DemandForecastingPage />);

    expect(screen.getByText('Price Forecast & Demand Signal')).toBeInTheDocument();
    expect(screen.getByText('Inventory Health')).toBeInTheDocument();
    expect(screen.getByText('Hold Purchase')).toBeInTheDocument();
    expect(screen.getByText('Predictive Model Limitation Notice')).toBeInTheDocument();
  });

  it('switches the active horizon and its predicted price on click', async () => {
    const user = userEvent.setup();
    render(<DemandForecastingPage />);

    expect(screen.getByText('H+7 Outlook')).toBeInTheDocument();
    expect(screen.getByText('Rp 48.500 / kg')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'H+30' }));

    expect(screen.getByText('H+30 Outlook')).toBeInTheDocument();
    expect(screen.getByText('Rp 52.900 / kg')).toBeInTheDocument();
  });
});
