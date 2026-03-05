import { NextResponse } from "next/server";
import { fetchMovieFromOMDB } from "@/lib/omdb";
import { findTMDBId, fetchReviews, fetchCast, getTMDBImageUrl } from "@/lib/tmdb";
import { analyzeSentiment } from "@/lib/gemini";
import { CastMember, Review, SentimentAnalysis } from "@/types";

/**
 * GET /api/movie/[id]
 * Fetches movie details, cast, reviews, and AI sentiment analysis.
 * OMDB is required; TMDB and Gemini degrade gracefully on failure.
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: imdbId } = await params;

  // Validate IMDb ID format (e.g., tt0133093)
  if (!/^tt\d{7,}$/i.test(imdbId)) {
    return NextResponse.json(
      {
        error: "Invalid IMDb ID",
        message: "IMDb ID must be in format ttXXXXXXX (e.g., tt0133093)",
      },
      { status: 400 }
    );
  }

  try {
    // Step 1: Fetch movie details from OMDB (critical — fails the request if unavailable)
    const omdbData = await fetchMovieFromOMDB(imdbId);

    // Step 2: Fetch cast and reviews from TMDB (non-critical — gracefully degraded)
    let cast: CastMember[] = [];
    let reviews: Review[] = [];

    try {
      const tmdbId = await findTMDBId(imdbId);

      if (tmdbId) {
        const [tmdbCast, tmdbReviews] = await Promise.all([
          fetchCast(tmdbId),
          fetchReviews(tmdbId),
        ]);

        cast = tmdbCast.map((c) => ({
          name: c.name,
          character: c.character,
          image: getTMDBImageUrl(c.profile_path),
        }));

        reviews = tmdbReviews.map((r) => ({
          author: r.author,
          content: r.content,
          rating: r.author_details?.rating || null,
        }));
      }
    } catch (tmdbError) {
      console.warn("TMDB fetch failed, continuing without cast/reviews:", tmdbError);
    }

    // Step 3: AI sentiment analysis (non-critical — uses fallback on failure)
    let sentiment: SentimentAnalysis = {
      summary: "Sentiment analysis is currently unavailable.",
      sentiment: "mixed",
      keyThemes: [],
    };

    try {
      sentiment = await analyzeSentiment(
        reviews,
        omdbData.Title,
        omdbData.imdbRating
      );
    } catch (aiError) {
      console.warn("AI sentiment analysis failed:", aiError);
    }

    return NextResponse.json({
      movie: {
        title: omdbData.Title,
        year: omdbData.Year,
        rated: omdbData.Rated,
        released: omdbData.Released,
        runtime: omdbData.Runtime,
        genre: omdbData.Genre,
        director: omdbData.Director,
        plot: omdbData.Plot,
        poster: omdbData.Poster,
        imdbRating: omdbData.imdbRating,
        imdbID: omdbData.imdbID,
        ratings: omdbData.Ratings.map((r) => ({
          source: r.Source,
          value: r.Value,
        })),
        boxOffice: omdbData.BoxOffice,
      },
      cast,
      reviews,
      sentiment,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch movie data", message },
      { status: 500 }
    );
  }
}
