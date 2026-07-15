import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  LogOut,
  ExternalLink,
  GripVertical,
  FolderGit2,
  Loader2,
  AlertCircle,
  Save,
  Mail,
  Inbox,
} from 'lucide-react';
import type { Project, ContactMessage } from '../../lib/supabase';
import { supabase } from '../../lib/supabase';
import { fetchProjects, createProject, updateProject, deleteProject } from '../../lib/api';
import { profile } from '../../data/portfolio';

type EditState = {
  id: string | null;
  title: string;
  description: string;
  tech: string;
  features: string;
  image_url: string;
  github_url: string;
  demo_url: string;
  sort_order: number;
};

const emptyForm: EditState = {
  id: null,
  title: '',
  description: '',
  tech: '',
  features: '',
  image_url: '',
  github_url: '',
  demo_url: '',
  sort_order: 0,
};

export default function AdminDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'projects' | 'messages'>('projects');
  const [editing, setEditing] = useState<EditState | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [p, m] = await Promise.all([
        fetchProjects(),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
      ]);
      setProjects(p);
      setMessages(m.data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const startEdit = (p: Project) => {
    setEditing({
      id: p.id,
      title: p.title,
      description: p.description,
      tech: p.tech.join(', '),
      features: p.features.join('\n'),
      image_url: p.image_url ?? '',
      github_url: p.github_url ?? '',
      demo_url: p.demo_url ?? '',
      sort_order: p.sort_order,
    });
  };

  const startNew = () => {
    setEditing({ ...emptyForm, sort_order: projects.length + 1 });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    setError('');
    try {
      const payload = {
        title: editing.title,
        description: editing.description,
        tech: editing.tech.split(',').map((t) => t.trim()).filter(Boolean),
        features: editing.features.split('\n').map((f) => f.trim()).filter(Boolean),
        image_url: editing.image_url || null,
        github_url: editing.github_url || null,
        demo_url: editing.demo_url || null,
        sort_order: editing.sort_order,
      };
      if (editing.id) {
        await updateProject(editing.id, payload);
      } else {
        await createProject(payload);
      }
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteProject(deleteId);
      setDeleteId(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const handleDeleteMessage = async (id: string) => {
    try {
      await supabase.from('contact_messages').delete().eq('id', id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-ink-50 dark:bg-ink-950">
      {/* Top bar */}
      <header className="sticky top-0 z-40 glass-premium !bg-white/80 dark:!bg-ink-950/80 border-b border-white/30 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <FolderGit2 size={18} />
            </div>
            <div>
              <h1 className="font-display font-bold text-sm">Admin Dashboard</h1>
              <p className="text-xs text-ink-400">{profile.name} — Portfolio Manager</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-ink-500 dark:text-ink-400 hover:text-brand-600 dark:hover:text-brand-400 flex items-center gap-1.5 transition-colors">
              <ExternalLink size={15} /> View Site
            </a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSignOut}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors flex items-center gap-1.5"
            >
              <LogOut size={15} /> Sign Out
            </motion.button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 px-4 py-3 rounded-xl mb-6"
          >
            <AlertCircle size={18} /> {error}
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 p-1 rounded-xl glass mb-8 max-w-xs">
          <button
            onClick={() => setTab('projects')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
              tab === 'projects'
                ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/30'
                : 'text-ink-600 dark:text-ink-300'
            }`}
          >
            <FolderGit2 size={15} /> Projects
          </button>
          <button
            onClick={() => setTab('messages')}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1.5 ${
              tab === 'messages'
                ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/30'
                : 'text-ink-600 dark:text-ink-300'
            }`}
          >
            <Inbox size={15} /> Messages
            {messages.length > 0 && (
              <span className="ml-0.5 px-1.5 py-0.5 rounded-full text-xs bg-brand-500 text-white">
                {messages.length}
              </span>
            )}
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-brand-500" />
          </div>
        ) : tab === 'projects' ? (
          <ProjectsTab
            projects={projects}
            onNew={startNew}
            onEdit={startEdit}
            onDelete={setDeleteId}
          />
        ) : (
          <MessagesTab messages={messages} onDelete={handleDeleteMessage} />
        )}
      </main>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {editing && (
          <ProjectModal
            editing={editing}
            setEditing={setEditing}
            onSave={handleSave}
            saving={saving}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteId && (
          <DeleteConfirm
            onCancel={() => setDeleteId(null)}
            onConfirm={handleDelete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectsTab({
  projects,
  onNew,
  onEdit,
  onDelete,
}: {
  projects: Project[];
  onNew: () => void;
  onEdit: (p: Project) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl font-semibold">
          Projects ({projects.length})
        </h2>
      </div>

      <motion.button
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNew}
        className="btn-primary mb-6"
      >
        <Plus size={18} /> Add New Project
      </motion.button>

      <div className="space-y-3">
        {projects.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -2 }}
            className="glass-premium rounded-2xl p-5 flex items-start gap-4"
          >
            <div className="hidden sm:flex items-center text-ink-300 mt-1">
              <GripVertical size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-ink-400">
                  #{p.sort_order}
                </span>
                <h3 className="font-display font-semibold text-sm sm:text-base truncate">
                  {p.title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-ink-500 dark:text-ink-400 line-clamp-2 mb-2">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="badge text-xs">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(p)}
                className="p-2 rounded-lg glass hover:bg-brand-500/10 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                aria-label="Edit"
              >
                <Pencil size={16} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(p.id)}
                className="p-2 rounded-lg glass hover:bg-red-500/10 hover:text-red-500 transition-colors"
                aria-label="Delete"
              >
                <Trash2 size={16} />
              </motion.button>
            </div>
          </motion.div>
        ))}

        {projects.length === 0 && (
          <div className="glass-card p-12 text-center text-ink-500">
            <FolderGit2 size={48} className="mx-auto mb-4 opacity-50" />
            <p>No projects yet. Click "Add New Project" to create one.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function MessagesTab({
  messages,
  onDelete,
}: {
  messages: ContactMessage[];
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="font-display text-xl font-semibold mb-6">
        Contact Messages ({messages.length})
      </h2>

      <div className="space-y-3">
        {messages.map((m, i) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-premium rounded-2xl p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{m.name}</h3>
                    <a
                      href={`mailto:${m.email}`}
                      className="text-xs text-brand-600 dark:text-brand-400 flex items-center gap-1"
                    >
                      <Mail size={11} /> {m.email}
                    </a>
                  </div>
                </div>
                <p className="text-sm text-ink-600 dark:text-ink-300 mt-2 leading-relaxed">
                  {m.message}
                </p>
                <p className="text-xs text-ink-400 mt-2">
                  {new Date(m.created_at).toLocaleString()}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(m.id)}
                className="p-2 rounded-lg glass hover:bg-red-500/10 hover:text-red-500 transition-colors shrink-0"
                aria-label="Delete message"
              >
                <Trash2 size={16} />
              </motion.button>
            </div>
          </motion.div>
        ))}

        {messages.length === 0 && (
          <div className="glass-card p-12 text-center text-ink-500">
            <Inbox size={48} className="mx-auto mb-4 opacity-50" />
            <p>No messages yet.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ProjectModal({
  editing,
  setEditing,
  onSave,
  saving,
}: {
  editing: EditState;
  setEditing: (e: EditState | null) => void;
  onSave: (e: React.FormEvent) => void;
  saving: boolean;
}) {
  const update = (field: keyof EditState, value: string | number) =>
    setEditing({ ...editing, [field]: value });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setEditing(null)}
      className="fixed inset-0 z-[80] bg-ink-950/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-premium rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="font-display font-bold text-xl">
            {editing.id ? 'Edit Project' : 'New Project'}
          </h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setEditing(null)}
            className="p-1.5 rounded-lg glass hover:bg-white/90 dark:hover:bg-ink-800/80"
          >
            <X size={18} />
          </motion.button>
        </div>

        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Title</label>
            <input
              type="text"
              value={editing.title}
              onChange={(e) => update('title', e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
              placeholder="Project title"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Description</label>
            <textarea
              value={editing.description}
              onChange={(e) => update('description', e.target.value)}
              required
              rows={3}
              className="w-full px-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-brand-500/40 transition-all resize-none"
              placeholder="Project description"
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Tech (comma-separated)
              </label>
              <input
                type="text"
                value={editing.tech}
                onChange={(e) => update('tech', e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                placeholder="React, Node.js, MongoDB"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Sort Order</label>
              <input
                type="number"
                value={editing.sort_order}
                onChange={(e) => update('sort_order', Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Features (one per line)
            </label>
            <textarea
              value={editing.features}
              onChange={(e) => update('features', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-brand-500/40 transition-all resize-none font-mono"
              placeholder={'Feature one\nFeature two\nFeature three'}
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Image URL</label>
              <input
                type="text"
                value={editing.image_url}
                onChange={(e) => update('image_url', e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">GitHub URL</label>
              <input
                type="text"
                value={editing.github_url}
                onChange={(e) => update('github_url', e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Demo URL</label>
              <input
                type="text"
                value={editing.demo_url}
                onChange={(e) => update('demo_url', e.target.value)}
                className="w-full px-4 py-3 rounded-xl glass text-sm outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <motion.button
              type="submit"
              disabled={saving}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save size={18} /> {editing.id ? 'Update' : 'Create'} Project
                </>
              )}
            </motion.button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function DeleteConfirm({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
      className="fixed inset-0 z-[80] bg-ink-950/60 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-premium rounded-3xl max-w-sm w-full p-6 text-center"
      >
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={28} />
        </div>
        <h3 className="font-display font-bold text-lg mb-2">Delete Project?</h3>
        <p className="text-sm text-ink-500 dark:text-ink-400 mb-6">
          This action cannot be undone. The project will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="btn-ghost flex-1">
            Cancel
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-500/30 transition-all"
          >
            <Trash2 size={18} /> Delete
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
