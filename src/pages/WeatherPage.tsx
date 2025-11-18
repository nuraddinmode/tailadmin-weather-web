import { useEffect, useState } from "react";
import axios from "axios";

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

const API_KEY = "9c5bc2c2107dea7d085dc35748ec1cc9";

function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const [weekData, setWeekData] = useState<any[]>([]);
  const [hourly, setHourly] = useState<any[]>([]);
  const [uv, setUv] = useState<number | null>(null);
  const [aqi, setAqi] = useState<number | null>(null);

  const [city, setCity] = useState<string>("");
  const [dayOfWeek, setDayOfWeek] = useState<string>("");

  // --- LOCATION BY IP ---
  const getLocationByIP = async () => {
    try {
      const res = await fetch("https://ipapi.co/json/");
      const json = await res.json();
      if (json.latitude && json.longitude) {
        return { lat: json.latitude, lon: json.longitude };
      }
      return null;
    } catch {
      return null;
    }
  };

  // --- GET WEATHER + ONE CALL ---
  const getWeatherData = async (lat: number, lon: number) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`
      );

      setWeatherData(response.data);

      // Set city + day name
      const date = new Date(response.data.dt * 1000);
      setDayOfWeek(date.toLocaleDateString("en-US", { weekday: "long" }));
      setCity(response.data.name);

      // --- ONE CALL 3.0 ---
      try {
        const onecall = await axios.get(
          `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
        );

        setWeekData(onecall.data.daily.slice(0, 7)); // 7 days
        setUv(onecall.data.current.uvi);
        setHourly(onecall.data.hourly); // <<<<<< REQUIRED
        console.log("Hourly Loaded:", onecall.data.hourly);

        // AQI (air pollution)
        const aqiRes = await axios.get(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        setAqi(aqiRes.data.list[0].main.aqi);
      } catch (err) {
        console.error("ONE CALL ERROR", err);
      }
    } catch (err) {
      console.error("WEATHER ERROR", err);
    }
  };

  // --- GEOLOCATION ---
  const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 15000,
      });
    });
  };

  // --- INITIAL LOAD ---
  useEffect(() => {
    const load = async () => {
      try {
        const pos = await getCurrentPosition();
        await getWeatherData(pos.coords.latitude, pos.coords.longitude);
      } catch {
        const ip = await getLocationByIP();
        if (ip) {
          await getWeatherData(ip.lat, ip.lon);
        } else {
          // default Moscow
          await getWeatherData(55.7558, 37.6173);
        }
      }
    };
    load();
  }, []);

  // --- SEARCH CITY ---
  const handleCitySubmit = async (inputCity: string) => {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=1&appid=${API_KEY}`
    );
    const data = await res.json();
    if (data.length > 0) {
      await getWeatherData(data[0].lat, data[0].lon);
    }
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
