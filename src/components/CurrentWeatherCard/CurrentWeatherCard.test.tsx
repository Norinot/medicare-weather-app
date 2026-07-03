import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { CurrentWeatherCard } from './CurrentWeatherCard';

const baseProps = {
  cityName: 'Budapest',
  current: { temperature_2m: 12, weather_code: 0 },
  currentInfo: { label: 'Tiszta idő', icon: '☀️' },
  loading: false,
  error: null,
  onOpenCityModal: vi.fn(),
};

describe('CurrentWeatherCard', () => {
  it('renders city name and temperature', () => {
    render(<CurrentWeatherCard {...baseProps} />);

    expect(screen.getByRole('button', { name: /Budapest/i })).toBeInTheDocument();
    expect(screen.getByText(/12 °C/i)).toBeInTheDocument();
    expect(screen.getByText(/Tiszta idő/i)).toBeInTheDocument();
  });

  it('shows placeholder when no city is selected', () => {
    render(<CurrentWeatherCard {...baseProps} cityName={null} current={null} currentInfo={null} loading={false} />);

    expect(screen.getByRole('button', { name: /Válasszon várost/i })).toBeInTheDocument();
  });

  it('shows error message', () => {
    render(<CurrentWeatherCard {...baseProps} error="Valami hiba" current={null} currentInfo={null} />);

    expect(screen.getByText(/Hiba: Valami hiba/i)).toBeInTheDocument();
  });

  it('calls open city modal when button clicked', async () => {
    const user = userEvent.setup();
    render(<CurrentWeatherCard {...baseProps} />);

    await user.click(screen.getByRole('button', { name: /Budapest/i }));
    expect(baseProps.onOpenCityModal).toHaveBeenCalled();
  });
});
