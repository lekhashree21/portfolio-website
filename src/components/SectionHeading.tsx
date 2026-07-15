import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { staggerContainer, staggerItem } from '../lib/animations';

type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: Props) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {eyebrow && (
        <motion.span variants={staggerItem} className="badge mb-3 inline-block">
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        variants={staggerItem}
        className="font-display text-3xl sm:text-4xl font-bold tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={staggerItem}
          className="mt-3 text-ink-500 dark:text-ink-400 max-w-2xl mx-auto text-base"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
