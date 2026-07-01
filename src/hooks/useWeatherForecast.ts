import { useEffect, useState } from "react";
import { WeatherApiService } from "@services/weatherApi";
import type { GeoCity, WeatherForecastResponse } from "@/types/weather";

const weatherApi = new WeatherApiService();

export function useWeatherForecast(city: GeoCity | null) {
  const [weather, setWeather] = useState<WeatherForecastResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      setWeather(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadForecast = async () => {
      setLoading(true);
      setError(null);
      setWeather(null);

      try {
        const forecast = await weatherApi.getForecast({
          lat: city.latitude,
          lon: city.longitude,
        });

        if (!cancelled) {
          setWeather(forecast);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Hiba történt.");
          setWeather(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadForecast();

    return () => {
      cancelled = true;
    };
  }, [city]);

  return { weather, loading, error };
}
