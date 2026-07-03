import { render, screen } from '@testing-library/react';
import { ForecastList } from './ForecastList';
import { describe, it, expect } from 'vitest';

describe('ForecastList', () => {
  it('renders the title while loading', () => {
    render(<ForecastList daily={null} loading={true} />);

    expect(screen.getByText(/7 napos előrejelzés/i)).toBeInTheDocument();
  });

  it('renders forecast data when available', () => {
    const daily = {
      time: ['2026-01-01', '2026-01-02'],
      weather_code: [0, 3],
      temperature_2m_max: [10, 12],
      temperature_2m_min: [2, 4],
      precipitation_probability_max: [0, 10],
    };

    render(<ForecastList daily={daily} loading={false} />);

    expect(screen.getByText(/Csütörtök/i)).toBeInTheDocument();
    expect(screen.getByText(/Péntek/i)).toBeInTheDocument();
    expect(screen.getAllByText(/0%/i).length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText(/2 °C \/ 10 °C/i)).toBeInTheDocument();
  });
});
