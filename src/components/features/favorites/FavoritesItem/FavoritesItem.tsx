import React from "react";
import starIcon from "../assets/star-icon.png";
import trashIcon from "../assets/trash-icon.png";

interface Props {
  city: string;
  onRemove: () => void;
}

const FavoritesItem: React.FC<Props> = ({ city, onRemove }) => {
  return (
    <div
      className="
        rounded-2xl border border-gray-200 dark:border-gray-800
        bg-white dark:bg-white/[0.05]
        p-6 shadow-sm
        h-[150px]
        flex flex-col justify-between
      "
    >
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold dark:text-white">{city}</p>
        <img src={starIcon} className="w-6 h-6 opacity-80" />
      </div>

      <button
        onClick={onRemove}
        className="
          flex items-center justify-center
          gap-2 mt-4 w-full
          py-2 rounded-xl
          bg-red-500/20 dark:bg-red-600/20
          hover:bg-red-500/30 transition
          text-red-700 dark:text-red-300 font-medium
        "
      >
        <img src={trashIcon} className="w-5 h-5" />
        Remove
      </button>
    </div>
  );
};

export default FavoritesItem;
