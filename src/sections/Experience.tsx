import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { education, internships } from '../data/portfolio';
import { slideInLeft, slideInRight } from '../lib/animations';

export default function Experience() {
  const allEntries = [
    ...education.map((e) => ({ ...e, kind: 'education' as const })),
    ...internships.map((i) => ({ ...i, kind: 'internship' as const })),
  ];

  return (
    <section
      id="experience"
      className="section-padding bg-ink-50/50 dark:bg-ink-950"
    >
      <div className="container-max">
        <SectionHeading
          eyebrow="Journey"
          title="Education & Experience"
          subtitle="My academic path and hands-on industry internships."
        />

        <div className="relative">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ originY: 0 }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-500 via-brand-400 to-brand-600 md:-translate-x-1/2"
          />

          <div className="space-y-8">
            {allEntries.map((entry, i) => {
              const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[entry.icon] ?? Icons.GraduationCap;
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  variants={isLeft ? slideInLeft : slideInRight}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.1 + 0.2 }}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-500/40 ring-4 ring-ink-50 dark:ring-ink-950"
                    >
                      <Icon size={16} />
                    </motion.div>
                  </div>

                  <div
                    className={`ml-14 md:ml-0 md:w-1/2 ${
                      isLeft ? 'md:pr-12' : 'md:pl-12'
                    }`}
                  >
                    <motion.div
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      className="glass-card p-6"
                    >
                      <span className="badge mb-3">
                        {entry.kind === 'education' ? 'Education' : 'Internship'}
                      </span>
                      {entry.kind === 'education' ? (
                        <>
                          <h3 className="font-display font-semibold text-lg">
                            {entry.degree}
                          </h3>
                          <p className="text-brand-600 dark:text-brand-400 font-medium text-sm mt-1">
                            {entry.field}
                          </p>
                          <p className="text-ink-600 dark:text-ink-300 text-sm mt-1">
                            {entry.institution} — {entry.location}
                          </p>
                          <p className="text-ink-400 text-xs font-mono mt-2">
                            {entry.period}
                          </p>
                        </>
                      ) : (
                        <>
                          <h3 className="font-display font-semibold text-lg">
                            {entry.role}
                          </h3>
                          <p className="text-brand-600 dark:text-brand-400 font-medium text-sm mt-1">
                            {entry.company}
                          </p>
                          <ul className="mt-3 space-y-1.5">
                            {entry.points.map((p, pi) => (
                              <motion.li
                                key={p}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 + pi * 0.05 + 0.3 }}
                                className="text-sm text-ink-600 dark:text-ink-300 flex items-start gap-2"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                                {p}
                              </motion.li>
                            ))}
                          </ul>
                        </>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
