import { useCallback, useEffect, useMemo, useState } from "react";
import { WeatherApiService } from "@services/weatherApi";
import { useLocalStorageState } from "@hooks/useLocalStorageState";
import { useWeatherForecast } from "@hooks/useWeatherForecast";
import { getWeatherInfo } from "@utils/weather";
import styles from "./App.module.scss";
import { CityModal } from "@components/CityModal/CityModal";
import { CurrentWeatherCard } from "@components/CurrentWeatherCard/CurrentWeatherCard";
import { ForecastList } from "@components/ForecastList/ForecastList";
import { WeatherChartCard } from "@components/WeatherChartCard/WeatherChartCard";
import type { GeoCity } from "@/types/weather";

const weatherApi = new WeatherApiService();

export default function WeatherApp() {
  const [city, setCity] = useLocalStorageState<GeoCity | null>(
    "weather-city",
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { weather, loading, error } = useWeatherForecast(city);

  useEffect(() => {
    if (!city) {
      setIsModalOpen(true);
    }
  }, [city]);

  const handleSelectCity = useCallback(
    (selectedCity: GeoCity) => {
      setCity(selectedCity);
      setIsModalOpen(false);
    },
    [setCity],
  );

  const handleSearchCities = useCallback(
    async (query: string) => weatherApi.searchCities(query),
    [],
  );

  const chartValues = useMemo(
    () => weather?.daily?.temperature_2m_max.slice(0, 7) ?? [],
    [weather],
  );

  return (
    <div className={styles.page}>
      <main className={styles.app}>
        <section className={styles.hero}>
          <CurrentWeatherCard
            cityName={city?.name ?? null}
            current={weather?.current ?? null}
            // current={null}
            currentInfo={
              weather?.current
                ? getWeatherInfo(weather.current.weather_code)
                : null
            }
            loading={loading}
            error={error}
            onOpenCityModal={() => setIsModalOpen(true)}
          />

          <ForecastList daily={weather?.daily ?? null} loading={loading} />
        </section>

        <WeatherChartCard values={chartValues} loading={loading} />

        <footer className={styles.footer}>
          Jelentkező neve: Bernáth Márk Bence
        </footer>
      </main>

      <CityModal
        isOpen={isModalOpen}
        onSelect={handleSelectCity}
        onClose={() => {
          if (city) {
            setIsModalOpen(false);
          }
        }}
        onSearch={handleSearchCities}
      />
    </div>
  );
}
