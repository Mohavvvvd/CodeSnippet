import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`rounded-full border-t-2 border-b-2 border-blue-500 ${sizes[size]}`}
    />
  );
};

export default LoadingSpinner;