import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { staggerContainer, staggerItem } from '../lib/animations';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 dark:bg-ink-950 px-5">
      <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark bg-[size:40px_40px] opacity-40" />
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center"
      >
        <motion.h1
          variants={staggerItem}
          className="font-display text-7xl sm:text-9xl font-extrabold gradient-text"
        >
          404
        </motion.h1>
        <motion.p
          variants={staggerItem}
          className="mt-4 text-xl font-medium text-ink-700 dark:text-ink-200"
        >
          Page Not Found
        </motion.p>
        <motion.p
          variants={staggerItem}
          className="mt-2 text-ink-500 dark:text-ink-400 max-w-md"
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        <motion.div
          variants={staggerItem}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <motion.a
            href="/#home"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            <Home size={18} /> Back Home
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()}
            className="btn-ghost"
          >
            <ArrowLeft size={18} /> Go Back
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
