import { OMDBMovie } from "@/types";

const OMDB_BASE_URL = "https://www.omdbapi.com";

/**
 * Fetches movie details from the OMDB API using an IMDb ID.
 * Returns full plot and all available metadata.
 */
export async function fetchMovieFromOMDB(imdbId: string): Promise<OMDBMovie> {
  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OMDB_API_KEY is not configured. Get a free key at https://www.omdbapi.com/apikey.aspx"
    );
  }

  const url = `${OMDB_BASE_URL}/?i=${encodeURIComponent(imdbId)}&apikey=${apiKey}&plot=full`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`OMDB API returned status ${response.status}`);
  }

  const data: OMDBMovie = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie not found");
  }

  return data;
}
