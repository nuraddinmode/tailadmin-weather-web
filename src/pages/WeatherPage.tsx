import { useEffect, useState } from "react";
import {
  getLocationByIP,
  fetchWeatherData,
  getCurrentPosition,
  fetchCityWeather,
} from "../utils/getWeather";

import Today from "../components/features/weather/Today/Today";
import Week from "../components/features/weather/Week/Week";

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
  }>;
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  dt: number;
}

function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weekData, setWeekData] = useState<any[]>([]);
  const [hourly, setHourly] = useState<any[]>([]);
  const [uv, setUv] = useState<number | null>(null);
  const [aqi, setAqi] = useState<number | null>(null);

  const [city, setCity] = useState<string>("");
  const [dayOfWeek, setDayOfWeek] = useState<string>("");

  // --- Получаем погоду и устанавливаем состояние ---
  const getWeather = async (lat: number, lon: number) => {
    const data = await fetchWeatherData(lat, lon);
    if (!data) return;

    setWeatherData(data.weather);
    setDayOfWeek(data.date.toLocaleDateString("en-US", { weekday: "long" }));
    setCity(data.weather.name);

    setWeekData(data.oneCall.daily.slice(0, 7));
    setHourly(data.oneCall.hourly);
    setUv(data.oneCall.current.uvi);
    setAqi(data.aqi);
  };

  const addToFavorites = (city: string) => {
    if (!city) return;

    const saved = localStorage.getItem("favorites-cities");
    const list = saved ? JSON.parse(saved) : [];

    if (list.some((c: any) => c.city === city)) return;

    const newCity = { id: crypto.randomUUID(), city };

    const updated = [...list, newCity];
    localStorage.setItem("favorites-cities", JSON.stringify(updated));
  };

  // --- INITIAL LOAD ---
  useEffect(() => {
    const load = async () => {
      try {
        const pos = await getCurrentPosition();
        await getWeather(pos.coords.latitude, pos.coords.longitude);
      } catch {
        const ip = await getLocationByIP();
        if (ip) {
          await getWeather(ip.lat, ip.lon);
        } else {
          // default Moscow
          await getWeather(55.7558, 37.6173);
        }
      }
    };
    load();
  }, []);

  // --- SEARCH CITY ---
  const handleCitySubmit = async (inputCity: string) => {
    const data = await fetchCityWeather(inputCity);
    if (!data) return;

    setWeatherData(data.weather);
    setDayOfWeek(data.date.toLocaleDateString("en-US", { weekday: "long" }));
    setCity(data.weather.name);
    setWeekData(data.oneCall.daily.slice(0, 7));
    setHourly(data.oneCall.hourly);
    setUv(data.oneCall.current.uvi);
    setAqi(data.aqi);
  };

  if (!weatherData) return null;

  const { main, weather, wind, sys } = weatherData;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="rounded-2xl">
          <Today
            onSubmitCity={handleCitySubmit}
            onAddToFavorites={addToFavorites}
            temp={String(main.temp)}
            currentCity={city}
            day={dayOfWeek}
            description={weather[0].description}
            humidity={main.humidity}
            speed={wind.speed}
            min={main.temp_min}
            max={main.temp_max}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="xl:col-span-2 rounded-2xl p-6 shadow-lg">
          <Week
            hourly={hourly}
            pressure={main.pressure}
            sunrise={sys.sunrise}
            sunset={sys.sunset}
            week={weekData}
            uv={uv}
            aqi={aqi}
          />
        </div>
      </div>
    </div>
  );
}

export default WeatherPage;
