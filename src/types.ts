export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
};

export type MovieListResponse = {
  results: Movie[];
};

export type MovieDetails = Movie & {
  genres: { id: number; name: string }[];
  runtime: number;
  adult: boolean;
};

export type CreditsResponse = {
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }[];
  crew: {
    id: number;
    name: string;
    job: string;
    profile_path: string | null;
  }[];
};