# Bliss HQ — Discovery & Intake System

> Goal: make discovery + scoping **streamlined, self-explanatory, and one-place**. Every question carries a plain-language explainer; every decision shows **options, a recommendation, priority, and consequences**. The same instrument works whether the client fills it alone or you fill it together on a call.

---

## Strategy: how to run it (you asked — self-serve link vs call)

Don't pick one. **Sequence both** — each is good at a different thing:

| Mode | Great for | Weak at |
|---|---|---|
| **Self-serve link** | Bulk, factual data (villa details, amenities, staff list); async; scales | Decision points (non-tech client may misread options, abandon, answer shallow); loses nuance |
| **Call (you fill)** | Judgement calls, trade-offs, rapport, fast clarification | Your time; doesn't scale to many villas |

### Recommended flow (best of both)

1. **Pre-discovery link (10 min, self-serve)** — send a *short* form first: business basics + list of villas + biggest pain points. So you walk into the call already informed.
2. **Discovery call (you drive the instrument)** — go through the **decision points** together, explaining options/consequences live. This is where judgement is needed — you fill it as you talk.
3. **Scope sign-off** — share the auto-generated summary back; client confirms (one click). This becomes the agreed Phase-1 scope.
4. **Per-villa onboarding (self-serve, repeatable)** — for adding villas at scale later, the manager/caretaker fills the property section themselves via the link.

> Rule of thumb: **facts = self-serve · decisions = call-assisted.**

### Tool

- **Start: Tally** (free, zero-ops, beautiful, supports rich descriptions/images/logic, fill-it-yourself or share link) → fastest path to a working instrument.
- **Later: Formbricks** (OSS, self-host) when we want full data ownership + native n8n→Plane automation.
- Either way: **one webhook → n8n → creates the Plane project + seeds Module 1 config.** One place, no re-keying.

---

## PART A — Context & Data (the factual sections)

*Each line = the field + (why we ask / what it configures).*

### A1. Business & operating model
- Company name, brand, locations served — *(branding, defaults)*
- How the revenue cut works (model, %) — *(future billing/reporting)*
- Who's the day-to-day decision-maker & point of contact — *(approvals, comms)*

### A2. People & roles
- How many **owners**, **property managers**, **caretakers**? — *(user accounts, licensing, RBAC)*
- Languages each group speaks; comfort with reading — *(drives visual-first + which languages at launch)*
- Do caretakers have **smartphones**? Personal or company? — *(device strategy, support, testing matrix)*
- Typical **connectivity at properties** (good / patchy / often none) — *(validates offline-first priority)*

### A3. Properties (repeatable per villa)
- Villa name, location/area, owner — *(property record)*
- Number & type of **rooms / beds** — *(villa structure)*
- **Amenities & appliances** (AC, geyser, pool, Wi-Fi, kitchen…) — *(inventory + maintenance checks; capture serials later for warranties)*
- Existing **SOPs/checklists** (upload if any) — *(seed checklist templates)*
- **Consumables/restock list** (toiletries, kitchen, linens) — *(restocking checklist)*
- Assigned **caretaker(s)** + phone + language — *(caretaker assignment)*
- Emergency/maintenance contacts — *(escalation)*
- Photos of the villa & key spots — *(reference + onboarding)*

### A4. Current workflow & pain
- Walk through a turnover today, step by step — *(map the real process)*
- What goes wrong most often? (missed cleaning, broken appliance found by guest, restock misses…) — *(prioritise features)*
- What's the #1 thing you wish were automatic? — *(north star)*

### A5. Volumes & expectations
- Bookings/month; turnovers/week; peak seasons — *(load planning, capacity tests)*
- What does "this is working" look like in 3 months? — *(success metrics)*
- Timeline expectations; budget comfort per phase — *(planning)*

---

## PART B — Decision Points (the streamlining magic)

Each decision is shown to the client as: **plain explanation → options → our recommendation → priority → consequence of each choice.** Defaults are pre-selected so an unsure client can just accept the recommendation.

**Priority key:** 🟢 Must (Phase 1) · 🟡 Should (soon) · ⚪ Later

| # | Decision (plain language) | Options | Recommended | Priority | Consequence |
|---|---|---|---|---|---|
| **D1** | **Languages at launch** — which languages the app shows | Telugu+English / +Hindi / +Urdu | Telugu + Hindi + English | 🟢 | Each language adds translation + audio upkeep; visual-first design keeps this light |
| **D2** | **How caretakers log in** — they often have no email | 4-digit **PIN** (manager sets) / **Phone + OTP** / Email+password | **PIN** (simplest) | 🟢 | PIN = easiest but bind to device for safety; OTP needs signal at login; email is the worst fit here |
| **D3** | **Photo proof on tasks** — how much evidence to require | Mandatory on **key** items / Optional / Mandatory on **all** | Mandatory on key items | 🟢 | More photos = more accountability but slower work + more storage |
| **D4** | **Which checklists first** | **Turnover/cleaning** only / + Maintenance / + Inspection & inventory | Turnover first | 🟢 | Narrow first slice = faster to test; others follow in next chunks |
| **D5** | **Approval workflow** — manager oversight level | Approve **every** turnover / Approve only **flagged/failed** / Monitor only | Approve flagged only | 🟡 | Full approval = max control but heavy manager workload; flagged-only scales |
| **D6** | **Owner visibility** — what owners see | Read-only **summary** / Detailed with photos / None in Phase 1 | Read-only summary | 🟡 | More detail = transparency but noise + privacy considerations |
| **D7** | **Caretaker notifications** — how they hear about tasks | In-app only / **Web push** / WhatsApp | Web push (WhatsApp later) | 🟡 | Push needs setup; WhatsApp is familiar but is a later module |
| **D8** | **Offline conflict rule** — if two people edit while offline | **Last save wins** / Server/manager wins / Per-field rules | Last-write-wins + server-authoritative status | 🟢 | Simple rule = predictable; per-field is powerful but complex |
| **D9** | **Devices** — what caretakers use | Personal phones (BYOD) / Company tablets / Mix | Decide with client | 🟢 | Affects support burden, security, and which devices we test on |
| **D10** | **Guest ID / Aadhaar** (later phase) | Architect now, build in Module 4 | Offline e-KYC, never store Aadhaar number | ⚪ | Keeps compliance light; just reserved in the design now |

> The consequence column is the point: the client *sees the trade-off* before choosing, so scope is agreed with eyes open — and you have a written record of *why* each choice was made.

---

## PART C — What comes out of it

When the form is submitted (or you finish the call), automation produces:

1. **A scope summary** — the agreed Phase-1 feature set + decisions + "why," for sign-off.
2. **Seed config for Module 1** — properties, rooms, roles, caretaker assignments, checklist templates pre-filled.
3. **A Plane project** — tasks + the shared board the client can watch.
4. **An open-questions list** — anything unclear, flagged for follow-up.

One instrument → discovery, scope, *and* the first chunk of real configuration. No separate documents, no re-keying, one source of truth.

---

## Suggested next step

I can **draft the actual Tally form** (every question + explainer + the decision points with options pre-loaded) so you can publish a link this week and start collecting — then we feed the first real client's answers straight into the Phase-1 plan.
