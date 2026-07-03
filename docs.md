# Medicare Weather App

This repository contains a weather forecast frontend built with React, TypeScript, and Vite.
It was created as a job interview test assignment for a frontend developer role.

## What the App Does

- Lets the user search for a city using the Open-Meteo Geocoding API.
- Displays a modal search dialog when the app opens with no selected city.
- Shows current weather conditions for the selected city.
- Shows a 7-day weather forecast with day name, weather icon, precipitation probability, minimum and maximum temperature.
- Displays a chart of the daily maximum temperatures for the next 7 days.
- Saves the selected city in browser local storage so the city remains selected on refresh.

## User Flow

1. On first load, the app opens a city selection modal automatically.
2. The user types a city name into the search field.
3. The app queries Open-Meteo geocoding and shows matching city results.
4. The user selects a city from the list.
5. The selected city is stored in `localStorage` and the modal closes.
6. The app fetches weather forecast data for the city and shows:
   - current temperature and weather status,
   - a 7-day forecast list,
   - a maximum temperature chart.

## APIs Used

- Open-Meteo Geocoding API
  - `https://geocoding-api.open-meteo.com/v1/search`
  - Used to convert city names into latitude/longitude coordinates.

- Open-Meteo Weather Forecast API
  - `https://api.open-meteo.com/v1/forecast`
  - Used to fetch current weather and daily forecast data for the selected city.

## Architecture

- `src/App.tsx`
  - Main application component.
  - Manages selected city state and modal visibility.
  - Uses custom hooks and renders the main UI cards.

- `src/services/weatherApi.ts`
  - `WeatherApiService` handles API requests and response caching.
  - Caches search and forecast results in-memory for 5 minutes.

- `src/hooks/useLocalStorageState.ts`
  - Custom hook for saving and loading state from browser local storage.

- `src/hooks/useWeatherForecast.ts`
  - Custom hook for loading forecast data using the selected city.

- `src/components/CityModal/CityModal.tsx`
  - Modal dialog for searching and selecting a city.

- `src/components/CurrentWeatherCard/CurrentWeatherCard.tsx`
  - Displays the selected city and current weather details.

- `src/components/ForecastList/ForecastList.tsx`
  - Displays a list of daily forecast items.

- `src/components/WeatherChartCard/WeatherChartCard.tsx`
  - Displays the max temperature chart for the next 7 days.

- `src/types/weather.ts`
  - Type definitions for city and weather API data.

- `src/utils/weather.ts`
  - Contains helpers for mapping weather codes to labels and icons.

## Styling

- The app uses CSS modules with SCSS files.
- Styles are co-located with components in `src/components/*/*.module.scss`.

## How to Start

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the local Vite URL shown in the terminal.

## Build and Preview

- Build the production bundle:
  ```bash
  npm run build
  ```

- Preview the production build locally:
  ```bash
  npm run preview
  ```

## Testing and Linting

- Run tests:
  ```bash
  npm test
  ```

- Run linting:
  ```bash
  npm run lint
  ```

## Notes

- City selection is persisted using the `weather-city` key in local storage.
- If the city is already selected, the modal opens only when the user explicitly requests it.
- The forecast API is called using latitude and longitude from the selected city.
- The app is designed to follow the provided task requirements and display weather data clearly.
