import React from "react";

interface DayItem {
  day: string;
  temp: string;
  icon: string;
}

interface Props {
  days: DayItem[];
}

const WeekDays: React.FC<Props> = ({ days }) => {
  return (
    <div className="grid grid-cols-7 gap-4 mb-14">
      {days.map((d, i) => (
        <div
          key={i}
          className="
            rounded-2xl
            border border-gray-200 dark:border-gray-800
            bg-white dark:bg-white/[0.03]
            p-4 shadow-sm
            flex flex-col items-center justify-between
            h-[150px]
          "
        >
          <h3 className="text-sm font-medium text-gray-700 dark:text-white/90">
            {d.day}
          </h3>

          <img
            src={`https://openweathermap.org/img/wn/${d.icon}@2x.png`}
            className="w-12"
            alt="weather icon"
          />

          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {d.temp}
          </p>
        </div>
      ))}
    </div>
  );
};

export default WeekDays;
