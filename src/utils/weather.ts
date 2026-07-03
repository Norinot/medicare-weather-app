import type { WeatherConditionMeta } from "@/types/weather";


// Emojis are a lightweight built-in icon solution here.
// For a larger app I would use dedicated SVG/icon assets and Vite aliases.
const WEATHER_CODES: Record<number, WeatherConditionMeta> = {
  0: { label: "Tiszta idő", icon: "☀️" },
  1: { label: "Nagyrészt tiszta", icon: "🌤️" },
  2: { label: "Részben felhős", icon: "⛅" },
  3: { label: "Felhős", icon: "☁️" },
  45: { label: "Ködös", icon: "🌫️" },
  48: { label: "Zúzmarás köd", icon: "🌫️" },
  51: { label: "Enyhe szitálás", icon: "🌦️" },
  53: { label: "Mérsékelt szitálás", icon: "🌦️" },
  55: { label: "Erős szitálás", icon: "🌧️" },
  61: { label: "Enyhe eső", icon: "🌦️" },
  63: { label: "Mérsékelt eső", icon: "🌧️" },
  65: { label: "Erős eső", icon: "🌧️" },
  66: { label: "Enyhe ónos eső", icon: "🌧️" },
  67: { label: "Erős ónos eső", icon: "🌧️" },
  71: { label: "Enyhe havazás", icon: "🌨️" },
  73: { label: "Mérsékelt havazás", icon: "🌨️" },
  75: { label: "Erős havazás", icon: "❄️" },
  77: { label: "Hószemcsék", icon: "❄️" },
  80: { label: "Enyhe zápor", icon: "🌦️" },
  81: { label: "Mérsékelt zápor", icon: "🌧️" },
  82: { label: "Erős zápor", icon: "🌧️" },
  85: { label: "Enyhe hózápor", icon: "🌨️" },
  86: { label: "Erős hózápor", icon: "❄️" },
  95: { label: "Zivatar", icon: "⛈️" },
  96: { label: "Zivatar jégesővel", icon: "⛈️" },
  99: { label: "Zivatar erős jégesővel", icon: "⛈️" },
};

export const DAY_NAMES_HU = [
  "Vasárnap",
  "Hétfő",
  "Kedd",
  "Szerda",
  "Csütörtök",
  "Péntek",
  "Szombat",
];

export function getWeatherInfo(code: number): WeatherConditionMeta {
  return WEATHER_CODES[code] ?? { label: "Ismeretlen", icon: "❓" };
}
