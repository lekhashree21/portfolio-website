import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { skillCategories } from '../data/portfolio';
import { staggerContainer, staggerItem } from '../lib/animations';

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-ink-50/50 dark:bg-ink-950">
      <div className="container-max">
        <SectionHeading
          eyebrow="Skills"
          title="Technical Expertise"
          subtitle="A comprehensive toolkit spanning frontend, backend, AI/ML, cloud, and embedded systems."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((cat) => (
            <motion.div
              key={cat.name}
              variants={staggerItem}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="glass-card p-6 h-full"
            >
              <div className="flex items-center gap-3 mb-5">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-500/30"
                >
                  {(() => {
                    const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[cat.icon] ?? Icons.Code2;
                    return <Icon size={20} />;
                  })()}
                </motion.div>
                <h3 className="font-display font-semibold text-lg">{cat.name}</h3>
              </div>

              <div className="space-y-3">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-ink-700 dark:text-ink-200">
                        {skill.name}
                      </span>
                      <span className="text-ink-400 font-mono text-xs">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-ink-200 dark:bg-ink-800 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: si * 0.08,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
