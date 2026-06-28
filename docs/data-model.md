# Bliss HQ Phase 1 data model

Source of truth: `db/schema.sql` (validated in CI against Postgres 16).

## Entities
- profiles: users, linked to Supabase auth. role (admin/manager/caretaker/owner), languages, aadhaar_ref (offline e-KYC reference only, never the number).
- properties: villa. name, code, location, bhk, has_pool, guest_capacity, owner_id, manager_id.
- rooms: areas within a property. type (bedroom/bathroom/living/dining/kitchen/pool/outdoor/safety/utility), name, sort.
- caretaker_assignments: which caretaker covers which property (primary/backup).
- checklist_templates: pre_checkin/post_stay/daily/weekly/monthly/adhoc, master flag.
- checklist_items: trilingual text (en/hi/te), room_type, requires_photo. Items repeat per matching room (the auto-scaling engine).
- property_checklists: which templates apply to a property.
- checklist_runs: an inspection instance. status (in_progress/submitted/approved/rejected), caretaker, guest info, review fields.
- run_responses: per-item result (passed, remark) for a run.
- media_assets: photos. storage_path, thumb_path, geo+time, retain_until (drives tiered retention).
- issues: flagged problems. category, severity, status, ownership (pm/ct/vd/own), assigned vendor.
- vendors: shared directory (plumber, electrician, AC, laundry, etc.).
- inventory_items: per-property stock, trilingual names, must_have vs current, condition, reorder.
- laundry_dispatch: counts sent to laundry per checkout.
- audit_log: who did what, when (accountability).

## Access
- RLS scopes every property-child table through `can_access_property()`: admin sees all; manager/owner by ownership; caretaker by assignment.
- Catalogue tables (templates, items, vendors) are readable by any signed-in user; written by admin/manager.
- PowerSync sync rules replicate the same scoping so offline devices only hold permitted data.
