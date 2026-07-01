import { SmoothChart } from "@components/SmoothChart";
import styles from "./WeatherChartCard.module.scss";

interface WeatherChartCardProps {
  values: number[];
  loading: boolean;
}

export function WeatherChartCard({ values, loading }: WeatherChartCardProps) {
  if (!loading && values.length === 0) {
    return null;
  }

  return (
    <section
      className={styles.chartCard}
      aria-label="Napi maximum hőmérséklet grafikon"
    >
      {loading ? (
        <div className={styles.skeletonChart} />
      ) : (
        <SmoothChart values={values} />
      )}
    </section>
  );
}
