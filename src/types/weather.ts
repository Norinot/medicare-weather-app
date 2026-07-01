export interface GeoCity {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export interface WeatherConditionMeta {
  label: string;
  icon: string;
}


export interface WeatherForecastCurrent {
  temperature_2m: number;
  weather_code: number;
}

export interface WeatherForecastDaily {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: number[];
}

export interface WeatherForecastResponse {
  current: WeatherForecastCurrent
  daily: WeatherForecastDaily
}
