"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MovieData } from "@/types";

interface MovieDetailsProps {
  movie: MovieData;
}

/** Displays a source-appropriate label and gradient color for each rating. */
function RatingBadge({ source, value }: { source: string; value: string }) {
  const getConfig = () => {
    if (source.includes("Internet Movie Database"))
      return { label: "IMDb", gradient: "from-yellow-500 to-amber-600" };
    if (source.includes("Rotten Tomatoes"))
      return { label: "Rotten Tomatoes", gradient: "from-red-500 to-red-600" };
    if (source.includes("Metacritic"))
      return { label: "Metacritic", gradient: "from-green-500 to-emerald-600" };
    return { label: source, gradient: "from-blue-500 to-blue-600" };
  };

  const { label, gradient } = getConfig();

  return (
    <div className="flex items-center gap-2 bg-gray-800/50 rounded-lg px-3 py-2 border border-gray-700/30">
      <span
        className={`text-xs font-medium bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
      >
        {label}
      </span>
      <span className="text-white font-bold text-sm">{value}</span>
    </div>
  );
}

export default function MovieDetails({ movie }: MovieDetailsProps) {
  return (
    <motion.div
      className="glass-card rounded-2xl overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
        {/* Poster with glow effect */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
            <div className="relative w-[250px] h-[375px] rounded-xl overflow-hidden">
              {movie.poster && movie.poster !== "N/A" ? (
                <Image
                  src={movie.poster}
                  alt={movie.title}
                  fill
                  className="object-cover"
                  sizes="250px"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-lg">
                  No Poster
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Movie metadata */}
        <div className="flex-1 min-w-0">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {movie.title}
          </h2>

          <div className="flex flex-wrap gap-2 text-gray-400 text-sm mb-4">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.rated}</span>
            <span>•</span>
            <span>{movie.runtime}</span>
          </div>

          {/* Genre tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {movie.genre.split(", ").map((g) => (
              <span
                key={g}
                className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Ratings row */}
          <div className="flex flex-wrap gap-3 mb-6">
            {movie.ratings.map((r, i) => (
              <RatingBadge key={i} source={r.source} value={r.value} />
            ))}
          </div>

          {movie.director && (
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Directed by{" "}
              <span className="text-gray-200">{movie.director}</span>
            </p>
          )}

          <p className="text-gray-300 leading-relaxed">{movie.plot}</p>

          {movie.boxOffice && movie.boxOffice !== "N/A" && (
            <p className="text-gray-400 text-sm mt-4">
              Box Office:{" "}
              <span className="text-green-400 font-semibold">
                {movie.boxOffice}
              </span>
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
