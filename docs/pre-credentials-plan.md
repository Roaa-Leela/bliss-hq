# Bliss HQ: What we can build before accounts and credentials

The important realization: we do not need the client's cloud accounts to build the real platform. The exact same stack (Supabase, PowerSync, Postgres) runs locally in Docker. So we can build Phase 1 to feature-complete and fully working on a local environment, with real auth, real offline sync, a real database, and real photo upload. Going live then becomes pointing environment variables at the client's cloud projects and running the migrations. No rebuild.

This means roughly 80 to 90 percent of Phase 1 can be finished before a single credential exists.

---

## The key enabler: local-first development

- Run **Supabase locally** (official Docker stack): Postgres, Auth, Storage, RLS, all of it, no cloud account.
- Run **PowerSync locally** (Docker) against that Postgres, so offline sync works end to end.
- Build, test, and demo the real app against this local backend.
- When credentials arrive, swap env vars to the cloud project and deploy. Same code.

---

## What we can fully build now

### 1. The application (custom PWA), real not mocked
- Every Phase 1 screen for caretaker, property manager, owner, and admin, wired to a real local backend instead of mock data.
- Design system completed: component library, states (loading, empty, error), accessibility, responsive from phone to desktop.
- Full offline-first behaviour: work with no signal, sync when back online.
- Installable PWA with offline shell.

### 2. Database and schema
- Complete Postgres schema for Modules 1 to 3: properties, rooms and areas, checklist templates and items, checklist runs and responses, issues and escalations, approvals, media, users and roles, caretaker assignments, housekeeping and laundry, audit log, and the inventory tables (ready for the Phase 2 ERPNext link).
- Row-Level Security policies written and tested against local Postgres.
- PowerSync sync rules (so each caretaker device only downloads its assigned properties).
- Database migrations and version control.

### 3. Offline sync and photo pipeline (end to end, locally)
- PowerSync wired: local SQLite on device, sync to local Postgres.
- Photo capture, on-device compression, offline queue in IndexedDB, resumable upload to local storage, thumbnails.
- Conflict rule implemented (last write wins, status server-authoritative).

### 4. Auth and access control
- Phone-number login and PIN flow, role-based access for the four roles, per-property scoping enforced in both RLS and sync rules.
- OTP can be built now in developer mode (codes shown in dev). Real SMS sending is the only piece that waits for an SMS provider.

### 5. Business logic and workflows
- Checklist engine: templates that auto-scale to each villa's rooms (the 2 to 7 BHK logic from the client sheet).
- Issue flagging, routing, escalation, and the review and approval workflow.
- Property ready or not-ready auto indicator.
- Image retention policy automation.

### 6. Real content from the client's files
- Digitise the full pre check-in checklist (all areas, all BHK sizes) in English, Telugu, and Hindi, using the client's own wording.
- Build the Property Bible data model and an import tool (spreadsheet to database) so onboarding real villas is one step.
- Reference image library structure, ready for the client's photos.
- Complete translations, pending a native proofread.

### 7. Notifications
- In-app notifications: fully buildable now.
- Web push notifications: buildable now using our own generated VAPID keys, no paid account.
- WhatsApp notifications: wait for the BSP account (AiSensy plus Meta verification).

### 8. Testing and quality
- Unit tests (Vitest), integration tests against a real Postgres (Testcontainers), end-to-end tests (Playwright).
- Accessibility checks (WCAG AA) and performance budgets (Lighthouse CI).
- A solid automated test suite before launch, not after.

### 9. Delivery pipeline and infrastructure as code
- CI on every push: build, lint, test (GitHub Actions, already connected).
- Preview deploys on our hosting (already live).
- One-command local stack: Docker Compose for Supabase, PowerSync, and tools, so the client's machine or a VPS spins it up identically.
- Error tracking SDK wired (Sentry), monitoring and uptime configs (Uptime Kuma), all ready to point at real endpoints.
- Backup and restore scripts, templated.
- The accounts and subscriptions setup checklist finalised, so credential day is plug-in, not figure-out.

### 10. Compliance and documentation
- DPDP groundwork: consent copy, privacy policy draft, data processing agreement template, audit logging in code, PII handling (encryption and masking of sensitive fields).
- Aadhaar: architect the offline e-KYC flow in the data model and UI now, integrate the provider later.
- Architecture, data model, API, runbook, and deployment docs, plus the environment variable checklist.

### 11. Discovery and intake instrument
- Build the villa onboarding form (self-host Formbricks locally or design it ready to publish), so data collection is ready the moment the client engages.

---

## What genuinely must wait for credentials

Each of these is a small switch-on step, not a build step:
- Going live on the client-owned Supabase and (Phase 2) Frappe Cloud. Local build transfers as is.
- Real SMS OTP delivery (needs an SMS provider).
- WhatsApp notifications (AiSensy plus Meta business verification).
- Aadhaar verification (provider KYC, Module 4).
- Custom domain and its SSL (needs the client's domain).
- Production data migration and first real-villa load.

---

## Recommended sequence

1. Stand up the local stack (Supabase plus PowerSync in Docker) and the schema with RLS and sync rules.
2. Replace the demo's mock data layer with the real local backend, behind the same interfaces.
3. Build out the full caretaker module against it (auth, checklist engine, offline, photos), then manager, then owner and admin.
4. Load real checklist content and translations from the client files.
5. Add tests, accessibility, performance budgets, CI, and monitoring wiring.
6. Finalise compliance copy, docs, and the go-live checklist.

By the end of this, Phase 1 is production-ready software sitting on a local mirror of the production stack. Credential day is then: create the cloud project, set environment variables, run migrations, deploy, point the domain. A short, low-risk switch-on.
