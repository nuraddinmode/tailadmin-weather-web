import React from "react";
import WeekDays from "../WeekDays/WeekDays";
import Overview from "../Overview/Overview";
import SunCycle from "../SunCycle/SunCycle";
import PrecipitationChart from "../PrecipitationChart/PrecipitationChart";

interface WeekProps {
  pressure: number;
  sunrise: number;
  sunset: number;
  week: any[];
  hourly: any[];
  uv: number | null;
  aqi: number | null;
}

// const aqiLabel = ["", "Good", "Fair", "Moderate", "Poor", "Very Poor"];

const Week: React.FC<WeekProps> = ({
  pressure,
  sunrise,
  sunset,
  week,
  uv,
  aqi,
  hourly,
}) => {
  const getDayName = (ts: number) =>
    new Date(ts * 1000).toLocaleDateString("en-US", { weekday: "short" });

  const days = week.map((d) => ({
    day: getDayName(d.dt),
    temp: Math.round(d.temp.day) + "°",
    icon: d.weather[0].icon,
  }));

  return (
    <>
      <h2 className="text-2xl font-semibold mb-8 dark:text-white">Week</h2>

      <WeekDays days={days} />

      <h2 className="text-2xl font-semibold mb-8 dark:text-white">
        Today’s Overview
      </h2>

      <Overview uv={uv} aqi={aqi} pressure={pressure} />

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3">
          <PrecipitationChart hourly={hourly} />
        </div>

        <div className="col-span-2">
          <SunCycle sunrise={sunrise} sunset={sunset} />
        </div>
      </div>
    </>
  );
};

export default Week;
