import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchWeatherData } from "../utils/getWeather";

interface FavoriteWeather {
  id: string;
  name: string;
  temp: number;
  min: number;
  max: number;
  description: string;
  icon: string;
  updatedAt: number;
}

interface FavoriteWeatherStore {
  weather: FavoriteWeather[];
  loadWeatherForCities: (
    cities: { id: string; name: string; lat: number; lon: number }[]
  ) => Promise<void>;
  clearWeather: (id: string) => void;
}

const TEN_MINUTES = 10 * 60 * 1000;

export const useFavoriteWeatherStore = create<FavoriteWeatherStore>()(
  persist(
    (set, get) => ({
      weather: [],

      loadWeatherForCities: async (cities) => {
        const existing = get().weather;

        const updated = await Promise.all(
          cities.map(async (c) => {
            const cached = existing.find((x) => x.id === c.id);

            if (cached && Date.now() - cached.updatedAt < TEN_MINUTES) {
              return cached;
            }

            const data = await fetchWeatherData(c.lat, c.lon);
            if (!data) return cached ?? null;

            const w = data.weather;

            return {
              id: c.id,
              name: c.name,
              temp: w.main.temp,
              min: w.main.temp_min,
              max: w.main.temp_max,
              description: w.weather[0].description,
              icon: w.weather[0].icon,
              updatedAt: Date.now(),
            };
          })
        );

        set({
          weather: updated.filter((x): x is FavoriteWeather => x !== null),
        });
      },

      clearWeather: (id) =>
        set((state) => ({
          weather: state.weather.filter((x) => x.id !== id),
        })),
    }),
    { name: "favorite-weather-cache" }
  )
);
