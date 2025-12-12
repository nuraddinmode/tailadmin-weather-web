import React, { useEffect, useState } from "react";
import styles from "./Today.module.css";

import weatherImg from "../assets/Weather image.png";
import cloudRain from "../assets/Cloud Rain.svg";
import tempLow from "../assets/Temperature 01.svg";
import tempHigh from "../assets/Temperature 02.svg";
import humidityIcon from "../assets/water.svg";
import windIcon from "../assets/wind.svg";
import searchIcon from "../assets/Search 01.svg";

import { options, type Options } from "../../../../data/options";

import { useFavoritesStore } from "../../../../store/favoriteStore";
import { useWeatherStore } from "../../../../store/weatherStore";

interface TodayProps {
  onSubmitCity: (city: string) => void;
  temp: number;
  currentCity: string;
  day: string;
  description: string;
  humidity: number;
  speed: number;
  min: number;
  max: number;
}

const Today: React.FC<TodayProps> = ({
  onSubmitCity,
  temp,
  currentCity,
  day,
  description,
  humidity,
  speed,
  min,
  max,
}) => {
  const [value, setValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Options[]>([]);
  const [bool, setBool] = useState(false);

  const addFavorite = useFavoritesStore((s) => s.addFavorite);

  const lat = useWeatherStore((s) => s.lat);
  const lon = useWeatherStore((s) => s.lon);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    setBool(v.length > 0);
    setFilteredOptions(
      options.filter((o) => o.city.toLowerCase().includes(v.toLowerCase()))
    );
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const text = e.currentTarget.textContent || "";
    setValue(text);
    setBool(false);
  };

  useEffect(() => {
    const close = () => setBool(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmitCity(value.trim());
      // не очищаем value → можно добавить в избранное с этим именем
    }
  };

  const handleAddFavorite = () => {
    const displayName = (value.trim() || currentCity).trim();
    if (!displayName) return;

    if (lat == null || lon == null) return;

    addFavorite(displayName, lat, lon);
  };

  return (
    <div
      className="
        w-full h-full
        rounded-2xl
        shadow-sm
        p-6 flex flex-col
      "
    >
      {/* SEARCH */}
      <div
        className="
          flex items-center gap-3
          w-full
          bg-gray-100 dark:bg-gray-800
          border border-gray-200 dark:border-gray-700
          rounded-full
          px-5 py-2
          mb-10
        "
      >
        <img src={searchIcon} className="w-5 h-5" />

        <form
          className={`${styles.today__form} flex-1 relative`}
          onSubmit={handleSubmit}
        >
          <input
            value={value}
            onChange={handleChange}
            placeholder="Search city..."
            className="
              bg-transparent outline-none w-full 
              text-gray-800 dark:text-white/90 text-lg
            "
          />

          {bool && (
            <ul
              className="
                absolute top-[120%] left-0 w-full z-50
                bg-white dark:bg-white/[0.05]
                border border-gray-200 dark:border-gray-700
                rounded-xl shadow-lg
                flex flex-col gap-1
              "
            >
              {filteredOptions.map((opt) => (
                <li
                  key={opt.id}
                  onClick={handleClick}
                  className="
                    px-3 py-2 cursor-pointer
                    text-gray-800 dark:text-white/90
                    hover:bg-gray-100 dark:hover:bg-gray-700/30
                    rounded-lg text-lg
                  "
                >
                  {opt.city}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      {/* MAIN ICON */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={weatherImg}
          className="w-[240px] h-[240px] object-contain mb-6"
        />
        <h2 className="text-6xl font-bold text-gray-800 dark:text-white/90">
          {Math.floor(Number(temp))}°C
        </h2>
      </div>

      {/* CITY + DAY */}
      <div className="flex justify-between w-full text-2xl mb-8">
        <p className="text-gray-800 dark:text-white/90">{currentCity}</p>
        <p className="text-gray-800 dark:text-white/90">{day}</p>
      </div>

      <button
        onClick={handleAddFavorite}
        className="
          px-4 py-2 rounded-xl
          bg-yellow-400/20 dark:bg-yellow-500/20
          text-yellow-700 dark:text-yellow-300
          hover:bg-yellow-400/30 transition
          text-sm font-medium
          mb-3.5
        "
      >
        ★ Add to featured cities
      </button>

      {/* DETAILS */}
      <div className="space-y-4 mb-10 w-full">
        <div className="flex items-center gap-3">
          <img src={cloudRain} className="w-6 h-6" />
          <p className="text-lg text-gray-800 dark:text-white/90">
            Condition — {description[0].toUpperCase() + description.slice(1)}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <img src={tempLow} className="w-6 h-6" />
          <p className="text-lg text-gray-800 dark:text-white/90">
            Min Temperature {min}°C
          </p>
        </div>

        <div className="flex items-center gap-3">
          <img src={tempHigh} className="w-6 h-6" />
          <p className="text-lg text-gray-800 dark:text-white/90">
            Max Temperature {max}°C
          </p>
        </div>
      </div>

      {/* HUMIDITY / WIND */}
      <div
        className="
          w-full rounded-2xl
          border border-gray-200 dark:border-gray-800
          bg-gray-50 dark:bg-white/[0.05]
          shadow-sm
          px-5 py-4
          flex justify-between items-center
        "
      >
        {/* HUMIDITY */}
        <div className="flex items-center gap-3">
          <img src={humidityIcon} className="w-7 h-7 opacity-80" />
          <div>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {humidity}%
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
          </div>
        </div>

        {/* LINE */}
        <div className="w-px h-10 bg-gray-300 dark:bg-white/20"></div>

        {/* WIND */}
        <div className="flex items-center gap-3">
          <img src={windIcon} className="w-7 h-7 opacity-80" />
          <div>
            <p className="text-xl font-semibold text-gray-900 dark:text-white">
              {speed} km/h
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Wind</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
