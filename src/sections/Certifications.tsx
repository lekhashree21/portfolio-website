import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as Icons from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { certifications } from '../data/portfolio';
import { staggerContainer, staggerItem } from '../lib/animations';

export default function Certifications() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start end', 'end start'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['-5%', '-60%']);

  return (
    <section
      id="certifications"
      className="section-padding bg-white dark:bg-ink-900/30 overflow-hidden"
    >
      <div className="container-max">
        <SectionHeading
          eyebrow="Certifications"
          title="Professional Certifications"
          subtitle="Continuous learning across AI, cloud, networking, and cybersecurity."
        />
      </div>

      <motion.div
        ref={trackRef}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        style={{ x }}
        className="flex gap-5 px-5 sm:px-8"
      >
        {[...certifications, ...certifications].map((cert, i) => {
          const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[cert.icon] ?? Icons.Award;
          return (
            <motion.div
              key={i}
              variants={staggerItem}
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="shrink-0 w-72 glass-card p-6"
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.15 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white mb-4 shadow-lg shadow-brand-500/30"
              >
                <Icon size={22} />
              </motion.div>
              <h3 className="font-display font-semibold text-base mb-1">
                {cert.name}
              </h3>
              <p className="text-sm text-ink-500 dark:text-ink-400">
                {cert.issuer}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
