import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useWeatherStore } from "../../../../store/weatherStore";

const PrecipitationChart: React.FC = () => {
  const hourly = useWeatherStore((s) => s.hourly);

  // console.log("[PRECIP] hourly =", hourly);

  if (!hourly || hourly.length === 0) {
    return (
      <div
        className="
        rounded-2xl border border-gray-200 dark:border-gray-800
        bg-white dark:bg-white/[0.03]
        p-6 shadow-sm
        h-[220px] flex items-center justify-center
      "
      >
        <p className="text-gray-500 dark:text-gray-400">
          No precipitation data
        </p>
      </div>
    );
  }

  const hours = hourly.slice(0, 8);
  const popValues = hours.map((h) => Math.round(h.pop * 100));

  // Есть ли хоть один ненулевой показатель?
  const hasRealData = popValues.some((v) => v > 0);

  const categories = hours.map((h) =>
    new Date(h.dt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    })
  );

  const options: ApexOptions = {
    chart: { type: "area", toolbar: { show: false }, height: 220 },
    colors: ["#6B7280"],
    stroke: { curve: "smooth", width: 3 },
    fill: { type: "gradient", gradient: { opacityFrom: 0.3, opacityTo: 0 } },
    dataLabels: { enabled: false },
    grid: {
      borderColor: "rgba(255,255,255,0.1)",
      row: { opacity: 0.2 },
      padding: { bottom: 30 },
    },
    xaxis: {
      categories,
      labels: { style: { colors: "#9CA3AF" } },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 4,
      labels: {
        formatter: (v) => v + "%",
        style: { colors: "#9CA3AF" },
      },
    },
  };

  return (
    <div
      className={`
        rounded-2xl border border-gray-200 dark:border-gray-800
        bg-white dark:bg-white/[0.03]
        p-6 shadow-sm
        h-[220px]
        transition
        transition-transform duration-300
          hover:scale-[1.03]
          hover:bg-gray-100
    dark:hover:bg-gray-800
        ${!hasRealData ? "opacity-40" : ""}
      `}
    >
      <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-white/90">
        Precipitation
      </h3>

      {!hasRealData ? (
        <p className="text-gray-500 dark:text-gray-400">
          No precipitation expected today
        </p>
      ) : (
        <Chart
          type="area"
          height={170}
          options={options}
          series={[{ name: "Probability", data: popValues }]}
        />
      )}
    </div>
  );
};

export default PrecipitationChart;
