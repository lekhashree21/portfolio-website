import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Github, ExternalLink, FolderGit2, X } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import TiltCard from '../components/TiltCard';
import { fetchProjects } from '../lib/api';
import type { Project } from '../lib/supabase';
import { staggerContainer, staggerItem } from '../lib/animations';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const allTechs = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.tech.forEach((t) => set.add(t)));
    return ['All', ...Array.from(set).sort()];
  }, [projects]);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesFilter = filter === 'All' || p.tech.includes(filter);
      return matchesSearch && matchesFilter;
    });
  }, [projects, search, filter]);

  return (
    <section id="projects" className="section-padding bg-white dark:bg-ink-900/30">
      <div className="container-max">
        <SectionHeading
          eyebrow="Projects"
          title="Featured Work"
          subtitle="A selection of projects spanning web development, AI/ML, IoT, and embedded systems."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-11 pr-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
            {allTechs.map((t) => (
              <motion.button
                key={t}
                onClick={() => setFilter(t)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  filter === t
                    ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/30'
                    : 'glass text-ink-600 dark:text-ink-300 hover:bg-white/90 dark:hover:bg-ink-800/80'
                }`}
              >
                {t}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="glass-card p-6 h-64 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        )}

        {error && (
          <div className="glass-card p-8 text-center text-red-500">
            Failed to load projects: {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="glass-card p-12 text-center text-ink-500">
            <FolderGit2 size={48} className="mx-auto mb-4 opacity-50" />
            <p>No projects match your search.</p>
          </div>
        )}

        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                variants={staggerItem}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <TiltCard
                  className="glass-card overflow-hidden cursor-pointer flex flex-col h-full"
                  maxTilt={10}
                >
                  <div
                    onClick={() => setSelected(project)}
                    className="flex flex-col h-full"
                    style={{ transform: 'translateZ(40px)' }}
                  >
                    <div className="relative h-40 bg-gradient-to-br from-brand-500/20 via-brand-600/10 to-brand-800/20 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark bg-[size:20px_20px] opacity-40" />
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <FolderGit2
                          size={48}
                          className="text-brand-500/60"
                        />
                      </motion.div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-display font-semibold text-base mb-2 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-ink-500 dark:text-ink-400 line-clamp-2 mb-4 flex-1">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.slice(0, 4).map((t) => (
                          <span key={t} className="badge text-xs">
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 4 && (
                          <span className="badge text-xs">
                            +{project.tech.length - 4}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={project.github_url ?? '#'}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm glass hover:bg-white/90 dark:hover:bg-ink-800/80 transition-colors"
                        >
                          <Github size={15} /> Code
                        </a>
                        <a
                          href={project.demo_url ?? '#'}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm bg-brand-500/10 text-brand-600 dark:text-brand-400 hover:bg-brand-500/20 transition-colors"
                        >
                          <ExternalLink size={15} /> Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[80] bg-ink-950/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-lg w-full max-h-[85vh] overflow-y-auto p-6"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-display font-bold text-xl pr-4">
                    {selected.title}
                  </h3>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelected(null)}
                    className="p-1.5 rounded-lg glass hover:bg-white/90 dark:hover:bg-ink-800/80"
                  >
                    <X size={18} />
                  </motion.button>
                </div>
                <p className="text-sm text-ink-600 dark:text-ink-300 mb-4 leading-relaxed">
                  {selected.description}
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="mb-4"
                >
                  <h4 className="text-sm font-semibold mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.tech.map((t) => (
                      <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="badge"
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-6"
                >
                  <h4 className="text-sm font-semibold mb-2">Key Features</h4>
                  <ul className="space-y-1.5">
                    {selected.features.map((f, fi) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + fi * 0.04 }}
                        className="text-sm text-ink-600 dark:text-ink-300 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 mt-1.5 shrink-0" />
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                <div className="flex gap-3">
                  <a
                    href={selected.github_url ?? '#'}
                    className="btn-ghost flex-1"
                  >
                    <Github size={18} /> GitHub
                  </a>
                  <a
                    href={selected.demo_url ?? '#'}
                    className="btn-primary flex-1"
                  >
                    <ExternalLink size={18} /> Live Demo
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
