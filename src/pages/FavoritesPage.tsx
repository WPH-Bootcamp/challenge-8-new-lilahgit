import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EmptyState from '../components/EmptyState';
import { useFavorites } from '../lib/favorites';
import { getImageUrl } from '../lib/tmdb';

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div className='min-h-screen bg-black text-white'>
      <Header />

      <main className='mx-auto max-w-6xl px-4 pb-12 pt-10 sm:px-6'>
        <h1 className='display-lg font-bold text-white'>Favorites</h1>

        {favorites.length === 0 ? (
          <EmptyState
            icon='./data-empty.svg'
            title='Data Empty'
            description='You do not have any favorite movie yet'
            action={
              <Link
                to='/'
                className='flex items-center mt-3 rounded-full bg-[#961200] px-11 py-2.75 text-md font-semibold text-white shadow-[0_12px_30px_-18px_rgba(176,30,16,0.9)] min-h-13'
              >
                Explore Movie
              </Link>
            }
          />
        ) : (
          <div className='mt-12 space-y-12'>
            {favorites.map((movie) => (
              <div
                key={movie.id}
                className='flex flex-col gap-2 md:gap-6 border-b border-neutral-800 pb-12 sm:flex-row'
              >
                <Link
                  to={`/detail/${movie.id}`}
                  className='flex h-67.5 w-45.5 shrink-0 overflow-hidden rounded-2xl bg-white/5'
                >
                  {movie.poster_path ? (
                    <img
                      src={getImageUrl(movie.poster_path, 'w342')}
                      alt={movie.title}
                      className='h-full w-full object-cover'
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center text-xs text-slate-400'>
                      No Poster
                    </div>
                  )}
                </Link>
                <div className='flex-1 space-y-2'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='display-xs font-semibold text-white'>{movie.title}</p>
                      <div className='mt-1 flex items-center gap-2 text-lg text-slate-400'>
                        <img
                          src='./Star.svg'
                          alt='Rating'
                          className='h-6 w-6'
                        />
                        <span>{movie.vote_average.toFixed(1)}/10</span>
                      </div>
                    </div>
                    <button
                      type='button'
                      onClick={() => toggleFavorite(movie)}
                      className='flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5'
                    >
                      <img
                        src='./Heart-red.svg'
                        alt='Remove'
                        className='h-6 w-6'
                      />
                    </button>
                  </div>
                  <p className='text-md max-w-200 text-slate-400 line-clamp-2 mb-6'>{movie.overview}</p>
                  <div>
                    <Link
                      to={`/detail/${movie.id}`}
                      className='inline-flex items-center gap-2 w-50 h-13 rounded-full bg-[#961200] px-7 py-3 text-md font-semibold text-white'
                    >
                      Watch Trailer
                      <img
                        src='./Play.svg'
                        alt='Play'
                        className='h-5 w-5'
                      />
                    
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        )
        }
      </main>

      <Footer />
    </div>
  );
};

export default FavoritesPage;
