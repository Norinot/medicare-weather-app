# Medicare Weather App

A weather forecast frontend built with React, TypeScript, and Vite.

A Live demo of the application is possible to view here: [medicare-test.norinot.hu](https://medicare-test.norinot.hu)

## What it is

This app lets users search for a city and view current weather plus a 7-day forecast using the Open-Meteo API stack.

## Features

- Search for cities with Open-Meteo Geocoding
- Select a city from search results
- Show current weather for the selected city
- Show 7-day forecast with temperature and precipitation data
- Display a chart of future high temperatures
- Persist selected city in browser local storage

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run tests:

```bash
npm test
```

Run linting:

```bash
npm run lint
```

## Notes

- The app opens a city selection modal automatically if no city is stored yet.
- City data is saved under `weather-city` in local storage.
- City search uses `https://geocoding-api.open-meteo.com/v1/search`.
- Forecast data uses `https://api.open-meteo.com/v1/forecast`.

## More Documentation

See `docs.md` for a fuller explanation of the app, architecture, and APIs used.
