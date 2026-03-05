import { TMDBFindResponse, TMDBReview, TMDBCastMember } from "@/types";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

/**
 * Finds the TMDB movie ID using an IMDb ID.
 */
export async function findTMDBId(imdbId: string): Promise<number | null> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) {
    throw new Error(
      "TMDB_API_KEY is not configured. Get a free key at https://www.themoviedb.org/settings/api"
    );
  }

  const url = `${TMDB_BASE_URL}/find/${encodeURIComponent(imdbId)}?api_key=${apiKey}&external_source=imdb_id`;
  const response = await fetch(url);

  if (!response.ok) return null;

  const data: TMDBFindResponse = await response.json();
  return data.movie_results.length > 0 ? data.movie_results[0].id : null;
}

/**
 * Fetches audience reviews from TMDB for a given movie.
 */
export async function fetchReviews(tmdbId: number): Promise<TMDBReview[]> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) return [];

  const url = `${TMDB_BASE_URL}/movie/${tmdbId}/reviews?api_key=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) return [];

  const data = await response.json();
  return data.results || [];
}

/**
 * Fetches the top 10 cast members from TMDB for a given movie.
 */
export async function fetchCast(tmdbId: number): Promise<TMDBCastMember[]> {
  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) return [];

  const url = `${TMDB_BASE_URL}/movie/${tmdbId}/credits?api_key=${apiKey}`;
  const response = await fetch(url);

  if (!response.ok) return [];

  const data = await response.json();
  return (data.cast || []).slice(0, 10);
}

/**
 * Constructs a full TMDB image URL from a relative path.
 */
export function getTMDBImageUrl(
  path: string | null,
  size: string = "w185"
): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}
