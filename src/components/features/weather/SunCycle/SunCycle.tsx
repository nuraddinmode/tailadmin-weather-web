import React from "react";
import sunriseIcon from "../assets/Sunrise.svg";
import sunsetIcon from "../assets/Sunset.svg";
import { formatTime } from "../../../../utils/formatTime";

interface Props {
  sunrise: number;
  sunset: number;
}

const SunCycle: React.FC<Props> = ({ sunrise, sunset }) => {
  return (
    <div
      className="
        rounded-2xl border border-gray-200 dark:border-gray-800
        bg-white dark:bg-white/[0.03]
        p-6 shadow-sm
        h-[220px]
        flex flex-col justify-between
      "
    >
      <h3 className="text-lg font-medium mb-2 text-gray-800 dark:text-white/90">
        Sunrise & Sunset
      </h3>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <img src={sunriseIcon} className="w-8" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sunrise</p>
            <p className="text-lg dark:text-white">{formatTime(sunrise)}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <img src={sunsetIcon} className="w-8" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Sunset</p>
            <p className="text-lg  dark:text-white">{formatTime(sunset)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SunCycle;
