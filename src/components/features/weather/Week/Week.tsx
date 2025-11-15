import React from "react";
import precipitationImg from "../assets/Precipitation.png";
import sunriseIcon from "../assets/Sunrise.svg";
import sunsetIcon from "../assets/Sunset.svg";
import { formatTime } from "../../../../utils/formatTime";

interface WeekProps {
  pressure: number;
  sunrise: number;
  sunset: number;
  week: any[];
  uv: number | null;
  aqi: number | null;
}

const aqiLabel = ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"];

const Week: React.FC<WeekProps> = ({
  pressure,
  sunrise,
  sunset,
  week,
  uv,
  aqi,
}) => {
  const getDayName = (ts: number) =>
    new Date(ts * 1000).toLocaleDateString("en-US", { weekday: "short" });

  const days = week.map((d) => ({
    day: getDayName(d.dt),
    temp: Math.round(d.temp.day) + "°",
    icon: d.weather[0].icon,
  }));

  return (
    <div
      className="
        rounded-2xl p-8 w-full
        bg-white text-gray-900
        dark:bg-[#1F2635] dark:text-white
        shadow-lg
      "
    >
      <h2 className="text-2xl font-semibold mb-8">Week</h2>

      {/* DAYS */}
      <div className="grid grid-cols-7 gap-4 mb-12">
        {days.map((d, i) => (
          <div
            key={i}
            className="
              rounded-xl p-4
              flex flex-col items-center justify-center
              bg-gray-50
              dark:bg-[#273044]
              border border-gray-200 dark:border-[#3A4761]
              shadow-sm
            "
          >
            <h3 className="text-lg font-semibold mb-1">{d.day}</h3>
            <img
              src={`https://openweathermap.org/img/wn/${d.icon}@2x.png`}
              className="w-12 mb-1"
            />
            <p className="text-lg font-semibold">{d.temp}</p>
          </div>
        ))}
      </div>

      {/* OVERVIEW */}
      <h2 className="text-2xl font-semibold mb-8">Today’s Overview</h2>

      <div className="grid grid-cols-3 gap-6 mb-10">
        {/* AQI */}
        <div className="rounded-2xl p-5 bg-gray-50 dark:bg-[#273044] border border-gray-200 dark:border-[#3A4761] shadow-sm">
          <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
            Air Quality Index
          </p>
          <h2 className="text-4xl font-semibold mb-1">{aqi ?? "—"}</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {aqi ? aqiLabel[aqi] : "—"}
          </p>
        </div>

        {/* UV */}
        <div className="rounded-2xl p-5 bg-gray-50 dark:bg-[#273044] border border-gray-200 dark:border-[#3A4761] shadow-sm">
          <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
            UV Index
          </p>
          <h2 className="text-4xl font-semibold mb-1">{uv ?? "—"}</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {uv !== null ? "Measured" : "—"}
          </p>
        </div>

        {/* PRESSURE */}
        <div className="rounded-2xl p-5 bg-gray-50 dark:bg-[#273044] border border-gray-200 dark:border-[#3A4761] shadow-sm">
          <p className="text-sm mb-4 text-gray-600 dark:text-gray-300">
            Pressure (hPa)
          </p>
          <h2 className="text-4xl font-semibold mb-1">{pressure}</h2>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Normal
          </p>
        </div>
      </div>

      {/* CHART + SUN CYCLE */}
      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-2xl bg-gray-50 dark:bg-[#273044] border border-gray-200 dark:border-[#3A4761] shadow-sm p-4">
          <img src={precipitationImg} className="rounded-xl w-full" />
        </div>

        <div className="rounded-2xl p-6 bg-gray-50 dark:bg-[#273044] border border-gray-200 dark:border-[#3A4761] shadow-sm">
          <h3 className="text-lg font-medium mb-4">Sunrise & Sunset</h3>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <img src={sunriseIcon} className="w-8" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Sunrise
                </p>
                <p className="text-lg">{formatTime(sunrise)}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <img src={sunsetIcon} className="w-8" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Sunset
                </p>
                <p className="text-lg">{formatTime(sunset)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Week;
