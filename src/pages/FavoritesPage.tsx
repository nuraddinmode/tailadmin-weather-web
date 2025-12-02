import React, { useEffect, useState } from "react";
import FavoritesItem from "../components/features/favorites/FavoritesItem/FavoritesItem";

interface FavCity {
  id: string;
  city: string;
}

const FavoritesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<FavCity[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites-cities");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const removeCity = (id: string) => {
    const updated = favorites.filter((c) => c.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites-cities", JSON.stringify(updated));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Favorite Cities
      </h1>

      {favorites.length === 0 ? (
        <p className="text-lg text-gray-600 dark:text-gray-300">
          No favorites yet. Add some cities!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {favorites.map((city) => (
            <FavoritesItem
              key={city.id}
              city={city.city}
              onRemove={() => removeCity(city.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
