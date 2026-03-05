"use client";

import { motion } from "framer-motion";

export default function LoadingSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 mt-12">
      {/* Movie Details Skeleton */}
      <motion.div
        className="glass-card rounded-2xl p-6 md:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="w-[250px] h-[375px] rounded-xl skeleton" />
          </div>
          <div className="flex-1 space-y-4">
            <div className="h-10 w-3/4 skeleton rounded" />
            <div className="h-4 w-1/2 skeleton rounded" />
            <div className="flex gap-2">
              <div className="h-8 w-20 skeleton rounded-full" />
              <div className="h-8 w-20 skeleton rounded-full" />
              <div className="h-8 w-20 skeleton rounded-full" />
            </div>
            <div className="flex gap-3">
              <div className="h-10 w-28 skeleton rounded-lg" />
              <div className="h-10 w-28 skeleton rounded-lg" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full skeleton rounded" />
              <div className="h-4 w-full skeleton rounded" />
              <div className="h-4 w-2/3 skeleton rounded" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cast Skeleton */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <div className="h-8 w-24 skeleton rounded mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="text-center">
              <div className="w-20 h-20 mx-auto mb-3 skeleton rounded-full" />
              <div className="h-4 w-16 mx-auto skeleton rounded" />
              <div className="h-3 w-12 mx-auto mt-1 skeleton rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Sentiment Skeleton */}
      <div className="glass-card rounded-2xl p-6 md:p-8">
        <div className="h-8 w-56 skeleton rounded mb-6" />
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 skeleton rounded-full" />
          <div className="h-8 w-28 skeleton rounded-full" />
        </div>
        <div className="h-24 w-full skeleton rounded-xl mb-6" />
        <div className="flex gap-2">
          <div className="h-8 w-24 skeleton rounded-full" />
          <div className="h-8 w-20 skeleton rounded-full" />
          <div className="h-8 w-28 skeleton rounded-full" />
        </div>
      </div>
    </div>
  );
}
