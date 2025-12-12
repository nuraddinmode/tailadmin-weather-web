import React, { useEffect } from "react";
import { useWeatherStore } from "../store/weatherStore";
import Today from "../components/features/weather/Today/Today";
import Week from "../components/features/weather/Week/Week";

const WeatherPage: React.FC = () => {
  const {
    loadInitial,
    loadByCity,
    weatherData,
    weekData,
    uv,
    aqi,
    city,
    dayOfWeek,
  } = useWeatherStore();

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  if (!weatherData) return null;

  const { main, weather, wind, sys } = weatherData;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* TODAY */}
        <div className="rounded-2xl">
          <Today
            onSubmitCity={loadByCity}
            temp={main.temp}
            currentCity={city}
            day={dayOfWeek}
            description={weather[0].description}
            humidity={main.humidity}
            speed={wind.speed}
            min={main.temp_min}
            max={main.temp_max}
          />
        </div>

        {/* WEEK + OVERVIEW */}
        <div className="xl:col-span-2 rounded-2xl p-6 shadow-lg">
          <Week
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
};

export default WeatherPage;
