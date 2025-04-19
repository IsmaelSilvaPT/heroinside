import { motion } from "framer-motion";

interface ModernTitleProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  gradientFrom?: string;
  gradientTo?: string;
}

export default function ModernTitle({
  children,
  className = "",
  size = "md",
  gradientFrom = "from-blue-600",
  gradientTo = "to-purple-600",
}: ModernTitleProps) {
  const sizeClasses = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
    xl: "text-5xl",
  };

  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${sizeClasses[size]} font-bold bg-clip-text text-transparent bg-gradient-to-r ${gradientFrom} ${gradientTo} ${className}`}
    >
      {children}
    </motion.h1>
  );
} 