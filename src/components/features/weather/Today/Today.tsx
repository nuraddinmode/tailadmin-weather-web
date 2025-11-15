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

interface TodayProps {
  onSubmitCity: (city: string) => void;
  temp: string;
  currentCity: string;
  day: string;
  description: string;
  humidity: number;
  speed: number;
  min: number;
  max: number;
  icon: string;
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
  const [value, setValue] = useState<string>("");
  const [filteredOptions, setFilteredOptions] = useState<Options[]>([]);
  const [bool, setBool] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    setBool(newValue.length > 0);
    setValue(newValue);
    const filtered = options.filter((option) =>
      option.city.toLowerCase().includes(newValue.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    setValue(e.currentTarget.textContent || "");
    setBool(false);
  };

  useEffect(() => {
    const handleClickOutside = () => setBool(false);
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (value.trim()) {
      onSubmitCity(value.trim());
      setValue("");
    }
  };

  return (
    <div
      className="
        w-full h-full rounded-2xl
        bg-white text-gray-900
        dark:bg-[#1F2635] dark:text-white
        shadow-lg
        flex flex-col items-center
        p-6
      "
    >
      {/* SEARCH */}
      <div
        className="
          flex items-center gap-3
          w-full
          bg-gray-100
          dark:bg-[#273044]
          border border-gray-200
          dark:border-[#3A4761]
          rounded-full
          px-5 py-2
          mb-10
        "
      >
        <img src={searchIcon} alt="Search icon" className="w-5 h-5" />

        <form
          className={`${styles.today__form} flex-1`}
          onSubmit={handleSubmit}
        >
          <input
            value={value}
            onChange={handleChange}
            type="text"
            placeholder="Search city..."
            className="
              bg-transparent
              outline-none
              w-full
              text-gray-800
              dark:text-white
              text-lg
            "
          />

          {bool && (
            <ul
              className="
                absolute left-0 top-[120%]
                bg-white dark:bg-[#273044]
                w-full
                rounded-xl
                shadow-lg
                flex flex-col gap-2
                z-50
                border border-gray-200 dark:border-[#3A4761]
              "
            >
              {filteredOptions.map((filter) => (
                <li
                  onClick={handleClick}
                  key={filter.id}
                  className="
                    text-gray-800 dark:text-white
                    text-lg
                    px-3 py-2
                    hover:bg-gray-100 dark:hover:bg-[#2f3b52]
                    rounded-md
                    cursor-pointer
                  "
                >
                  {filter.city}
                </li>
              ))}
            </ul>
          )}
        </form>
      </div>

      {/* MAIN ICON + TEMP */}
      <div className="flex flex-col items-center mb-10">
        <img
          className="w-[260px] h-[260px] object-contain mb-8"
          src={weatherImg}
          alt="Weather illustration"
        />
        <h2 className="text-7xl font-bold mb-8">
          {Math.floor(Number(temp))}°C
        </h2>
      </div>

      {/* CITY + DAY */}
      <div className="flex justify-between w-full text-2xl mb-8">
        <p>{currentCity}</p>
        <p>{day}</p>
      </div>

      {/* DETAILS */}
      <div className="space-y-4 mb-10 w-full">
        {/* Rain */}
        <div className="flex items-center gap-3">
          <img src={cloudRain} alt="Rain" className="w-6 h-6" />
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            Condition - {description[0].toUpperCase() + description.slice(1)}
          </p>
        </div>

        {/* Min temp */}
        <div className="flex items-center gap-3">
          <img src={tempLow} alt="Low temp" className="w-6 h-6" />
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            Min Temperature {min}°C
          </p>
        </div>

        {/* Max temp */}
        <div className="flex items-center gap-3">
          <img src={tempHigh} alt="High temp" className="w-6 h-6" />
          <p className="text-lg font-medium text-gray-800 dark:text-white">
            Max Temperature {max}°C
          </p>
        </div>
      </div>

      {/* STATS (Humidity / Wind) */}
      <div
        className="
          w-full
          rounded-2xl
          px-5 py-4
          flex justify-between items-center gap-6
          bg-gray-100
          dark:bg-[#273044]
          border border-gray-200
          dark:border-[#3A4761]
          shadow-sm
        "
      >
        {/* Humidity */}
        <div className="flex items-center gap-3">
          <img
            src={humidityIcon}
            alt="Humidity"
            className="w-7 h-7 opacity-80"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              {humidity} %
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              Humidity
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px h-10 bg-gray-300 dark:bg-white/20"></div>

        {/* Wind */}
        <div className="flex items-center gap-3">
          <img src={windIcon} alt="Wind" className="w-7 h-7 opacity-80" />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-semibold text-gray-900 dark:text-white">
              {speed} km/h
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-300">
              Wind Speed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Today;
