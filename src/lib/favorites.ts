import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Movie } from '../types';

const STORAGE_KEY = 'movie-favorites';

const readFavorites = () => {
  if (typeof window === 'undefined') return [] as Movie[];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [] as Movie[];

  try {
    const parsed = JSON.parse(raw) as Movie[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [] as Movie[];
  }
};

const writeFavorites = (items: Movie[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  useEffect(() => {
    setFavorites(readFavorites());
  }, []);

  const toggleFavorite = useCallback((movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      const next = exists ? prev.filter((item) => item.id !== movie.id) : [movie, ...prev];
      writeFavorites(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback(
    (movieId: number) => favorites.some((item) => item.id === movieId),
    [favorites]
  );

  const value = useMemo(
    () => ({ favorites, toggleFavorite, isFavorite }),
    [favorites, toggleFavorite, isFavorite]
  );

  return value;
};