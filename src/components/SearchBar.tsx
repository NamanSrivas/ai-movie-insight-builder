"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

interface SearchBarProps {
  onSearch: (imdbId: string) => void;
  isLoading: boolean;
}

const EXAMPLE_MOVIES = [
  { id: "tt0133093", title: "The Matrix" },
  { id: "tt0111161", title: "The Shawshank Redemption" },
  { id: "tt0468569", title: "The Dark Knight" },
  { id: "tt1375666", title: "Inception" },
];

export default function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const validate = (value: string): boolean => {
    if (!value.trim()) {
      setError("Please enter an IMDb ID");
      return false;
    }
    if (!/^tt\d{7,}$/i.test(value.trim())) {
      setError("Invalid format. IMDb ID should look like tt0133093");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate(input)) {
      onSearch(input.trim().toLowerCase());
    }
  };

  const handleExampleClick = (id: string) => {
    setInput(id);
    setError("");
    onSearch(id);
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          {/* Glow effect behind input */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-20 group-focus-within:opacity-50 transition duration-500" />
          <div className="relative flex items-center bg-gray-900 rounded-xl border border-gray-700/50">
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
              }}
              placeholder="Enter IMDb ID (e.g., tt0133093)"
              className="w-full px-6 py-4 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg rounded-xl"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-r-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                "Analyze"
              )}
            </button>
          </div>
        </div>

        {error && (
          <motion.p
            className="text-red-400 text-sm mt-2 ml-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
      </form>

      {/* Quick-pick example movies */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="text-gray-500 text-sm self-center">Try:</span>
        {EXAMPLE_MOVIES.map((movie) => (
          <button
            key={movie.id}
            onClick={() => handleExampleClick(movie.id)}
            disabled={isLoading}
            className="text-sm px-3 py-1 rounded-full bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:border-blue-500/50 transition-all duration-300 disabled:opacity-50"
          >
            {movie.title}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
