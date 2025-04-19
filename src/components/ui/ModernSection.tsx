import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ReactNode } from "react";

interface ModernSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export default function ModernSection({
  children,
  className = "",
  title,
  description,
  ...props
}: ModernSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn('w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}
      {...props}
    >
      <div className="max-w-4xl mx-auto px-4">
        {(title || description) && (
          <div className="mb-8 text-center">
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2"
              >
                {title}
              </motion.h2>
            )}
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-gray-600 text-lg"
              >
                {description}
              </motion.p>
            )}
          </div>
        )}
        <div className="space-y-6">{children}</div>
      </div>
    </motion.section>
  );
} 