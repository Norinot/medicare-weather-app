import type { GeoCity, WeatherForecastResponse } from "@/types/weather";

// Could be moved to a .env, but felt unnecesarry. 
const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 min

interface GeoSearchResponse {
  results?: GeoCity[];
}

interface CacheEntry<T> {
  expiresAt: number;
  value: T;
}

export class WeatherApiService {
  private readonly cache = new Map<string, CacheEntry<unknown>>();

  async searchCities(query: string): Promise<GeoCity[]> {
    const normalizedQuery = query.trim().toLowerCase();
    const cacheKey = `search:${normalizedQuery}`;

    const cached = this.getCachedValue<GeoCity[]>(cacheKey);
    if (cached) {
      return cached;
    }

    if (normalizedQuery.length < 2) {
      return [];
    }

    const response = await fetch(
      `${GEOCODING_BASE_URL}?name=${encodeURIComponent(query)}&count=5&language=hu`,
    );

    if (!response.ok) {
      throw new Error('Nem sikerült a városkeresés.');
    }

    const data: GeoSearchResponse = await response.json();
    const cities = data.results ?? [];
    this.setCachedValue(cacheKey, cities);
    return cities;
  }

  async getForecast(city: { lat: number; lon: number }): Promise<WeatherForecastResponse> {
    const cacheKey = `forecast:${city.lat}:${city.lon}`;
    const cached = this.getCachedValue<WeatherForecastResponse>(cacheKey);
    if (cached) {
      return cached;
    }

    const url = new URL(FORECAST_BASE_URL);
    url.searchParams.set('latitude', city.lat.toString());
    url.searchParams.set('longitude', city.lon.toString());
    url.searchParams.set('current', 'temperature_2m,weather_code');
    url.searchParams.set('daily', 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max');
    url.searchParams.set('timezone', 'auto');

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error('Nem sikerült a felhőjárási adatok lekérése.');
    }

    const forecast = (await response.json()) as WeatherForecastResponse;
    this.setCachedValue(cacheKey, forecast);
    return forecast;
  }

  private getCachedValue<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) {
      return null;
    }

    if (entry.expiresAt <= Date.now()) {
      this.cache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  private setCachedValue<T>(key: string, value: T) {
    this.cache.set(key, {
      expiresAt: Date.now() + CACHE_TTL_MS,
      value,
    });
  }
}
