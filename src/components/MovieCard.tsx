import { Link } from 'react-router-dom';
import type { Movie } from '../types';
import { getImageUrl } from '../lib/tmdb';

export type MovieCardProps = {
  movie: Movie;
  variant?: 'grid' | 'row';
  onToggleFavorite?: (movie: Movie) => void;
  isFavorite?: boolean;
  rank?: number;
};

const MovieCard = ({
  movie,
  variant = 'grid',
  onToggleFavorite,
  isFavorite,
  rank,
}: MovieCardProps) => {
  const poster = getImageUrl(movie.poster_path, 'w500');

  return (
    <div className='group relative'>
      <Link
        to={`/detail/${movie.id}`}
        className={`block overflow-hidden rounded-xl bg-white/5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)] transition hover:-translate-y-1 ${
          variant === 'row' ? 'h-80 w-52' : 'h-80 w-52'
        }`}
      >
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='flex h-full w-full items-center justify-center bg-white/10 text-xs text-slate-300'>
            No Poster
          </div>
        )}
      </Link>
      {typeof rank === 'number' && (
        <div className='pointer-events-none absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-sm font-semibold text-white'>
          {rank}
        </div>
      )}
      <div className={`mt-3 ${variant === 'row' ? 'w-50' : ''}`}>
        <p className='line-clamp-2 text-lg font-semibold text-white'>{movie.title}</p>
        <div className='mt-1 flex items-center gap-1 text-md text-slate-400'>
          <img
            src='./Star.svg'
            alt='Rating'
            className='h-5 w-5'
          />
          <span>{movie.vote_average.toFixed(1)}/10</span>
        </div>
      </div>
      {onToggleFavorite && (
        <button
          type='button'
          onClick={() => onToggleFavorite(movie)}
          className='absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur'
        >
          <img
            src={isFavorite ? './Heart-1.svg' : './Heart.svg'}
            alt='Favorite'
            className='h-4 w-4'
          />
        </button>
      )}
    </div>
  );
};

export default MovieCard;
