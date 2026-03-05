"use client";

import { motion } from "framer-motion";
import { Review } from "@/types";

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <motion.div
      className="glass-card rounded-2xl p-6 md:p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h3 className="text-2xl font-bold text-white mb-6">
        Audience Reviews ({reviews.length})
      </h3>
      <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
        {reviews.slice(0, 5).map((review, index) => (
          <motion.div
            key={index}
            className="bg-gray-800/30 rounded-xl p-4 border border-gray-700/30"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 font-medium text-sm">
                {review.author}
              </span>
              {review.rating && (
                <span className="text-yellow-400 text-sm">
                  ⭐ {review.rating}/10
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
              {review.content}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
