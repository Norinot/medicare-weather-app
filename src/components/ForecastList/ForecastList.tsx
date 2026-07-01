import { DAY_NAMES_HU, getWeatherInfo } from "@utils/weather";
import styles from "./ForecastList.module.scss";
import type { WeatherForecastResponse } from "@/types/weather";

interface ForecastListProps {
  daily: WeatherForecastResponse["daily"] | null;
  loading: boolean;
}

export function ForecastList({ daily, loading }: ForecastListProps) {
  if (!daily && !loading) {
    return null;
  }

  return (
    <div className={styles.forecastBlock}>
      <div className={styles.forecastTitle}>7 napos előrejelzés</div>
      {loading
        ? Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className={styles.forecastRow}>
              <span className={styles.skeletonDayName} />
              <span className={styles.skeletonIcon} />
              <span className={styles.skeletonPrecipitation} />
              <span className={styles.skeletonTemps} />
            </div>
          ))
        : daily?.time.map((date, index) => {
            const day = new Date(date);
            const dayName = DAY_NAMES_HU[day.getDay()];
            const info = getWeatherInfo(daily.weather_code[index]);
            const precipitation = daily.precipitation_probability_max[index];
            const minTemp = Math.round(daily.temperature_2m_min[index]);
            const maxTemp = Math.round(daily.temperature_2m_max[index]);

            return (
              <div key={date} className={styles.forecastRow}>
                <span className={styles.dayName}>{dayName}</span>
                <span className={styles.icon} aria-hidden="true">
                  {info.icon}
                </span>
                <span className={styles.precipitation}>{precipitation}%</span>
                <span className={styles.temperatures}>
                  {minTemp} °C / {maxTemp} °C
                </span>
              </div>
            );
          })}
    </div>
  );
}
