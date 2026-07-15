import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Mail, ArrowLeft, Loader2, AlertCircle, UserPlus, LogIn } from 'lucide-react';
import { profile } from '../../data/portfolio';

type Props = {
  onSignIn: (email: string, password: string) => Promise<unknown>;
  onSignUp: (email: string, password: string) => Promise<unknown>;
  onBack: () => void;
};

export default function AdminLogin({ onSignIn, onSignUp, onBack }: Props) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInfo('');
    try {
      if (mode === 'signin') {
        await onSignIn(email, password);
      } else {
        await onSignUp(email, password);
        setInfo('Account created. You are now signed in.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-5 bg-ink-50 dark:bg-ink-950 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-light dark:bg-grid-dark bg-[size:40px_40px] opacity-40" />
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-brand-400/20 dark:bg-brand-600/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-brand-500/10 dark:bg-brand-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-premium rounded-3xl p-8 sm:p-10">
          <button
            onClick={onBack}
            className="text-sm text-ink-500 dark:text-ink-400 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1.5 mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to portfolio
          </button>

          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-brand-500/40"
            >
              <Lock size={28} />
            </motion.div>
            <h1 className="font-display text-2xl font-bold">Admin Access</h1>
            <p className="text-sm text-ink-500 dark:text-ink-400 mt-1">
              {mode === 'signin'
                ? 'Sign in to manage your projects'
                : 'Create an admin account'}
            </p>
          </div>

          <div className="flex gap-2 p-1 rounded-xl glass mb-6">
            {(['signin', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => {
                  setMode(m);
                  setError('');
                  setInfo('');
                }}
                className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
                  mode === m
                    ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/30'
                    : 'text-ink-600 dark:text-ink-300 hover:bg-white/50 dark:hover:bg-ink-800/50'
                }`}
              >
                {m === 'signin' ? <LogIn size={15} /> : <UserPlus size={15} />}
                {m === 'signin' ? 'Sign In' : 'Sign Up'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-11 pr-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Please wait...
                </>
              ) : mode === 'signin' ? (
                <>
                  <LogIn size={18} /> Sign In
                </>
              ) : (
                <>
                  <UserPlus size={18} /> Create Account
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 px-4 py-3 rounded-xl"
                >
                  <AlertCircle size={18} /> {error}
                </motion.div>
              )}
              {info && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 bg-green-500/10 px-4 py-3 rounded-xl"
                >
                  <AlertCircle size={18} /> {info}
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <p className="text-center text-xs text-ink-400 mt-6">
            Protected area for {profile.name}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
