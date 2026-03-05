"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import MovieDetails from "@/components/MovieDetails";
import CastSection from "@/components/CastSection";
import ReviewsSection from "@/components/ReviewsSection";
import SentimentSection from "@/components/SentimentSection";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { MovieInsight, APIError } from "@/types";

export default function Home() {
  const [data, setData] = useState<MovieInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (imdbId: string) => {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await fetch(`/api/movie/${imdbId}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          (result as APIError).message || "Failed to fetch movie data"
        );
      }

      setData(result as MovieInsight);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 pb-16">
        <Header />
        <SearchBar onSearch={handleSearch} isLoading={loading} />

        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingSkeleton />
            </motion.div>
          )}

          {error && !loading && (
            <motion.div
              key="error"
              className="max-w-2xl mx-auto mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="glass-card rounded-2xl p-8 text-center border border-red-500/20">
                <span className="text-4xl mb-4 block">⚠️</span>
                <h3 className="text-xl font-semibold text-red-400 mb-2">
                  Something went wrong
                </h3>
                <p className="text-gray-400">{error}</p>
              </div>
            </motion.div>
          )}

          {data && !loading && (
            <motion.div
              key="results"
              className="max-w-4xl mx-auto mt-12 space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MovieDetails movie={data.movie} />
              <CastSection cast={data.cast} />
              <ReviewsSection reviews={data.reviews} />
              <SentimentSection
                sentiment={data.sentiment}
                reviewCount={data.reviews.length}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-gray-600 text-sm border-t border-gray-800/50">
        <p>AI Movie Insight Builder &bull; Powered by OMDB, TMDB &amp; Google Gemini</p>
      </footer>
    </main>
  );
}
