import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { WeatherApiService } from './weatherApi';

describe('WeatherApiService', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('returns cached search results when available', async () => {
    const service = new WeatherApiService();
    const first = [{ id: 1, name: 'Test', country: 'HU', latitude: 47, longitude: 19 }];

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue({ results: first }),
    } as unknown as Response);

    const result1 = await service.searchCities('test');
    const result2 = await service.searchCities('test');

    expect(result1).toEqual(first);
    expect(result2).toEqual(first);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it('throws when searchCities response is not ok', async () => {
    const service = new WeatherApiService();

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({ ok: false } as unknown as Response);

    await expect(service.searchCities('test')).rejects.toThrow('Nem sikerült a városkeresés.');
  });

  it('fetches forecast and caches it', async () => {
    const service = new WeatherApiService();
    const forecast = {
      current: { temperature_2m: 20, weather_code: 1 },
      daily: {
        time: ['2026-01-01'],
        weather_code: [1],
        temperature_2m_max: [22],
        temperature_2m_min: [14],
        precipitation_probability_max: [5],
      },
    };

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValue(forecast),
    } as unknown as Response);

    const result1 = await service.getForecast({ lat: 47, lon: 19 });
    const result2 = await service.getForecast({ lat: 47, lon: 19 });

    expect(result1).toEqual(forecast);
    expect(result2).toEqual(forecast);
    expect(globalThis.fetch).toHaveBeenCalledTimes(1);
  });

  it('throws when getForecast response is not ok', async () => {
    const service = new WeatherApiService();

    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({ ok: false } as unknown as Response);

    await expect(service.getForecast({ lat: 47, lon: 19 })).rejects.toThrow('Nem sikerült a felhőjárási adatok lekérése.');
  });
});
