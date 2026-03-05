// OMDB API response types
export interface OMDBMovie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: OMDBRating[];
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  BoxOffice?: string;
  Response: string;
  Error?: string;
}

export interface OMDBRating {
  Source: string;
  Value: string;
}

// TMDB API response types
export interface TMDBFindResponse {
  movie_results: TMDBMovieResult[];
}

export interface TMDBMovieResult {
  id: number;
  title: string;
}

export interface TMDBReview {
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  id: string;
  created_at: string;
}

export interface TMDBCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

// Application types
export interface MovieData {
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genre: string;
  director: string;
  plot: string;
  poster: string;
  imdbRating: string;
  imdbID: string;
  ratings: { source: string; value: string }[];
  boxOffice?: string;
}

export interface CastMember {
  name: string;
  character: string;
  image: string | null;
}

export interface Review {
  author: string;
  content: string;
  rating: number | null;
}

export interface SentimentAnalysis {
  summary: string;
  sentiment: "positive" | "mixed" | "negative";
  keyThemes: string[];
}

export interface MovieInsight {
  movie: MovieData;
  cast: CastMember[];
  reviews: Review[];
  sentiment: SentimentAnalysis;
}

export interface APIError {
  error: string;
  message: string;
}
