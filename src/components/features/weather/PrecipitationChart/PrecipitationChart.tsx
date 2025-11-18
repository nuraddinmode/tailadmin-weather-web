import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface Props {
  hourly: Array<{ pop: number; dt: number }>;
}

const PrecipitationChart: React.FC<Props> = ({ hourly }) => {
  // Берём первые 8 часов
  const hours = hourly.slice(0, 8);

  const categories = hours.map((h) =>
    new Date(h.dt * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    })
  );

  const popValues = hours.map((h) => Math.round(h.pop * 100));

  const options: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      fontFamily: "Outfit, sans-serif",
      height: 220,
    },

    colors: ["#6B7280"],

    stroke: {
      curve: "smooth",
      width: 3,
    },

    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.3,
        opacityTo: 0,
      },
    },

    dataLabels: { enabled: false },

    grid: {
      borderColor: "rgba(255,255,255,0.1)",
      row: { opacity: 0.2 },
      padding: {
        bottom: 30,
      },
    },

    xaxis: {
      categories,
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        style: { colors: "#9CA3AF" },
      },
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

    tooltip: {
      enabled: true,
      y: {
        formatter: (v) => `${v}% chance`,
      },
    },
  };

  const series = [
    {
      name: "Probability",
      data: popValues,
    },
  ];

  return (
    <div
      className="
        rounded-2xl border border-gray-200 dark:border-gray-800
        bg-white dark:bg-white/[0.03]
        p-6 shadow-sm
        h-[220px]
      "
    >
      <h3 className="text-lg font-medium mb-3 text-gray-800 dark:text-white/90">
        Precipitation
      </h3>

      <Chart type="area" height={170} options={options} series={series} />
    </div>
  );
};

export default PrecipitationChart;
