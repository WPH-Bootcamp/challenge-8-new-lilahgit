import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import EmptyState from "../components/EmptyState";
import { useSearchMovies } from "../lib/queries";
import { useFavorites } from "../lib/favorites";
import { getImageUrl } from "../lib/tmdb";

const SearchPage = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const query = params.get("query") ?? "";
  const searchQuery = useSearchMovies(query);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [value, setValue] = useState(query);

  const results = useMemo(
    () => searchQuery.data?.results ?? [],
    [searchQuery.data]
  );

  useEffect(() => {
    setValue(query);
  }, [query]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setParams({ query: trimmed });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="hidden md:block">
        <Header />
      </div>
      <div className="md:hidden">
        <div className="flex items-center gap-3 px-4 pt-5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-6 w-6 items-center justify-center"
            aria-label="Back"
          >
            <img src="./Arrow-1.svg" alt="Back" className="h-6 w-6" />
          </button>
          <div className="relative">
            <img
              src="./Search.svg"
              alt="Search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-70"
            />
            <input
              value={value}
              onChange={(event) => setValue(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSubmit();
                }
              }}
              placeholder="Search Movie"
              className="h-11 w-100 rounded-2xl bg-[#0A0D12] border-2 border-neutral-800 px-2 py-4 pl-9 pr-9 text-sm text-white placeholder:text-slate-400 focus:border-white/30 focus:outline-none"
            />
            {value.trim().length > 0 && (
              <button
                type="button"
                onClick={() => setValue("")}
                className="absolute right-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-white/10"
                aria-label="Clear search"
              >
                <img src="./Close.svg" alt="Clear" className="h-3 w-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 pb-12 pt-4 sm:px-6">
        {query.length === 0 || results.length === 0 ? (
          <>
            <div className="md:hidden">
              <div className="flex min-h-90 flex-col items-center justify-center gap-3 text-center my-25">
                <div className="flex h-50 w-50 items-center justify-center">
                  <img
                    src="./data-empty.svg"
                    alt="Data Not Found"
                    className="h-50 w-50"
                  />
                </div>
                <div>
                  <h3 className="text-md font-semibold text-white">
                    Data Not Found
                  </h3>
                  <p className="mt-1 text-sm text-neutral-400">
                    Try other keywords
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <EmptyState
                icon="./data-empty.svg"
                title="Data Not Found"
                description="Try other keywords"
              />
            </div>
          </>
        ) : (
          <>
            <div className="mt-6 space-y-10 md:hidden">
              {results.map((movie) => {
                const poster = getImageUrl(movie.poster_path, "w342");
                return (
                  <div key={movie.id}>
                    <div className="flex gap-4">
                      <Link
                        to={`/detail/${movie.id}`}
                        className="h-39 w-26 shrink-0 overflow-hidden rounded-2xl bg-white/5"
                      >
                        {poster ? (
                          <img
                            src={poster}
                            alt={movie.title}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                            No Poster
                          </div>
                        )}
                      </Link>
                      <div className="flex-1 space-y-2">
                        <Link
                          to={`/detail/${movie.id}`}
                          className="text-lg font-semibold text-white"
                        >
                          {movie.title}
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <img
                            src="./Star.svg"
                            alt="Rating"
                            className="h-4 w-4"
                          />
                          <span>{movie.vote_average.toFixed(1)}/10</span>
                        </div>
                        <p className="text-sm text-slate-300 line-clamp-2">
                          {movie.overview}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <Link
                        to={`/detail/${movie.id}`}
                        className="flex h-11 w-100 items-center justify-center gap-2 rounded-full bg-[#961200] text-sm font-semibold text-white"
                      >
                        Watch Trailer
                        <img src="./Play.svg" alt="Play" className="h-4 w-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(movie)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
                        aria-label="Toggle favorite"
                      >
                        <img
                          src={
                            isFavorite(movie.id)
                              ? "./Heart-red.svg"
                              : "./Heart.svg"
                          }
                          alt="Favorite"
                          className="h-5 w-5"
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-10 hidden space-y-12 md:block">
              {results.map((movie) => {
                const poster = getImageUrl(movie.poster_path, "w342");
                return (
                  <div key={movie.id} className="flex items-start gap-6">
                    <Link
                      to={`/detail/${movie.id}`}
                      className="h-68 w-45 shrink-0 overflow-hidden rounded-xl bg-white/5"
                    >
                      {poster ? (
                        <img
                          src={poster}
                          alt={movie.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                          Poster film not available
                        </div>
                      )}
                    </Link>
                    <div className="flex flex-1 flex-col gap-4">
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex flex-col gap-3">
                          <Link
                            to={`/detail/${movie.id}`}
                            className="text-xl font-semibold text-white"
                          >
                            {movie.title}
                          </Link>
                          <div className="flex items-center gap-2 text-sm text-slate-400">
                            <img
                              src="./Star.svg"
                              alt="Rating"
                              className="h-4 w-4"
                            />
                            <span>{movie.vote_average.toFixed(1)}/10</span>
                          </div>
                          <p className="text-sm text-slate-300 line-clamp-2 max-w-2xl">
                            {movie.overview}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleFavorite(movie)}
                          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5"
                          aria-label="Toggle favorite"
                        >
                          <img
                            src={
                              isFavorite(movie.id)
                                ? "./Heart-red.svg"
                                : "./Heart.svg"
                            }
                            alt="Favorite"
                            className="h-5 w-5"
                          />
                        </button>
                      </div>
                      <div className="mt-6">
                        <Link
                          to={`/detail/${movie.id}`}
                          className="flex h-13 w-50 items-center justify-center gap-2 rounded-full bg-[#961200] text-sm font-semibold text-white"
                        >
                          Watch Trailer
                          <img src="./Play.svg" alt="Play" className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default SearchPage;
