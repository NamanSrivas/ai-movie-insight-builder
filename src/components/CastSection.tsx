"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CastMember } from "@/types";

interface CastSectionProps {
  cast: CastMember[];
}

export default function CastSection({ cast }: CastSectionProps) {
  if (!cast || cast.length === 0) return null;

  return (
    <motion.div
      className="glass-card rounded-2xl p-6 md:p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <h3 className="text-2xl font-bold text-white mb-6">Cast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {cast.map((member, index) => (
          <motion.div
            key={member.name}
            className="text-center group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <div className="relative w-20 h-20 mx-auto mb-3 rounded-full overflow-hidden border-2 border-gray-700 group-hover:border-blue-500/50 transition-colors duration-300">
              {member.image ? (
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 text-2xl">
                  👤
                </div>
              )}
            </div>
            <p className="text-white text-sm font-medium truncate">
              {member.name}
            </p>
            <p className="text-gray-500 text-xs truncate">{member.character}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
