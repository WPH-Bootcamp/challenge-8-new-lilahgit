import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '../components/Header';
import Footer from '../components/Footer';
import InfoBadge from '../components/InfoBadge';
import CastCard from '../components/CastCard';
import { useMovieCredits, useMovieDetails } from '../lib/queries';
import { getImageUrl } from '../lib/tmdb';
import { useFavorites } from '../lib/favorites';

const DetailPage = () => {
  const params = useParams();
  const movieId = params.id ? Number(params.id) : undefined;

  const detailsQuery = useMovieDetails(movieId);
  const creditsQuery = useMovieCredits(movieId);
  const { toggleFavorite, isFavorite } = useFavorites();

  const movie = detailsQuery.data;
  const heroBackdrop = getImageUrl(movie?.backdrop_path, 'original');
  const poster = getImageUrl(movie?.poster_path, 'w500');

  const genre = useMemo(() => movie?.genres?.[0]?.name, [movie]);
  const releaseDate = useMemo(() => {
    if (!movie?.release_date) return '---';
    const date = new Date(movie.release_date);
    if (Number.isNaN(date.getTime())) return '---';
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }, [movie?.release_date]);

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='relative min-h-98 pb-12 sm:min-h-202'>
        {heroBackdrop && (
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{ backgroundImage: `url(${heroBackdrop})` }}
          />
        )}
        <div className='absolute inset-0 bg-linear-to-r from-black via-black/70 to-black/20' />
        <div className='absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/10' />

        <Header variant='overlay' />

        <div className='relative mx-auto grid max-w-6xl grid-cols-[116px_1fr] items-start gap-4 px-4 pt-80 sm:grid-cols-[160px_1fr] sm:px-6 lg:gap-8 lg:grid-cols-[260px_1fr]'>
          <div className='h-42.75 w-29 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.7)] sm:h-59 sm:w-40 lg:h-96 lg:w-65 lg:rounded-3xl'>
            {poster ? (
              <img
                src={poster}
                alt={movie?.title ?? 'Movie poster'}
                className='h-full w-full object-cover'
              />
            ) : (
              <div className='flex h-72 items-center justify-center text-xs text-slate-400'>
                No Poster
              </div>
            )}
          </div>

          <div className='space-y-6'>
            <h1 className='display-sm font-bold sm:display-xl'>
              {movie?.title ?? 'Movie Detail'}
            </h1>
            <div className='flex flex-wrap items-center gap-2 text-sm text-white'>
              <span className='flex items-center gap-2'>
                <img
                  src='./Calendar.svg'
                  alt='Calendar Icon'
                  className='h-6 w-6'
                />
              </span>
              <span className='text-md'>{releaseDate}</span>
            </div>
            <div className='mt-30 px-0 mx-0 flex items-center gap-3 sm:mt-0 sm:flex-wrap'>
              <button
                type='button'
                className='flex min-h-13 flex-1 items-center justify-center gap-3 rounded-full bg-[#961200] px-6 py-2.75 text-md font-semibold text-white shadow-[0_12px_30px_-18px_rgba(176,30,16,0.9)] sm:flex-none sm:px-11'
              >
              Watch Trailer
                <img
                  src='./Play.svg'
                  alt='Play'
                  className='h-4 w-4'
                />
              </button>
              {movie && (
                <button
                  type='button'
                  onClick={() => {
                    const wasFavorite = isFavorite(movie.id);
                    toggleFavorite(movie);
                    if (!wasFavorite) {
                      toast.success('Success Add to Favorites', {
                        className:
                          'rounded-full border border-white/40 bg-white/40 px-6 py-2 text-sm text-white shadow-[0_12px_30px_-18px_rgba(0,0,0,0.6)] backdrop-blur-[20px]',
                      });
                    }
                  }}
                  className='flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 sm:h-13 sm:w-13'
                >
                  <img
                    src={isFavorite(movie?.id ?? 0) ? './Heart-red.svg' : './Heart.svg'}
                    alt='Favorite'
                    className='h-6 w-6 items-center'
                  />
                </button>
              )}
            </div>

            <div className='mt-4 grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-5'>
              <InfoBadge
                icon='./Star.svg'
                label='Rating'
                value={movie ? `${movie.vote_average.toFixed(1)}/10` : '--'}
              />
              <InfoBadge
                icon='./Video.svg'
                label='Genre'
                value={genre ?? '--'}
              />
              <InfoBadge
                icon='./emoji-happy.svg'
                label='Age Limit'
                value={movie ? (movie.adult ? '18+' : '13+') : '--'}
              />
            </div>
          </div>
        </div>
      </div>

      <main className='mx-auto max-w-6xl space-y-10 px-4 pb-12 sm:px-6'>
        <section className='space-y-3'>
          <h2 className='display-md font-bold sm:text-xl text-white'>Overview</h2>
          <p className='text-md text-neutral-400'>
            {movie?.overview ?? 'No overview is available for this movie yet.'}
          </p>
        </section>

        <section className='space-y-4 pb-38'>
          <div className='flex items-center justify-between'>
            <h2 className='display-md font-bold sm:text-xl text-white mb-6'>Cast & Crew</h2>
          </div>
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {(creditsQuery.data?.cast ?? []).slice(0, 6).map((member) => (
              <CastCard
                key={member.id}
                name={member.name}
                role={member.character}
                image={member.profile_path}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DetailPage;
