import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { WeatherChartCard } from './WeatherChartCard';

vi.mock('@components/SmoothChart', () => ({
  SmoothChart: vi.fn(() => <div data-testid="smooth-chart" />),
}));

describe('WeatherChartCard', () => {
  it('renders skeleton when loading', () => {
    render(<WeatherChartCard values={[]} loading={true} />);

    expect(screen.getByRole('region', { name: /Napi maximum hőmérséklet grafikon/i })).toBeInTheDocument();
  });

  it('renders SmoothChart when values are available', () => {
    render(<WeatherChartCard values={[10, 12, 14]} loading={false} />);

    expect(screen.getByTestId('smooth-chart')).toBeInTheDocument();
  });
});
