"use client";

import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      className="text-center pt-16 pb-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className="text-4xl">🎬</span>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          AI Movie Insight Builder
        </h1>
      </div>
      <p className="text-gray-400 text-lg max-w-md mx-auto">
        Enter an IMDb ID to discover movie insights powered by AI
      </p>
    </motion.header>
  );
}
