import { motion, HTMLMotionProps } from "framer-motion";

interface ModernButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export default function ModernButton({
  children,
  className = "",
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}: ModernButtonProps) {
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? "w-full" : ""}
        rounded-lg font-medium transition-all duration-300
        shadow-sm hover:shadow-md
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
} 