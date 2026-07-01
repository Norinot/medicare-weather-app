import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import styles from "./CityModal.module.scss";
import type { GeoCity } from "@/types/weather";

interface CityModalProps {
  isOpen: boolean;
  onSelect: (city: GeoCity) => void;
  onClose: () => void;
  onSearch: (query: string) => Promise<GeoCity[]>;
}

export function CityModal({
  isOpen,
  onSelect,
  onClose,
  onSearch,
}: CityModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoCity[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const debounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    inputRef.current?.focus();

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [isOpen]);

  const runSearch = useCallback(
    async (value: string) => {
      if (value.trim().length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const cities = await onSearch(value);
        setResults(cities);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [onSearch],
  );

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(() => {
      void runSearch(value);
    }, 350);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="city-search-title"
      >
        <h2 id="city-search-title" className={styles.title}>
          Város keresése
        </h2>
        <label className={styles.label} htmlFor="city-search-input">
          Írja be a város nevét
        </label>
        <input
          id="city-search-input"
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInput}
          placeholder="Például Budapest"
          className={styles.input}
        />
        {loading && <p className={styles.status}>Keresés...</p>}
        <ul className={styles.resultList}>
          {results.map((city) => (
            <li key={city.id} className={styles.resultItem}>
              <button
                type="button"
                className={styles.resultButton}
                onClick={() =>
                  onSelect({
                    id: city.id,
                    name: city.name,
                    country: city.country,
                    admin1: city.admin1,
                    latitude: city.latitude,
                    longitude: city.longitude,
                  })
                }
              >
                <span className={styles.resultName}>{city.name}</span>
                <span className={styles.resultMeta}>
                  {city.admin1 ? `${city.admin1}, ` : ""}
                  {city.country}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
