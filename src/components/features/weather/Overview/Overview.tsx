import React from "react";

interface Props {
  uv: number | null;
  aqi: number | null;
  pressure: number | null;
}

const aqiLabel: Record<number, string> = {
  1: "Good",
  2: "Fair",
  3: "Moderate",
  4: "Poor",
  5: "Very Poor",
};

const Overview: React.FC<Props> = ({ uv, aqi, pressure }) => {
  return (
    <div
      className="
        grid grid-cols-3 
        gap-6 
        mb-10
        px-2
      "
      style={{ alignItems: "stretch" }}
    >
      <div
        className="
          rounded-2xl border border-gray-200 dark:border-gray-800
          bg-white dark:bg-white/[0.03]
          p-6 shadow-sm
          h-[180px]
          flex flex-col justify-between
        "
      >
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Air Quality Index
          </p>
          <h2 className="text-4xl font-semibold dark:text-white mb-1">
            {aqi ?? "—"}
          </h2>
        </div>

        <p className="text-sm text-gray-400 dark:text-gray-300">
          {aqi ? aqiLabel[aqi] : "—"}
        </p>
      </div>

      <div
        className="
          rounded-2xl border border-gray-200 dark:border-gray-800
          bg-white dark:bg-white/[0.03]
          p-6 shadow-sm
          h-[180px]
          flex flex-col justify-between
        "
      >
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            UV Index
          </p>
          <h2 className="text-4xl font-semibold dark:text-white mb-1">
            {uv ?? "—"}
          </h2>
        </div>

        <p className="text-sm text-gray-400 dark:text-gray-300">
          {uv !== null ? "Measured" : "—"}
        </p>
      </div>

      <div
        className="
          rounded-2xl border border-gray-200 dark:border-gray-800
          bg-white dark:bg-white/[0.03]
          p-6 shadow-sm
          h-[180px]
          flex flex-col justify-between
        "
      >
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Pressure (hPa)
          </p>
          <h2 className="text-4xl font-semibold dark:text-white mb-1">
            {pressure}
          </h2>
        </div>

        <p className="text-sm text-gray-400 dark:text-gray-300">Normal</p>
      </div>
    </div>
  );
};

export default Overview;
