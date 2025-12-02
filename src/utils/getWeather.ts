import axios from "axios";

const API_KEY = "9c5bc2c2107dea7d085dc35748ec1cc9";

export interface WeatherServiceResponse {
  weather: any;
  oneCall: any;
  aqi: number;
  date: Date;
}

// --- LOCATION BY IP ---
export const getLocationByIP = async (): Promise<{
  lat: number;
  lon: number;
} | null> => {
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

// --- GEOLOCATION ---
export const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 15000,
    });
  });
};

// --- GET WEATHER + ONE CALL + AQI ---
export const fetchWeatherData = async (
  lat: number,
  lon: number
): Promise<WeatherServiceResponse | null> => {
  try {
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`
    );

    const date = new Date(weatherRes.data.dt * 1000);

    const oneCallRes = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const aqiRes = await axios.get(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    return {
      weather: weatherRes.data,
      oneCall: oneCallRes.data,
      aqi: aqiRes.data.list[0].main.aqi,
      date,
    };
  } catch (err) {
    console.error("WEATHER SERVICE ERROR", err);
    return null;
  }
};

// --- SEARCH CITY ---
export const fetchCityWeather = async (
  inputCity: string
): Promise<WeatherServiceResponse | null> => {
  try {
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${inputCity}&limit=1&appid=${API_KEY}`
    );
    const data = await res.json();
    if (data.length > 0) {
      return await fetchWeatherData(data[0].lat, data[0].lon);
    }
    return null;
  } catch {
    return null;
  }
};
