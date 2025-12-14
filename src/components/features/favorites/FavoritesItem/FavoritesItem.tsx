import React from "react";

interface Props {
  city: string;
  temp: number;
  min: number;
  max: number;
  description: string;
  icon: string;
  onRemove: () => void;
}

const FavoritesItem: React.FC<Props> = ({
  city,
  temp,
  min,
  max,
  description,
  icon,
  onRemove,
}) => {
  return (
    <div
      className="
        rounded-2xl border border-gray-200 dark:border-gray-800
        bg-white dark:bg-white/[0.05]
        p-6 pb-4
        shadow-sm
        h-[200px]
        flex flex-col
        transition-transform duration-300
          hover:scale-[1.03]
          hover:bg-gray-100
          dark:hover:bg-gray-800
      "
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            {city}
          </p>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {description}
            </p>
          )}
        </div>

        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="w-14 h-14 object-contain"
        />
      </div>

      <div className="mb-4 flex items-baseline gap-2">
        <p className="text-3xl font-bold text-gray-900 dark:text-white">
          {Math.round(temp)}°C
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {Math.round(min)}° / {Math.round(max)}°
        </p>
      </div>

      <button
        onClick={onRemove}
        className="
          mt-auto
          flex items-center justify-center
          gap-2
          py-2 rounded-xl
          bg-red-500/20 dark:bg-red-600/20
          hover:bg-red-500/30 transition
          text-red-700 dark:text-red-300 font-medium
        "
      >
        Remove
      </button>
    </div>
  );
};

export default FavoritesItem;
