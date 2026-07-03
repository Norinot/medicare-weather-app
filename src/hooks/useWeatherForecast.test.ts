import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useWeatherForecast } from './useWeatherForecast';
import type { GeoCity } from '@/types/weather';

const mockFetch = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  mockFetch.mockReset();
  window.fetch = mockFetch as unknown as typeof fetch;
});

describe('useWeatherForecast', () => {
  it('returns initial loading false and null weather when city is null', async () => {
    const { result } = renderHook(() => useWeatherForecast(null));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.weather).toBeNull();
    expect(result.current.error).toBeNull();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('fetches forecast and sets weather data', async () => {
    const city: GeoCity = {
      id: 1,
      name: 'Test City',
      country: 'HU',
      latitude: 47.5,
      longitude: 19.0,
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({
        current: { temperature_2m: 10, weather_code: 0 },
        daily: { time: ['2026-01-01'], weather_code: [0], temperature_2m_max: [15], temperature_2m_min: [5], precipitation_probability_max: [0] },
      }),
    } as unknown as Response);

    const { result } = renderHook(() => useWeatherForecast(city));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.weather).toEqual({
      current: { temperature_2m: 10, weather_code: 0 },
      daily: { time: ['2026-01-01'], weather_code: [0], temperature_2m_max: [15], temperature_2m_min: [5], precipitation_probability_max: [0] },
    });
    expect(result.current.error).toBeNull();
    expect(mockFetch).toHaveBeenCalled();
  });

  it('returns error when fetch fails', async () => {
    const city: GeoCity = {
      id: 2,
      name: 'Error City',
      country: 'HU',
      latitude: 48.0,
      longitude: 20.0,
    };

    mockFetch.mockRejectedValueOnce(new Error('Fetch failed'));

    const { result } = renderHook(() => useWeatherForecast(city));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.weather).toBeNull();
    expect(result.current.error).toBe('Fetch failed');
  });
});
