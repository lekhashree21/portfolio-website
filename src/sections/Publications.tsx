import { motion } from 'framer-motion';
import { FileText, BookOpen, Users, Star } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { publications, leadership } from '../data/portfolio';
import { slideInLeft, slideInRight, staggerItem, staggerContainer } from '../lib/animations';

export default function Publications() {
  return (
    <section
      id="publications"
      className="section-padding bg-white dark:bg-ink-900/30"
    >
      <div className="container-max">
        <SectionHeading
          eyebrow="Publications & Leadership"
          title="Research & Community"
        />

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-card p-6 h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-500/30"
                >
                  <FileText size={20} />
                </motion.div>
                <h3 className="font-display font-semibold text-lg">Publications</h3>
              </div>
              {publications.map((pub, pi) => (
                <motion.div
                  key={pub.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: pi * 0.15 + 0.2 }}
                  className="border-l-2 border-brand-500 pl-4 py-2"
                >
                  <span className="badge mb-2">{pub.type}</span>
                  <h4 className="font-medium text-sm">{pub.title}</h4>
                  <p className="text-xs text-ink-500 dark:text-ink-400 mt-1 flex items-start gap-1.5">
                    <BookOpen size={14} className="shrink-0 mt-0.5" />
                    {pub.venue}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-card p-6 h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-500/30"
                >
                  <Users size={20} />
                </motion.div>
                <h3 className="font-display font-semibold text-lg">Leadership</h3>
              </div>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delayChildren: 0.2 }}
                className="space-y-3"
              >
                {leadership.map((item) => (
                  <motion.li
                    key={item}
                    variants={staggerItem}
                    whileHover={{ x: 8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="flex items-center gap-3 text-sm text-ink-600 dark:text-ink-300"
                  >
                    <motion.span
                      whileHover={{ rotate: 360, scale: 1.3 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Star size={16} className="text-brand-500 shrink-0" />
                    </motion.span>
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
