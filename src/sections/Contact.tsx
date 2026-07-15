import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  Linkedin,
  Github,
  Code2,
  FileDown,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { submitContactMessage } from '../lib/api';
import { profile } from '../data/portfolio';
import { staggerContainer, staggerItem } from '../lib/animations';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      await submitContactMessage(name.trim(), email.trim(), message.trim());
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  const contactItems = [
    { icon: Phone, label: 'Phone', value: profile.contact.phone, href: `tel:${profile.contact.phone}` },
    { icon: Mail, label: 'Email', value: profile.contact.email, href: `mailto:${profile.contact.email}` },
    { icon: Linkedin, label: 'LinkedIn', value: 'Connect on LinkedIn', href: profile.contact.linkedin },
    { icon: Github, label: 'GitHub', value: 'View GitHub Profile', href: profile.contact.github },
    { icon: Code2, label: 'LeetCode', value: 'View LeetCode Profile', href: profile.contact.leetcode },
    { icon: FileDown, label: 'Resume', value: 'Download Resume', href: profile.contact.resume },
  ];

  return (
    <section id="contact" className="section-padding bg-ink-50/50 dark:bg-ink-950">
      <div className="container-max">
        <SectionHeading
          eyebrow="Contact"
          title="Get In Touch"
          subtitle="Have a project idea or an opportunity? Let's connect."
        />

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {contactItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                variants={staggerItem}
                whileHover={{ y: -6, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="glass-card p-5 group"
              >
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.15 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-3 group-hover:bg-brand-500 group-hover:text-white transition-colors"
                >
                  <item.icon size={18} />
                </motion.div>
                <p className="text-xs text-ink-400 uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-sm font-medium mt-1 truncate">{item.value}</p>
              </motion.a>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass-card p-6"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <label className="text-sm font-medium mb-1.5 block">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                  placeholder="Your name"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
              >
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                  placeholder="you@example.com"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <label className="text-sm font-medium mb-1.5 block">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-brand-500/40 transition-all resize-none"
                  placeholder="Your message..."
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={status === 'loading'}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-500/10 px-4 py-3 rounded-xl"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    >
                      <CheckCircle2 size={18} />
                    </motion.span>
                    Message sent successfully!
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 px-4 py-3 rounded-xl"
                  >
                    <AlertCircle size={18} /> {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
