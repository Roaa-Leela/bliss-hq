# Bliss HQ Build Plan (simple)

The approach in one line: build the on ground operations first as a custom offline app, add the manager and owner views, then bring in ERPNext for inventory and procurement. Ship in small testable chunks, in the order discussed on the call.

We start the custom app from the official PowerSync plus Supabase plus Vite plus React starter, which is already a working offline PWA, so we do not build the offline plumbing from scratch.

---

## Build order at a glance

| Order | Chunk | What the client can test | Size |
|---|---|---|---|
| 1 | Caretaker App (Module 1) | A caretaker runs a real checklist on one villa, offline, with photos | Large |
| 2 | Manager Dashboard plus Owner view (Module 2) | Manager reviews and approves work, tracks issues; owner sees their villa | Medium |
| 3 | Inventory, Procurement, Vendors (Module 3, ERPNext) | Stock tracked per villa, low stock alerts, purchase orders, vendor list | Medium |
| Alongside 1 | Engine room (one time setup) | Nothing visible, but every chunk after is auto tested, deployed, monitored | Small |
| Later | Guest app, full Owner portal, Onboarding wizard (Modules 4 to 6) | Guest check in, owner actions, guided new villa setup | Large |
| Phase 2 | CRM, IVR, Accounting, Analytics, Retention (Modules 7 to 11) | Business operations layer | Large |

The call said do the three modules, module one first, in chunks. This plan follows that exactly. Chunks 1 to 3 are the priority. Everything below them waits.

---

## What each chunk includes

### Chunk 1: Caretaker App (Module 1) — highest priority
Foundation built here once and reused everywhere:
- Login by phone number with PIN or OTP, four roles (Admin, Manager, Caretaker, Owner).
- Property and room setup, so the checklist auto scales to each villa.
- Offline sync, photo pipeline, Telugu and Hindi UI, visual first design.

Caretaker features:
- Pre stay checklist, room by room, ticks and remarks.
- Photo per item, auto compressed, GPS and time stamped, captured offline and synced later.
- Reference image shown per area as the ideal state to match.
- Issue flagging (damage, missing item, maintenance) with photo and status.
- Housekeeping and laundry log after checkout, with linen and towel counts.

Admin features:
- Create and edit checklist templates from a master list, customise per property.

Outcome: a caretaker completes a real pre stay checklist on one villa, fully offline, with photos. This is the first thing the client tests.

### Chunk 2: Manager Dashboard plus Owner view (Module 2)
- Manager web dashboard: review submissions with photos, approve, reject, comment.
- Property ready or not ready indicator, updated automatically when the checklist is complete.
- Housekeeping and laundry status in real time.
- Issue tracking across villas (open, in progress, resolved), assign to caretaker or vendor.
- Assign caretakers to properties, basic availability calendar, security deposit deduction request to admin.
- Owner read only view of their own villa (inspection history and flagged issues).

Outcome: the manager runs daily operations from one screen, and owners get visibility.

### Chunk 3: Inventory, Procurement, Vendors (Module 3) — ERPNext
- Stand up ERPNext for the back office. Central item master, categories, unit of measure, preferred vendor, last price.
- Per property stock, minimum thresholds, low stock alerts to manager and admin.
- Purchase request to purchase order, composite ordering across villas, admin or owner approval.
- Vendor and contractor directory, linked to issues and to items.
- Integration: the custom app sends flagged issues and offline stock counts into ERPNext.

Outcome: stock and restocking and purchasing are handled properly, without building an ERP by hand.

### Alongside Chunk 1: Engine room (one time)
- Repo, automated tests, preview links, deployment, error and performance monitoring, a single feedback inbox. Set up once so every later chunk ships clean and is watched in production.

---

## What tech for what

| Area | Tech | Why |
|---|---|---|
| Caretaker app and dashboards | React with Vite, installable PWA, from the PowerSync starter | Offline ready out of the box, no app store |
| Look and feel | shadcn and Radix on Tailwind | Accessible, easy large touch buttons, clean |
| Languages | i18next, Telugu and Hindi and English | Add languages and switching easily |
| Database, login, files | Supabase (Postgres, Auth, Storage), Mumbai region | All in one, data in India, no lock in |
| Offline sync | PowerSync | Proven offline sync for checklists and photos |
| Photos | On phone compression, resumable upload, thumbnails | Works on weak signal, keeps storage small |
| Inventory and procurement and accounting | ERPNext | Mature, free, native India GST, exactly this job |
| Notifications | WhatsApp via AiSensy plus in app | Familiar to staff, cheap utility messages |
| Errors and speed | Sentry | Errors, slow screens, crash rate in one place |
| Uptime | Uptime Kuma | Free, simple, alerts |
| Build, test, deploy | GitHub Actions, automated tests, preview links | Ship testable chunks |
| Feedback and tasks | Plane with an in app widget | One place for all feedback |
| Automation glue | n8n | Ties intake, alerts, deploys together |

---

## Costs involved

All infrastructure is owned by the client and billed directly to them with no markup, as the brief requires. Build is AI assisted, so the main build input is time, not licence fees.

Recurring, paid by the client (rough, at about 10 to 15 villas):

| Item | When it starts | Approx monthly |
|---|---|---|
| Supabase (free, then Pro) | Chunk 1 | Free, then about Rs 2,100 |
| Small VPS for sync and tools | Chunk 1 | about Rs 800 |
| Storage and image delivery | Chunk 1 | about Rs 400 |
| Domain | Chunk 1 | about Rs 100 |
| Frontend hosting, monitoring | Chunk 1 | Free tiers |
| VPS for ERPNext | Chunk 3 | about Rs 3,500 |
| WhatsApp BSP (AiSensy) plus messages | When notifications added | about Rs 1,500 plus about Rs 0.12 per utility message |
| Aadhaar verification provider | Later, Module 4 | about Rs 1 to 5 per check |

So roughly Rs 1,000 to 3,000 per month during Chunks 1 and 2, rising to about Rs 5,000 to 7,000 per month once ERPNext and WhatsApp are live. This matches the ranges in the proposals.

Agency tools (GitHub, n8n, Plane, Sentry free, Uptime Kuma) are free or free tier.

---

## Who does what

On me (the build, the AI assisted engineering):
- Architecture, database design, all the code for the app and dashboards.
- Offline sync, photo pipeline, Telugu and Hindi setup, accessibility.
- ERPNext setup and the integration to the app.
- Automated tests, deployment, monitoring, plain language build summaries, documentation.

On you (decisions, accounts, content, client liaison):
- Final decisions and client sign offs on each chunk.
- Opening and owning the accounts and billing: Supabase, hosting, domain, WhatsApp BSP, Beds24, Aadhaar provider.
- Content from the client: final checklist wording, reference photos per room, owner and caretaker lists with phone numbers, brand colours and logo.
- Coordinating client testing and collecting feedback into the one inbox.
- The discovery lock list items before each chunk starts.

---

## What we are deliberately not building first

Per the call, these wait until after Chunks 1 to 3, even though the brief lists some in Phase 1:
- Guest web app and Aadhaar verification (Module 4). The call said keep it clean and simple, later.
- Full owner portal actions and the guided onboarding wizard (Modules 5 and 6). Basic owner view ships in Chunk 2; the rest follows.
- Beds24 booking sync and the availability calendar beyond a basic view.
- All of Phase 2 (CRM, IVR, accounting, analytics, retention).

We design the data model so all of these slot in later without rework.

---

## Why this order is right

- It matches what the client asked for on the call: module one first, in chunks, one place for feedback.
- The first thing they touch is the caretaker app on a real villa, which is the heart of the operation and the fastest way to useful feedback.
- We avoid two traps: building a custom inventory system we would throw away, and cramming a heavy ERP into the first delivery.
- Every chunk is something the client can open and test, not an internal milestone.
