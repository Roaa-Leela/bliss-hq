# Bliss HQ — Insights from the Proposal-Stage Docs

> Read across: Automation Proposal, Villa Operations Platform Proposal (₹90k), Implementation Plan, Path B Plan, and the Scope Comparison. These **refine and in places change** the research-based plan in the other docs. This reconciles them.

---

## Insight 1 — There are really THREE scope/price tiers on the table (not one)

The docs aren't five versions of one plan — they're **three different commercial bets**, and the Scope Comparison shows how the smallest grew into the largest:

| Tier | Doc | Scope | Stack | Price | Time |
|---|---|---|---|---|---|
| **Lean — "Inspection core"** | Villa Ops Proposal | Photo capture & condition tracking, review/flag/comment, guest documents, villa handbook, dashboards & roles | **Pure custom PWA** (no ERPNext) | **₹90,000** | ~4 wks |
| **Phase 1 — "Villa Operations Platform"** | Automation Proposal | Lean **+ property onboarding, caretaker assignment, vendor directory, guest check-in, Aadhaar, food/upsell, security deposits, owner portal, Beds24** | Custom PWA + some OSS | **₹1,80,000** | ~3 wks |
| **Full — "Ops + Back Office"** | Impl Plan / Path B | Phase 1 **+ CRM, WhatsApp, IVR, ERP/accounting/GST, analytics, retention** | **ERPNext/Frappe-first hybrid** | **₹4,20,000** | ~5–6 wks / ~2 mo |

> The ₹4,20,000 here = the same total as the finalised 8-module doc. Path B splits it cleanly: **₹2,40,000 open-source back-office + ₹1,80,000 custom villa-ops build.**

---

## Insight 2 — The finalised stack is **ERPNext/Frappe-first hybrid**, not custom-everything

This is the biggest divergence from my earlier research lean (which assumed custom Supabase/React for *everything*). The proposals' philosophy — *"leverage mature open-source platforms; custom-build only what's unique to Bliss"* — is **correct for the full vision**, and resolves cleanly into a **buy-vs-build map**:

| Layer | Approach | Tool |
|---|---|---|
| ERP, accounting, **GST/e-invoicing**, inventory, procurement | **Configure (don't build)** | **ERPNext v15 + India Compliance** |
| CRM, lead pipeline, reservations desk | Configure | **Frappe CRM** |
| Omnichannel comms inbox (Module 7) | Configure | **Chatwoot CE** |
| Guest agreements / e-sign (Module 4) | Configure | **DocuSeal** |
| Analytics dashboards | Configure | **Metabase** |
| Retention email | Configure | **listmonk** |
| WhatsApp Business API | Subscribe (India) | **AiSensy** (~₹1,500/mo) |
| Channel manager / OTA | Integrate | **Beds24 API v2** |
| **Offline caretaker app, checklists, photos, issue engine, guest web app** | **CUSTOM BUILD** | *This is where my research stack lives* |

**Key reconciliation:** my Supabase + PowerSync + React + shadcn + i18next research is **exactly right for the custom-build portion** (the hard offline caretaker piece the OSS tools *can't* do). It doesn't compete with ERPNext — it **sits alongside** it. The proposals chose the back-office tools; my research fills in the custom-app tools the proposals left generic ("proven open-source building blocks"). Together = the complete stack.

---

## Insight 3 — ERPNext is NOT needed for Modules 1–3 → keep Phase 1 lean

Important efficiency the docs reveal by contrast: **the lean ₹90k proposal builds the entire operational core with NO ERPNext.** ERPNext only earns its place when **accounting / GST / CRM / payouts** arrive (Modules 6–8 / "Phase 2").

→ So if the real first step is **Modules 1–3 (the ops core)**, we should **defer ERPNext to Phase 2** and not stand up that heavy stack prematurely. This harmonises both views: lean custom build now, ERPNext-powered back-office later. *(Note: the Impl Plan and Path B front-load ERPNext into Week 1 — that only makes sense if you're committing to the full ₹4.2L scope up front.)*

---

## Insight 4 — Choosing ERPNext reshapes the hosting decision

ERPNext is a heavy **self-hosted Docker stack** (Path B: Hetzner CCX13/CCX-class, ~₹3,500/mo). So **if/when we commit to ERPNext, the system leans self-hosted-VPS by default** — which partly settles my earlier "managed vs self-host" open question.

⚠️ **Residency nuance:** the proposals put the stack on **Hetzner (EU data centres)** — fine for cost, but it places Indian guest PII + (later) Aadhaar data in the EU. DPDP doesn't *mandate* India-only storage, but for Aadhaar/PII comfort consider an **Indian region or AWS Mumbai** for at least the sensitive data. Worth a conscious decision, not a default.

→ Practical path: **Phase 1 (no ERPNext)** can still use managed Supabase-Mumbai *or* a lean self-host. **Phase 2** brings the self-hosted ERPNext stack — decide Hetzner vs Indian region then, with residency in mind.

---

## Insight 5 — Three artifacts in these docs are excellent — adopt them

1. **Tiered image-retention policy** (Villa Ops Proposal) — kills the #1 cost driver (photo storage). Adopt close to verbatim:
   - Routine inspection photos: **full quality 14 days → thumbnail 90 days → deleted**
   - Flagged/commented photos: **full quality 1 year** (auto-preserved on flag)
   - Pre/post-stay photos: **full quality 60 days** (dispute window) **→ thumbnail 1 year**
   - Guest documents: **configurable** to legal need · Handbook: **permanent**
   - → keeps storage near-flat as volume grows; all settings client-configurable.
2. **Discovery "lock before Day 1" checklist** (Path B) — validates our intake emphasis. Feed straight into the intake form as required fields: *checklist templates locked · room/area taxonomy locked · caretaker list + phones + assignments · brand assets · WhatsApp BSP active · Beds24 API creds · owner list + payout details.*
3. **Clean 5-module articulation + role matrix** (Caretaker / PM / Admin / Owner) — clearer than the terse 8-module doc; use it as the canonical scope language.

---

## Insight 6 — Timeline realism

The proposals promise **3–5 weeks**, but **Path B itself caveats there's "no slack"** — the schedule only holds if *every* discovery input is locked **before Day 1**, and "any slip pushes launch one week for one week." That's a fragile commitment. Our **iterative vertical-slice + strong intake instrument** is the direct de-risk: ship testable chunks, don't gate everything on a perfect Day 0.

---

## Insight 7 — Commercial structure worth keeping

- **Milestone payments** (e.g. 3–4 equal milestones tied to start / mid / delivery).
- **Infrastructure under client ownership, billed directly to them, no markup** — clean, trust-building, and means *they* own the accounts if they ever leave.
- **Separate "AI-assisted development" tool fee** (₹15k in the lean proposal) — framed as the cost advantage that enables the ₹90k/4-week price vs a traditional ₹3–5 lakh / 3–4 month build.

---

## Decisions this raises (for planning)

| # | Decision | My recommendation |
|---|---|---|
| 1 | **Stack philosophy** — ERPNext/Frappe-first hybrid vs custom-everything | **Adopt the hybrid** — ERPNext for back-office (Phase 2), custom PWA for caretaker/ops (my research stack) |
| 2 | **Which scope tier is "Phase 1"** — lean ₹90k ops core vs ₹1.8L broader | **Start with the ops core / vertical slice**, expand in testable chunks |
| 3 | **ERPNext timing** | **Defer to Phase 2** — not needed for Modules 1–3 |
| 4 | **Hosting/residency** | Phase 1 flexible; for Phase 2 ERPNext + Aadhaar, weigh **Indian region/AWS Mumbai vs Hetzner** |
| 5 | **One vs two datastores** | Custom app on its **own lean DB, integrated to ERPNext via API/events** (as Path B implies) |

---

## Net effect on the earlier plan

- **Reference architecture updates** to a **hybrid**: custom offline PWA (Supabase/PowerSync/React) **+** ERPNext/Frappe back-office **+** best-of-breed OSS (Chatwoot/DocuSeal/Metabase/listmonk/AiSensy/Beds24).
- **My custom-app tool research stands** — it details the part the proposals left generic.
- **Adopt** the retention policy, discovery-prerequisites checklist, role matrix, and commercial structure.
- **Keep** the iterative vertical-slice delivery to de-risk the aggressive timelines.
