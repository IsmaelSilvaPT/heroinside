import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ModernCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function ModernCard({ className, children, ...props }: ModernCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
} 