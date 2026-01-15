export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p/';

export const getImageUrl = (path: string | null | undefined, size = 'original') => {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE}${size}${path}`;
};