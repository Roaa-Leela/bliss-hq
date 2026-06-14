# Bliss HQ Phase 1: Scope, Modules, Tech Stack and Discovery

Phase 1 is the operational backbone of the platform. Investment: Rs 1,50,000. Modules 1, 2 and 3 from the finalised plan. It gets villas set up, puts a simple offline app in caretakers' hands, and gives managers and owners clear visibility. No guest flows, no reservations, no accounting in this phase. Those come later.

---

## 1. Phase 1 at a glance

What we are building: one web platform with four role based views (Admin, Property Manager, Caretaker, Owner), backed by one database. The caretaker view is an offline first app that works without signal. Managers and owners get dashboards.

The goal of Phase 1: a villa can be set up in the system, a caretaker can complete a checklist with photos on the ground (even offline), a manager can review and approve it, and the owner can see it. That single flow, working reliably, is success.

| Item | Detail |
|---|---|
| Investment | Rs 1,50,000 |
| Modules | 1 (Foundation), 2 (Caretaker app), 3 (Monitoring) |
| Roles | Admin, Property Manager, Caretaker, Owner |
| Languages at launch | Telugu, Hindi, English (visual first, expandable) |
| Devices | Mobile and tablet first, installable web app |
| Hosting | Supabase in Mumbai region for product data, cheap VPS for internal tools |

---

## 2. Module list and what each covers

### Module 1: Property and Operations Foundation
The setup layer. Everything else depends on this being right.

- User management: create and manage all users.
- Roles and permissions (RBAC): who can see and do what, per role.
- Property setup: add a villa with its core details.
- Villa and room structure: rooms, areas, beds, and key assets per villa.
- Property onboarding workflow: a guided, repeatable setup for each new villa.
- Caretaker assignment: link caretakers to the villas they look after.
- Checklist framework: build reusable checklist templates (turnover, cleaning, inspection) with typed items (yes or no, photo required, number, rating).

Outcome: properties, users and operational structures are configured and ready to use.

### Module 2: Caretaker Operations Platform
The on the ground app. Built for low literacy, low English users on basic phones with patchy signal.

- Caretaker web app: installs to the home screen, opens like a normal app, no app store needed.
- Offline first: keep ticking checklist items and taking photos with no internet. Everything syncs when signal returns. Nothing is lost.
- Multilingual and visual: Telugu, Hindi, English, icon first so it works with very little reading.
- Checklist completion: room by room, with reference images showing what good looks like.
- Photo uploads: capture, auto compress on the phone for weak networks, time and location stamped, resumable upload.
- Inspection workflows: structured pass or fail per item, flag a problem on the spot.
- Sync engine: reliable background sync of all data and photos.

Outcome: caretakers can perform and submit all operational tasks digitally from the field.

### Module 3: Operations Monitoring and Visibility
The oversight layer for managers and owners.

- Property Manager dashboard: today's tasks, pending reviews, overdue items, per villa status.
- Issue management: open, in progress, resolved, with assignment to a person.
- Escalation workflows: flagged problems move up if not handled in time.
- Review and approval workflows: manager reviews submitted checklists, approves or sends back.
- Owner portal: read only view of the owner's own villas, inspection history, and flagged issues.
- Operational visibility dashboards: clear status across villas at a glance.

Outcome: managers and owners gain complete visibility into operational activity and issue resolution.

---

## 3. What is in and what is out

In scope for Phase 1:
- Property and room setup, onboarding, caretaker assignment.
- Roles and permissions for Admin, Manager, Caretaker, Owner.
- Offline caretaker app with checklists, photos, inspections.
- Manager dashboard, issue and escalation, review and approval.
- Owner read only portal and visibility dashboards.
- Image retention policy to keep storage costs low.

Out of scope for Phase 1 (planned for later phases):
- Guest check in, guest web app, guest requests, food and upsell.
- Aadhaar and ID verification (we design for it now, build later).
- Beds24 and reservation sync.
- WhatsApp, IVR, communication hub.
- Accounting, GST, invoicing, payouts, procurement (ERPNext, Phase 2).
- Vendor and contractor management.

This keeps Phase 1 focused, fast to ship, and easy for the client to test in chunks.

---

## 4. Tech stack for Phase 1

All open source first, custom build, no ERPNext in this phase.

| Layer | Choice | Why |
|---|---|---|
| Caretaker app and dashboards | React with Vite, as an installable PWA | Offline friendly, no app store, one tap install, fast |
| UI and design system | shadcn and Radix on Tailwind | Accessible, easy to make large touch friendly elements, clean |
| Languages | i18next with Telugu, Hindi, English | Works well with React, supports adding languages and right to left later |
| Backend and database | Supabase (Postgres, Auth, Storage) in Mumbai | Batteries included, data stays in India, plain Postgres so no lock in |
| Login and permissions | Supabase Auth with Postgres row level security | Simple, secure, matches our four roles |
| Offline sync engine | PowerSync | The most proven way to sync checklists and photos offline to online |
| Photos | On phone compression, resumable upload, Supabase Storage with thumbnails | Built for weak rural networks, keeps storage small |
| Image retention | Tiered policy (routine 14 days then thumbnail, flagged 1 year) | Keeps storage cost near flat as photo volume grows |
| Errors and performance | Sentry | Errors, slow screens and crash free rate in one place |
| Uptime and speed checks | Uptime Kuma and Lighthouse budgets | Catch slowness and downtime before users do |
| Build and delivery | GitHub Actions, automated tests, preview links | Ship in testable chunks, client reviews each one |
| Feedback and tasks | Plane with an in app feedback widget | One place for all client and team feedback |
| Automation glue | n8n on a cheap VPS | Ties intake, tasks, deploys, alerts together |

Performance promise: because the caretaker app reads and writes on the device, everyday actions feel instant even with no signal. We set targets (app opens under 2 seconds, taps respond under 200 milliseconds) and get alerted if they slip.

---

## 5. Discovery call: questions and options

Use this two ways: send the short context part as a link for the client to fill, then go through the decision points together on a call so you can explain the trade offs. Everything lands in one place.

### Part A: Context and data (the client fills, you confirm)

Business and people:
- How many villas today, and how many in the next year? (sizes the system)
- How many owners, managers and caretakers? (user accounts and roles)
- What languages do caretakers speak, and how comfortable are they with reading? (drives visual first design)
- Do caretakers use their own phones or company phones? (support and testing)
- What is the internet like at the villas: good, patchy, or often none? (confirms offline priority)

Per villa (repeatable):
- Villa name, area, and owner.
- Number and type of rooms and beds.
- Key amenities and appliances (AC, geyser, pool, WiFi, kitchen).
- Any existing checklists or SOP documents (upload if available).
- The consumables and restock list (toiletries, kitchen, linen).
- Assigned caretaker, phone number and language.
- Emergency or maintenance contact.

Current way of working:
- Walk us through a villa turnover today, step by step. (maps the real process)
- What goes wrong most often: missed cleaning, broken appliance found by a guest, restock misses? (sets priorities)
- What is the one thing you most wish was automatic? (the north star)

Volumes and expectations:
- Bookings per month and turnovers per week, plus peak seasons. (load planning)
- What does success look like in three months? (clear target)
- Timeline and budget comfort for Phase 1.

### Part B: Decision points (go through these on the call)

Each one has options, our recommendation, a priority, and the consequence of the choice. An unsure client can simply accept the recommendation.

Priority key: Must (Phase 1), Should (soon), Later.

| Decision | Options | Recommended | Priority | Consequence |
|---|---|---|---|---|
| Languages at launch | Telugu plus English, or plus Hindi, or plus Urdu later | Telugu, Hindi, English | Must | Each language adds translation and audio upkeep. Visual first design keeps this light. |
| How caretakers log in | 4 digit PIN set by manager, phone number with OTP, or email and password | PIN | Must | PIN is simplest for low literacy users. Bind it to the device for safety. OTP needs signal at login. Email is the worst fit. |
| Photo proof on tasks | Required on key items, optional, or required on all items | Required on key items | Must | More photos mean more accountability but slower work and more storage. |
| Which checklist first | Turnover and cleaning only, or also maintenance, or also inspection and inventory | Turnover first | Must | A narrow first build is faster to test. Others follow in the next chunks. |
| Manager approval | Approve every turnover, approve only flagged ones, or monitor only | Approve only flagged | Should | Approving everything gives full control but heavy manager workload. Flagged only scales better. |
| Owner visibility | Read only summary, detailed view with photos, or none in Phase 1 | Read only summary | Should | More detail means more transparency but also more noise and privacy considerations. |
| Caretaker notifications | In app only, web push, or WhatsApp | Web push, WhatsApp later | Should | Push needs setup. WhatsApp is familiar but is a later module. |
| Offline conflict rule | Last save wins, server or manager wins, or per field rules | Last save wins, status set by server | Must | A simple rule is predictable. Per field rules are powerful but complex. |
| Devices | Personal phones, company tablets, or a mix | Decide together with the client | Must | Affects support load, security, and which devices we test on. |

### Part C: Lock before build starts
These must be ready before Day 1, or the timeline slips:
- Checklist templates agreed.
- Room and area names agreed.
- Caretaker list with phone numbers and villa assignments.
- Brand colours and logo.
- Owner list.

### What comes out of discovery
- An agreed Phase 1 scope summary for sign off.
- Pre filled setup data for Module 1 (villas, rooms, roles, caretakers, checklists).
- A shared task board the client can watch.
- A short list of open questions to follow up.
