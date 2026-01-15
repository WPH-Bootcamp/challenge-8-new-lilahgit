import { useMemo, useRef, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import MovieCard from '../components/MovieCard';
import { useNewReleaseMovies, useTrendingMovies } from '../lib/queries';
import { getImageUrl } from '../lib/tmdb';


const HomePage = () => {
  const trendingQuery = useTrendingMovies();
  const newReleaseQuery = useNewReleaseMovies();
  const trendingRef = useRef<HTMLDivElement | null>(null);
  const [newReleaseLimit, setNewReleaseLimit] = useState(15);
  const newReleaseMovies = useMemo(
    () => newReleaseQuery.data?.results ?? [],
    [newReleaseQuery.data]
  );
  const newReleaseMax = Math.min(100, newReleaseMovies.length);

  const heroMovie = trendingQuery.data?.results?.[0];
  const heroBackdrop = getImageUrl(heroMovie?.backdrop_path, 'original');

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='relative md:min-h-202'>
        {heroBackdrop && (
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{ backgroundImage: `url(${heroBackdrop})` }}
          />
        )}
        <div className='absolute inset-0 bg-linear-to-r from-black via-black/20 to-black/60' />
        <div className='absolute inset-0 bg-linear-to-t from-black via-black/20 to-black/40' />

        <Header variant='overlay' />

        <div className='relative mx-auto flex max-w-6xl flex-col px-4 pt-60 sm:px-6 sm:pt-75'>
          <h1 className='display-lg font-bold sm:display-2xl'>
            {heroMovie?.title ?? 'Trending Movie'}
          </h1>
          <p className='max-w-158 pb-8 text-sm text-slate-300 sm:pb-12 sm:text-md'>
            {heroMovie?.overview ??
              'Discover trending stories from across the globe. Explore the best movies of the moment and dive in.'}
          </p>
          <div className='flex flex-col gap-3 sm:flex-row sm:flex-wrap'>
            <button
              type='button'
              className='flex min-h-13 w-full items-center justify-center gap-3 rounded-full bg-[#961200] px-11 py-2.75 text-md font-semibold text-white shadow-[0_12px_30px_-18px_rgba(176,30,16,0.9)] sm:w-auto'
            >
              Watch Trailer
              <img
                src='./Play.svg'
                alt='Play'
                className='h-4 w-4'
              />
            </button>
            {heroMovie && (
              <a
                href={`/detail/${heroMovie.id}`}
                className='flex min-h-13 w-full items-center justify-center rounded-full border border-white/20 bg-[#181d27] px-11 py-2.75 text-md font-semibold text-white/90 sm:min-w-57.5 sm:w-auto'
              >
                See Detail
              </a>
            )}
          </div>
        </div>
      </div>

      <main className='mx-auto max-w-6xl px-4 pb-12 sm:px-6'>
        <section className='pt-10 md:pt-0'>
          <SectionHeader title='Trending Now' />
          <div className='relative overflow-hidden pt-2'>
            <div
              ref={trendingRef}
              className='flex gap-4 overflow-hidden pb-4'
            >
              {(trendingQuery.data?.results ?? []).slice(0, 10).map((movie, index) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  variant='row'
                  rank={index + 1}
                />
              ))}
            </div>
            <button
              type='button'
              onClick={() => trendingRef.current?.scrollBy({ left: 320, behavior: 'smooth' })}
              className='absolute right-3 top-1/2 z-10 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-[#0a0d12] text-white transition hover:bg-black/80'
              aria-label='Scroll trending'
            >
              <img
                src='./Arrow.svg'
                alt='Scroll'
                className='h-6 w-11 rotate-90'
              />
            </button>
            <div className='pointer-events-none absolute inset-y-0 right-0 hidden w-30 bg-linear-to-l from-black via-black/70 to-transparent md:block' />
          </div>
        </section>

        <section className='mb-5 md:mb-10'>
          <SectionHeader title='New Release' />
          <div className='relative overflow-hidden'>
            <div className='grid grid-cols-2 gap-4 lg:grid-cols-5'>
              {newReleaseMovies.slice(0, Math.min(newReleaseLimit, newReleaseMax)).map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                />
              ))}
            </div>
            {newReleaseMax > 0 && (
              <>
                {newReleaseMax > newReleaseLimit && (
                  <div className='pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black via-black/70 to-transparent' />
                )}
                <div className='absolute inset-x-0 bottom-35 flex justify-center'>
                  <button
                    type='button'
                    onClick={() =>
                      setNewReleaseLimit((limit) => Math.min(limit + 20, newReleaseMax))
                    }
                    disabled={newReleaseLimit >= newReleaseMax}
                    className={`h-13 w-57 rounded-full border border-white/10 bg-[#0a0d12]/60 text-sm font-semibold text-neutral-50 backdrop-blur-[20px] ${
                      newReleaseLimit >= newReleaseMax ? 'opacity-70' : ''
                    }`}
                  >
                    {newReleaseLimit >= newReleaseMax ? 'All loaded' : 'Load More'}
                  </button>
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
