"use client";

import { motion } from "framer-motion";
import { SentimentAnalysis } from "@/types";

interface SentimentSectionProps {
  sentiment: SentimentAnalysis;
  reviewCount: number;
}

const SENTIMENT_CONFIG = {
  positive: {
    emoji: "😊",
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
  },
  mixed: {
    emoji: "😐",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
  },
  negative: {
    emoji: "😞",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
  },
} as const;

export default function SentimentSection({
  sentiment,
  reviewCount,
}: SentimentSectionProps) {
  const config =
    SENTIMENT_CONFIG[sentiment.sentiment] || SENTIMENT_CONFIG.mixed;

  return (
    <motion.div
      className="glass-card rounded-2xl p-6 md:p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <h3 className="text-2xl font-bold text-white mb-6">
        AI Sentiment Analysis
      </h3>

      {/* Sentiment badge */}
      <div className="flex items-center gap-4 mb-6">
        <motion.div
          className="text-4xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.6 }}
        >
          {config.emoji}
        </motion.div>
        <div>
          <span
            className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${config.bg} ${config.color} ${config.border} border`}
          >
            {sentiment.sentiment}
          </span>
          <p className="text-gray-500 text-xs mt-1">
            Based on {reviewCount} review{reviewCount !== 1 ? "s" : ""}
            {reviewCount === 0 ? " (rating-based analysis)" : ""}
          </p>
        </div>
      </div>

      {/* AI-generated summary */}
      <div className="bg-gray-800/30 rounded-xl p-5 mb-6 border border-gray-700/30">
        <p className="text-gray-300 leading-relaxed italic">
          &ldquo;{sentiment.summary}&rdquo;
        </p>
      </div>

      {/* Key themes as tags */}
      {sentiment.keyThemes && sentiment.keyThemes.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
            Key Themes
          </h4>
          <div className="flex flex-wrap gap-2">
            {sentiment.keyThemes.map((theme, index) => (
              <motion.span
                key={theme}
                className={`px-3 py-1.5 rounded-full text-sm ${config.bg} ${config.color} ${config.border} border`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              >
                {theme}
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
