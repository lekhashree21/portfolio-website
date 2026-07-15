import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import AnimatedCounter from '../components/AnimatedCounter';
import { achievements } from '../data/portfolio';
import { staggerContainer, staggerItem } from '../lib/animations';

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="section-padding bg-ink-50/50 dark:bg-ink-950"
    >
      <div className="container-max">
        <SectionHeading
          eyebrow="Achievements"
          title="Milestones & Recognition"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {achievements.map((a) => {
            const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[a.icon] ?? Icons.Award;
            return (
              <motion.div
                key={a.label}
                variants={staggerItem}
                whileHover={{ y: -8, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass-card p-6 text-center h-full"
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-brand-500/30"
                >
                  <Icon size={22} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="font-display text-3xl font-extrabold gradient-text"
                >
                  <AnimatedCounter value={a.value} suffix={a.suffix} />
                </motion.div>
                <p className="mt-2 text-sm text-ink-500 dark:text-ink-400 leading-snug">
                  {a.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
