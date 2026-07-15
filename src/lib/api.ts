import type { Project } from '../lib/supabase';
import { supabase } from '../lib/supabase';

// Backend selection: set VITE_API_BASE_URL in .env to use the Express/MongoDB backend.
// If unset, the frontend defaults to Supabase.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;
const USE_EXPRESS = Boolean(API_BASE_URL);

// --- Express/MongoDB helpers ---

async function expressFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed (${res.status})`);
  }
  return res.json();
}

function mapExpressProject(p: Record<string, unknown>): Project {
  return {
    id: String(p._id ?? p.id),
    title: p.title as string,
    description: p.description as string,
    tech: (p.tech as string[]) ?? [],
    features: (p.features as string[]) ?? [],
    image_url: (p.imageUrl as string) ?? null,
    github_url: (p.githubUrl as string) ?? null,
    demo_url: (p.demoUrl as string) ?? null,
    sort_order: (p.sortOrder as number) ?? 0,
    created_at: (p.createdAt as string) ?? new Date().toISOString(),
  };
}

// --- Public API ---

export async function fetchProjects(): Promise<Project[]> {
  if (USE_EXPRESS) {
    const data = await expressFetch<Record<string, unknown>[]>('/api/projects');
    return data.map(mapExpressProject);
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createProject(
  payload: Omit<Project, 'id' | 'created_at'>
): Promise<Project> {
  if (USE_EXPRESS) {
    const data = await expressFetch<Record<string, unknown>>('/api/projects', {
      method: 'POST',
      body: JSON.stringify({
        title: payload.title,
        description: payload.description,
        tech: payload.tech,
        features: payload.features,
        imageUrl: payload.image_url,
        githubUrl: payload.github_url,
        demoUrl: payload.demo_url,
        sortOrder: payload.sort_order,
      }),
    });
    return mapExpressProject(data);
  }

  const { data, error } = await supabase
    .from('projects')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateProject(
  id: string,
  payload: Partial<Project>
): Promise<Project> {
  if (USE_EXPRESS) {
    const data = await expressFetch<Record<string, unknown>>(
      `/api/projects/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          title: payload.title,
          description: payload.description,
          tech: payload.tech,
          features: payload.features,
          imageUrl: payload.image_url,
          githubUrl: payload.github_url,
          demoUrl: payload.demo_url,
          sortOrder: payload.sort_order,
        }),
      }
    );
    return mapExpressProject(data);
  }

  const { data, error } = await supabase
    .from('projects')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteProject(id: string): Promise<void> {
  if (USE_EXPRESS) {
    await expressFetch(`/api/projects/${id}`, { method: 'DELETE' });
    return;
  }

  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

export async function submitContactMessage(
  name: string,
  email: string,
  message: string
): Promise<void> {
  if (USE_EXPRESS) {
    await expressFetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ name, email, message }),
    });
    return;
  }

  const { error } = await supabase
    .from('contact_messages')
    .insert({ name, email, message });
  if (error) throw error;
}
