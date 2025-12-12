import { create } from "zustand";
import {
  getLocationByIP,
  fetchWeatherData,
  getCurrentPosition,
  fetchCityWeather,
} from "../utils/getWeather";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon?: string;
  }>;
  wind: { speed: number };
  sys: { sunrise: number; sunset: number };
  coord: { lat: number; lon: number };
  dt: number;
}

interface WeatherStore {
  weatherData: WeatherData | null;
  weekData: any[];
  hourly: any[];
  uv: number | null;
  aqi: number | null;

  city: string;
  dayOfWeek: string;

  lat: number | null;
  lon: number | null;

  initialLoaded: boolean;

  loadByCoords: (lat: number, lon: number) => Promise<void>;
  loadByCity: (city: string) => Promise<void>;
  loadInitial: () => Promise<void>;
}

export const useWeatherStore = create<WeatherStore>()((set, get) => ({
  weatherData: null,
  weekData: [],
  hourly: [],
  uv: null,
  aqi: null,

  city: "",
  dayOfWeek: "",

  lat: null,
  lon: null,

  initialLoaded: false,

  loadByCoords: async (lat, lon) => {
    const data = await fetchWeatherData(lat, lon);
    if (!data) return;

    set({
      weatherData: data.weather,
      dayOfWeek: data.date.toLocaleDateString("en-US", { weekday: "long" }),
      city: data.weather.name,
      weekData: data.oneCall.daily.slice(0, 7),
      hourly: data.oneCall.hourly,
      uv: data.oneCall.current.uvi,
      aqi: data.aqi,

      lat: lat,
      lon: lon,
    });
  },

  loadByCity: async (cityName) => {
    const data = await fetchCityWeather(cityName);
    if (!data) return;

    const lat = data.weather.coord.lat;
    const lon = data.weather.coord.lon;

    set({
      weatherData: data.weather,
      dayOfWeek: data.date.toLocaleDateString("en-US", { weekday: "long" }),
      city: data.weather.name,
      weekData: data.oneCall.daily.slice(0, 7),
      hourly: data.oneCall.hourly,
      uv: data.oneCall.current.uvi,
      aqi: data.aqi,

      lat,
      lon,
    });
  },

  loadInitial: async () => {
    if (get().initialLoaded && get().weatherData) return;

    try {
      const pos = await getCurrentPosition();
      await get().loadByCoords(pos.coords.latitude, pos.coords.longitude);
    } catch {
      const ip = await getLocationByIP();
      if (ip) {
        await get().loadByCoords(ip.lat, ip.lon);
      } else {
        await get().loadByCoords(55.7558, 37.6173);
      }
    }

    set({ initialLoaded: true });
  },
}));
