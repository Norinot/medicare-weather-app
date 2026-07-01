import type {
  WeatherForecastResponse,
  WeatherConditionMeta,
} from "@/types/weather";
import styles from "./CurrentWeatherCard.module.scss";

interface CurrentWeatherCardProps {
  cityName: string | null;
  current: WeatherForecastResponse["current"] | null;
  currentInfo: WeatherConditionMeta | null;
  loading: boolean;
  error: string | null;
  onOpenCityModal: () => void;
}

export function CurrentWeatherCard({
  cityName,
  current,
  currentInfo,
  loading,
  error,
  onOpenCityModal,
}: CurrentWeatherCardProps) {
  return (
    <div className={styles.currentBlock}>
      <button
        type="button"
        className={styles.cityButton}
        onClick={onOpenCityModal}
      >
        {cityName ?? "Válasszon várost"}
        <span aria-hidden="true">▾</span>
      </button>

      {error && <p className={styles.errorText}>Hiba: {error}</p>}

      {loading && !current ? (
        <div className={styles.skeletonBlock}>
          <div className={styles.skeletonTemperature} />
          <div className={styles.skeletonCondition} />
        </div>
      ) : current && currentInfo ? (
        <>
          <div className={styles.temperature}>
            {Math.round(current.temperature_2m)} °C
          </div>
          <div className={styles.condition}>{currentInfo.label}</div>
        </>
      ) : null}
    </div>
  );
}
