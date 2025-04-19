import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ModernGridProps {
  children: ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4;
}

export default function ModernGrid({
  children,
  className = "",
  cols = 2,
}: ModernGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`grid ${gridCols[cols]} gap-6 ${className}`}
    >
      {children}
    </motion.div>
  );
} 