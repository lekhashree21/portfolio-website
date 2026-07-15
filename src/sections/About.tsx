import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { profile } from '../data/portfolio';
import { slideInLeft, slideInRight, staggerContainer, staggerItem } from '../lib/animations';

export default function About() {
  return (
    <section id="about" className="section-padding bg-white dark:bg-ink-900/30">
      <div className="container-max">
        <SectionHeading eyebrow="About Me" title="Who I Am" />

        <div className="grid md:grid-cols-5 gap-8 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="md:col-span-2"
          >
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="aspect-square rounded-3xl glass-card overflow-hidden p-8 flex items-center justify-center"
              >
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-700/20 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-2xl shadow-brand-500/40"
                  >
                    <User size={64} />
                  </motion.div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -right-4 glass-card px-4 py-2 text-sm font-mono text-brand-600 dark:text-brand-400"
              >
                &lt;/&gt;
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="md:col-span-3"
          >
            <div className="glass-card p-8">
              <h3 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
                <motion.span
                  initial={{ height: 0 }}
                  whileInView={{ height: 24 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="w-1.5 rounded-full bg-brand-500 overflow-hidden"
                />
                Professional Summary
              </h3>
              <p className="text-ink-600 dark:text-ink-300 leading-relaxed text-base">
                {profile.summary}
              </p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delayChildren: 0.3 }}
                className="mt-6 flex flex-wrap gap-2"
              >
                {['Full Stack Development', 'AI & ML', 'Cloud Computing', 'IoT'].map(
                  (tag) => (
                    <motion.span
                      key={tag}
                      variants={staggerItem}
                      whileHover={{ scale: 1.08, y: -2 }}
                      className="badge"
                    >
                      {tag}
                    </motion.span>
                  )
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
