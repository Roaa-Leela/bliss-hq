# Bliss HQ database

Phase 1 schema for the custom operations platform (Modules 1-3), plus inventory and vendor groundwork for the Phase 2 ERPNext link.

Files
- schema.sql  Tables, enums, indexes, triggers. Target: Supabase Postgres.
- rls.sql     Row-Level Security. Scoping mirrors the PowerSync sync rules.
- powersync-sync-rules.yaml  What each device downloads (caretaker sees only assigned properties).
- seed.sql    Representative data (Palm Grove Villa) with trilingual checklist items.

Validation
- CI applies schema.sql, rls.sql and seed.sql to a real Postgres 16 on every push.
- Locally: `psql -f db/schema.sql` then `db/rls.sql` then `db/seed.sql` (create an `auth.uid()` stub first if not on Supabase).

Go-live
- Create the Supabase project (Mumbai), run schema.sql then rls.sql, load real properties via the import tool, point the app env vars at the project, deploy PowerSync with sync-rules.yaml.
