import React, { useEffect } from "react";
import FavoritesItem from "../components/features/favorites/FavoritesItem/FavoritesItem";
import { useFavoritesStore } from "../store/favoriteStore";
import { useFavoriteWeatherStore } from "../store/favoritesWeatherStore";

const FavoritesPage: React.FC = () => {
  const favorites = useFavoritesStore((s) => s.favorites);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);

  const weather = useFavoriteWeatherStore((s) => s.weather);
  const loadWeather = useFavoriteWeatherStore((s) => s.loadWeatherForCities);
  const clearWeather = useFavoriteWeatherStore((s) => s.clearWeather);

  useEffect(() => {
    if (favorites.length > 0) {
      loadWeather(favorites);
    }
  }, [favorites, loadWeather]);

  const handleRemove = (id: string) => {
    removeFavorite(id);
    clearWeather(id);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-yellow-700 dark:text-yellow-300">
        Featured Cities
      </h1>

      {weather.length === 0 && (
        <p className="text-lg text-gray-600 dark:text-gray-300">
          No favorites yet. Add some cities!
        </p>
      )}

      {weather.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {weather.map((fav) => (
            <FavoritesItem
              key={fav.id}
              city={fav.name}
              temp={fav.temp}
              min={fav.min}
              max={fav.max}
              description={fav.description}
              icon={fav.icon}
              onRemove={() => handleRemove(fav.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
