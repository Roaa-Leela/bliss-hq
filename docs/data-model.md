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

## Coverage vs the brief and the call (cross-check)

Modules 1 to 3 (the locked Rs 1.5L Phase 1) are modeled in full:

| Requirement (brief / call) | Table(s) |
|---|---|
| Property and room structure | properties, rooms |
| Users, roles, per-property access | profiles, user_role, RLS + sync rules |
| Caretaker assignment | caretaker_assignments |
| Checklist types (pre/post/daily/weekly/monthly/ad-hoc) | checklist_templates.type |
| Trilingual, room-scaling checklist items | checklist_items |
| Inspection runs and per-item results | checklist_runs, run_responses |
| Photos with geo, time and retention | media_assets |
| Reference images (ideal state) | reference_images |
| Housekeeping and laundry log | laundry_dispatch (post_stay runs) |
| Issue flagging, severity, status, ownership, vendor | issues, vendors |
| Review and approve, property-ready | checklist_runs.status / reviewed_by |
| Inventory master (trilingual, per property) | inventory_items |
| Stock movements (count, consumption, receipt) | stock_movements |
| Low-stock alerts | derived + notifications |
| Purchase requests | purchase_requests, purchase_request_items |
| Purchase orders (per property, vendor, approval, receipt) | purchase_orders, purchase_order_items |
| Vendor and contractor directory | vendors |
| Staff details (Property Bible) | staff_details |
| Notifications (in-app and push log) | notifications |
| Audit trail | audit_log |

Deliberately deferred (brief Modules 4 to 6 and Phase 2, out of the locked Phase 1 scope), to be modeled when those modules are scoped:
- Guest web app: bookings, guests, ID documents, agreements, security deposits, food and upsell requests.
- Villa handbook.
- Beds24 reservation sync.
- Owner payout, commission and accounting (ERPNext in Phase 2).
- Aadhaar verification (Module 4). The schema already reserves `profiles.aadhaar_ref` for the offline e-KYC reference id only, never the number.
