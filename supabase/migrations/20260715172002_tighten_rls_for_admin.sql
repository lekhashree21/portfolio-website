/*
# Tighten RLS: admin-only writes, public reads

1. Changes to `projects` table policies
   - SELECT: public (anon + authenticated) — anyone can view projects on the portfolio.
   - INSERT / UPDATE / DELETE: authenticated only — only logged-in admins can manage projects.
   - The previous anon write policies are dropped.

2. Changes to `contact_messages` table policies
   - INSERT: public (anon + authenticated) — anyone can submit a contact form.
   - SELECT / DELETE: authenticated only — only logged-in admins can read or delete messages.
   - The previous anon select/delete policies are dropped.

3. Security
   - RLS remains enabled on both tables.
   - This enforces that the admin dashboard (which uses Supabase auth) is the only way to mutate project data or read/delete contact messages.
*/

-- Projects: public SELECT, authenticated-only writes
DROP POLICY IF EXISTS "anon_select_projects" ON projects;
DROP POLICY IF EXISTS "anon_insert_projects" ON projects;
DROP POLICY IF EXISTS "anon_update_projects" ON projects;
DROP POLICY IF EXISTS "anon_delete_projects" ON projects;

CREATE POLICY "public_select_projects" ON projects FOR SELECT
  TO anon, authenticated USING (true);

CREATE POLICY "admin_insert_projects" ON projects FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "admin_update_projects" ON projects FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "admin_delete_projects" ON projects FOR DELETE
  TO authenticated USING (true);

-- Contact messages: public INSERT, authenticated-only SELECT/DELETE
DROP POLICY IF EXISTS "anon_insert_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "anon_select_contact_messages" ON contact_messages;
DROP POLICY IF EXISTS "anon_delete_contact_messages" ON contact_messages;

CREATE POLICY "public_insert_contact_messages" ON contact_messages FOR INSERT
  TO anon, authenticated WITH CHECK (true);

CREATE POLICY "admin_select_contact_messages" ON contact_messages FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "admin_delete_contact_messages" ON contact_messages FOR DELETE
  TO authenticated USING (true);
