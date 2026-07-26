import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UncertaintyBandChart } from './UncertaintyBandChart';

describe('UncertaintyBandChart', () => {
  it('renders the chart with a today marker and axis labels', () => {
    render(
      <UncertaintyBandChart
        bandPath="M0,0 L600,0 L600,300 L0,300 Z"
        p50Points="0,150 600,100"
        todayX={300}
        xLabels={['1 Okt', '30 Okt']}
      />,
    );

    expect(screen.getByText('HARI INI')).toBeInTheDocument();
    expect(screen.getByText('1 Okt')).toBeInTheDocument();
    expect(screen.getByText('30 Okt')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
