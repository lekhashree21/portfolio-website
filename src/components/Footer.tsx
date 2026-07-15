import { Github, Linkedin, Mail, Phone, Code2, Heart } from 'lucide-react';
import { profile } from '../data/portfolio';

export default function Footer() {
  const socials = [
    { icon: Github, href: profile.contact.github, label: 'GitHub' },
    { icon: Linkedin, href: profile.contact.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${profile.contact.email}`, label: 'Email' },
    { icon: Phone, href: `tel:${profile.contact.phone}`, label: 'Phone' },
  ];

  return (
    <footer className="border-t border-ink-200 dark:border-ink-800 bg-ink-50/50 dark:bg-ink-950">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#home" className="font-display font-bold text-lg">
              <span className="gradient-text">Lekhashree B</span>
            </a>
            <p className="text-sm text-ink-500 dark:text-ink-400">
              Full Stack Developer & AI/ML Enthusiast
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-ink-600 dark:text-ink-300 hover:text-brand-600 dark:hover:text-brand-400 hover:-translate-y-0.5 transition-all"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-ink-200 dark:border-ink-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-ink-500 dark:text-ink-400">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Lekhashree B. Built with
            <Heart size={14} className="text-brand-500 fill-brand-500" /> &
            <Code2 size={14} className="text-brand-500" />
          </p>
          <p className="flex items-center gap-3">
            Designed & developed with passion.
            <a href="/admin" className="text-ink-400 hover:text-brand-500 transition-colors">
              Admin
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
