import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ModernBadgeProps {
  icon: string;
  title: string;
  description: string;
  unlocked?: boolean;
  category?: string;
  className?: string;
}

export default function ModernBadge({
  icon,
  title,
  description,
  unlocked = false,
  category,
  className = "",
}: ModernBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className={`relative overflow-hidden rounded-xl p-6 ${
        unlocked
          ? "bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200"
          : "bg-gray-50 border border-gray-200"
      } ${className}`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`text-4xl p-3 rounded-lg ${
            unlocked
              ? "bg-gradient-to-br from-blue-100 to-purple-100"
              : "bg-gray-100"
          }`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3
            className={`text-lg font-semibold ${
              unlocked ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
          {category && (
            <span className="inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
              {category}
            </span>
          )}
        </div>
      </div>
      {!unlocked && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center">
          <span className="text-gray-400 text-sm">À débloquer</span>
        </div>
      )}
    </motion.div>
  );
} 