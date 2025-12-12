import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavoriteCity {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

interface FavoritesStore {
  favorites: FavoriteCity[];

  addFavorite: (name: string, lat: number, lon: number) => void;
  removeFavorite: (id: string) => void;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (name, lat, lon) => {
        const exists = get().favorites.some(
          (f) => f.name.toLowerCase() === name.toLowerCase()
        );
        if (exists) return;

        set((state) => ({
          favorites: [
            ...state.favorites,
            { id: crypto.randomUUID(), name, lat, lon },
          ],
        }));
      },

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        })),
    }),
    { name: "favorites-cities" }
  )
);
