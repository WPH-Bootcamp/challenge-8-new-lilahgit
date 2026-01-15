import { useQuery } from '@tanstack/react-query';
import { api } from './api';
import type { CreditsResponse, MovieDetails, MovieListResponse } from '../types';

const fetchTrending = async (): Promise<MovieListResponse> => {
  const { data } = await api.get('/trending/movie/day');
  return data;
};

const fetchNewRelease = async (): Promise<MovieListResponse> => {
  const { data } = await api.get('/movie/now_playing');
  return data;
};

const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const { data } = await api.get(`/movie/${movieId}`);
  return data;
};

const fetchMovieCredits = async (movieId: number): Promise<CreditsResponse> => {
  const { data } = await api.get(`/movie/${movieId}/credits`);
  return data;
};

const fetchSearch = async (query: string): Promise<MovieListResponse> => {
  const { data } = await api.get('/search/movie', {
    params: { query },
  });
  return data;
};

export const useTrendingMovies = () =>
  useQuery({
    queryKey: ['movies', 'trending'],
    queryFn: fetchTrending,
    staleTime: 1000 * 60 * 5,
  });

export const useNewReleaseMovies = () =>
  useQuery({
    queryKey: ['movies', 'new-release'],
    queryFn: fetchNewRelease,
    staleTime: 1000 * 60 * 5,
  });

export const useMovieDetails = (movieId: number | undefined) =>
  useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => fetchMovieDetails(movieId as number),
    enabled: Boolean(movieId),
  });

export const useMovieCredits = (movieId: number | undefined) =>
  useQuery({
    queryKey: ['movie', movieId, 'credits'],
    queryFn: () => fetchMovieCredits(movieId as number),
    enabled: Boolean(movieId),
  });

export const useSearchMovies = (query: string) =>
  useQuery({
    queryKey: ['movies', 'search', query],
    queryFn: () => fetchSearch(query),
    enabled: query.trim().length > 0,
  });