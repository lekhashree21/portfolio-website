import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Download, Mail } from 'lucide-react';
import TypingAnimation from '../components/TypingAnimation';
import ParticleField from '../components/ParticleField';
import MagneticButton from '../components/MagneticButton';
import { profile } from '../data/portfolio';
import { staggerContainer, staggerItem } from '../lib/animations';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink-50 dark:bg-ink-950"
    >
      <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark bg-[size:40px_40px] opacity-60" />
      <div className="absolute inset-0">
        <ParticleField />
      </div>
      <motion.div
        style={{ scale }}
        className="absolute top-1/4 left-1/4 w-72 h-72 bg-brand-400/20 dark:bg-brand-600/20 rounded-full blur-3xl animate-float"
      />
      <motion.div
        style={{ scale }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/15 rounded-full blur-3xl animate-float"
      />

      <motion.div
        style={{ y: yText, opacity, scale }}
        className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center pt-20 pb-12"
      >
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          <motion.span variants={staggerItem} className="badge mb-6 inline-block">
            Available for opportunities
          </motion.span>

          <motion.h1
            variants={staggerItem}
            className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
          >
            {profile.name}
          </motion.h1>

          <motion.div
            variants={staggerItem}
            className="mt-4 text-xl sm:text-2xl font-mono font-medium text-brand-600 dark:text-brand-400 h-8"
          >
            <TypingAnimation words={profile.roles} />
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="mt-6 text-base sm:text-lg text-ink-600 dark:text-ink-400 max-w-2xl mx-auto leading-relaxed"
          >
            Final-year ECE student crafting impactful software at the
            intersection of full-stack development, AI/ML, and IoT.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton href="#projects" className="btn-primary">
              View Projects <ArrowRight size={18} />
            </MagneticButton>
            <MagneticButton
              href={profile.contact.resume}
              className="btn-ghost"
            >
              <Download size={18} /> Download Resume
            </MagneticButton>
            <MagneticButton href="#contact" className="btn-ghost">
              <Mail size={18} /> Contact Me
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-ink-400"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 rounded-full border-2 border-ink-300 dark:border-ink-600 flex justify-center pt-1.5"
          >
            <div className="w-1 h-1.5 rounded-full bg-brand-500" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
