# Bliss HQ — Operating Model & Performance Layer

> Companion to `research-insights.md`. Covers two things: (1) how we guarantee a fast, non-laggy on-ground experience, and (2) the end-to-end process to run and maintain the platform with no runtime surprises.

---

# PART 1 — Performance & Responsiveness (the on-ground experience)

## Why offline-first already wins half the battle

Because the caretaker app reads/writes a **local SQLite database** (via PowerSync), the things a user does most — open a checklist, tick items, attach a photo — are **instant, even with zero signal**. The network only matters for *background sync* and *photo upload*. So our performance risk is concentrated in four questions, each with its own answer:

| The question | What it means on the ground | How we watch it |
|---|---|---|
| "Is the UI laggy?" | Taps feel slow, janky scroll | **RUM web-vitals (INP/LCP) + session replay** |
| "Is sync/API slow?" | Data takes long to appear for managers | **Backend traces (p95 latency)** |
| "Did this release slow things down?" | Regression slips into prod | **Perf budgets + load tests in CI (shift-left)** |
| "Is it slow/down right now?" | Live degradation | **Synthetic response-time checks + alerts** |

## The performance-monitoring service — top 3

We need a service that captures the **real experience on real low-end devices over real (bad) networks** — not just lab numbers.

| Parameter | **Grafana Cloud + Faro** ✅ | SigNoz (self-host) | Sentry (cloud) |
|---|---|---|---|
| On-ground web RUM (INP/LCP per device+network) | **Purpose-built, strong** | Newer/basic | Strong |
| Backend API latency / tracing (APM) | Yes (Tempo + OTel) | **Strong (single pane)** | Yes |
| Session replay (literally watch the lag) | Via integration | Limited | **Built-in, excellent** |
| Ops burden | **Low (managed free tier)** | High (self-host RAM) | Low |
| Cost | **Generous free tier** | Free (your VPS) | Free tier tight, paid scales |

**Verdict:** **Grafana Cloud free tier + Faro** as the performance brain (real Core Web Vitals incl. **INP** per device & connection type, plus backend traces via OpenTelemetry → Tempo) — low ops, free, purpose-built for web RUM. Pair with **PostHog session replay** to *see* a laggy session, keep **GlitchTip** for error triage and **Uptime Kuma** for synthetic response-time. *(If you'd rather one fully self-hosted pane, SigNoz is the OSS alternative; if you want best-in-class replay+errors+perf in one managed tool, Sentry is the alternative — its free tier is just tighter.)*

## Shift-left: catch slowness *before* it ships

- **Lighthouse CI** in GitHub Actions → **performance budgets** (e.g., fail the build if bundle size or LCP regresses). No slow release reaches the field.
- **k6** (OSS load testing) → run a soak/load test before onboarding a batch of new villas, so we *know* capacity in advance rather than discovering limits in production.
- **Playwright** already emulates throttled networks + low-end CPU in E2E tests.

## The performance contract (SLOs) — so "fast" is a number, not a vibe

| Metric | Target | Watched by |
|---|---|---|
| App cold start (mid-range Android) | < 2s | Faro / Lighthouse |
| Local action (save checklist item, offline) | < 100ms (instant) | Faro (INP) |
| UI responsiveness (INP) | < 200ms | Faro RUM |
| Sync round-trip, p95 (3G) | < 5s | app metric → Faro/Tempo |
| Photo upload per image, p95 (3G) | < 15s | app metric |
| API latency, p95 (Mumbai region) | < 400ms | Tempo / OTel |
| Crash-free sessions | > 99.5% | GlitchTip |
| Uptime | ≥ 99.5% | Uptime Kuma |

Every target has an **alert on breach** (via n8n → WhatsApp/Slack), so degradation pages us *before* a caretaker complains.

---

# PART 2 — The End-to-End Operating Model

A closed-loop lifecycle. Nothing is ad-hoc; every stage has an owner, a tool, and a hand-off.

```
   ┌──────────────────────────── CONTINUOUS LOOP ─────────────────────────────┐
   │                                                                          │
 (1) DISCOVER → (2) COLLECT DATA → (3) SCOPE → (4) BUILD → (5) TEST/UAT →     │
   │                                                          (6) RELEASE →    │
   │                                              (7) RUN & MONITOR →          │
   │                                              (8) FEEDBACK & UPKEEP ───────┘
```

## Stage 1 — Discovery call (understand the business)

- **Format:** a structured 45–60 min call, **recorded → Whisper transcription → LLM summary → auto-posted into Plane** as the project's first page. No notes lost.
- **Agenda (fixed checklist so nothing is missed):**
  1. Operating model & revenue cut — how money flows.
  2. Roles & people — owners, managers, caretakers; how many; literacy & languages.
  3. Properties — count, variety, locations, room/amenity patterns.
  4. Current workflow — how turnover/inspection/restocking happens today; current tools (spreadsheets? Beds24?).
  5. Pain points & "magic wand" wishes.
  6. Volumes — bookings/month, turnovers/week, peak seasons.
  7. Connectivity reality at properties (drives offline design).
  8. Success metrics — what does "this works" look like for them.
- **Output:** a one-page discovery summary + a prioritized pain-point list, both in Plane, visible to the client.

## Stage 2 — Context & data collection (structured, not chase-emails)

Two intake forms in **Formbricks** (mobile-friendly, OSS), each firing a webhook → n8n → Plane:

- **A. Account/Business intake (once):** owner/org details, billing, languages, brand, payout info (later phase).
- **B. Property onboarding intake (per villa, repeatable):** name, location, photos, rooms & beds, amenities & appliances (with serials for warranty tracking later), assigned caretaker(s) + phone + language, existing SOP/checklist docs, consumables/restock list, emergency contacts.

> Why forms beat conversation: data arrives **structured and consistent**, ready to auto-configure Module 1. The discovery call captures *understanding*; the forms capture *data*.

## Stage 3 — Scope finalization (no ambiguity)

- Translate discovery + intake into a **Phase-1 scope doc with explicit acceptance criteria** (what "done" means for the turnover vertical slice).
- Client signs off in Plane (invited as **Guest/Commenter**). Scope changes after this go through the feedback loop, not silent expansion.

## Stage 4 — Build (iterative vertical slices)

- Work in **small slices**, each independently demoable. Branch → build → **auto-test (Vitest + Testcontainers + Playwright)** → **perf budget (Lighthouse CI)** → preview deploy (Coolify) → demo.
- **Definition of Done** = tests green **+ perf budgets pass + accessibility check + reviewed**. Performance is a *gate*, not an afterthought.

## Stage 5 — Test / UAT (client sees it early)

- Every PR gets a **preview URL** the client can tap on their phone.
- Each cycle ends with an **LLM-generated "What's built / What to test"** note (plain language, in their language if needed) → posted to Plane + sent via WhatsApp.

## Stage 6 — Release (safe, reversible)

- CI gate (tests + perf + security) → deploy. **Feature flags (PostHog)** for staged rollout. **Documented rollback** + Supabase point-in-time recovery. Staging mirrors prod.

## Stage 7 — Run & Monitor (always-on, "no surprises")

Always-on observability, all alerting into **one channel** via n8n:

| Layer | Tool | Catches |
|---|---|---|
| Errors + perf + replay | **Sentry (managed)** | Crashes, exceptions, slow traces, crash-free % — one tool |
| Performance / RUM | Sentry (or Grafana Faro) | Lag, slow INP/LCP, slow sync |
| API latency | OTel → Tempo/SigNoz | Slow endpoints |
| Uptime + response time | Uptime Kuma | Outages, slowdowns |
| Product + replay | PostHog | Drop-offs, see the lag |
| Cost | Budget alerts + n8n poll | Bill surprises |

**Incident flow:** detect → alert (WhatsApp/Slack) → triage by severity → fix → verify → lightweight post-mortem. Severities carry **response SLAs** (e.g., P1 outage: 1h; P2 major: same-day; P3 minor: next cycle).

## Stage 8 — Feedback & Upkeep (the loop closes)

### Single feedback channel (the part that's usually messy — solved)
- **One place:** the **Gleap** in-app widget (screenshot + annotation, works for non-technical users on phones) **+ Plane Intake** — both land in **one Plane queue**. No scattered WhatsApp/email/calls.
- **Closed-loop states the client can always see:**
  `Received → Triaged → Planned → In progress → Ready to test → Done`
- **Triage cadence:** every item triaged within **24–48h** — categorized (bug / change / new), scored (severity × impact), estimated, scheduled. The client is never left wondering "did they get it?"

### Routine upkeep (scheduled, not reactive)
- **Dependencies:** Renovate/Dependabot auto-PRs; security patches for Coolify/n8n/PowerSync.
- **Backups & DR:** automated daily DB backups + VPS snapshots, **with periodic test-restores** (a backup you've never restored isn't a backup).
- **Capacity:** watch DB size, storage growth, sync volume; k6 load test before scaling property count.
- **Health report:** auto-generated **weekly/monthly report to client** (uptime, performance, usage, issues resolved, cost) via n8n + LLM.

## The cadence (governance rhythm)

| Rhythm | What happens |
|---|---|
| **Daily** | Check alerts, triage new feedback (24–48h SLA) |
| **Weekly** | Client check-in + release notes + backlog grooming |
| **Monthly** | Health & cost report, dependency/security review, **backup-restore test** |
| **Quarterly** | Phase/roadmap planning |

---

## Production-readiness gaps to close (no-surprises checklist)

Small but important details that make the difference between "works in demo" and "works at 2 a.m.":

1. **Caretaker sign-in** — PIN or phone-OTP (most have no email / low literacy), not email+password. *(Decision in the intake form.)*
2. **Security & secrets** — secrets manager, PII encryption at rest, rate limiting, and a joint review of **RLS + PowerSync sync rules** (offline data-leak risk).
3. **Audit trail** — first-class "who changed/approved what, when."
4. **Caretaker onboarding & support** — in-app guided first-run + a support channel (WhatsApp/in-app help).
5. **Task notifications** — web push (PWA) + WhatsApp for "you've been assigned a turnover."
6. **Legal/DPDP** — agency = Data Processor, client = Data Fiduciary → data-processing agreement, privacy policy, consent copy.
7. **Data import** — migrate the client's existing villa list/spreadsheets at onboarding.
8. **Offline conflict policy** — define last-write-wins vs server-authoritative up front.
9. **Environments** — dev / staging / prod, staging mirrors prod for safe UAT.

## Net additions to the stack & cost

- **New services:** Grafana Cloud + Faro (RUM/perf) — *free tier*; Lighthouse CI + k6 — *free, in CI*. PostHog/GlitchTip/Uptime Kuma already planned.
- **Cost impact:** **~$0** added at small scale (free tiers). The "service for response time" you asked about = **Grafana Faro + Uptime Kuma synthetic checks**, gated by **Lighthouse CI budgets**.
