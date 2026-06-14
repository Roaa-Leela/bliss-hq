# Bliss HQ — Research Insights & Decision Guide (Phase 1)

> Phase 1 = Modules 1–3: Property & Operations Foundation, Caretaker Operations Platform, Operations Monitoring & Visibility.
> Build approach: AI-assisted custom code, open-source-first. Hyderabad-based, India compliance in scope.

---

## The one big idea

Modules 1–3 are not three apps — they are **one product with three doors**:

- **Door 1 (Admin/Setup):** configure properties, rooms, roles, checklists.
- **Door 2 (Caretaker field app):** offline-first, visual, multilingual — do the work on the ground.
- **Door 3 (Manager + Owner dashboards):** see everything, approve, escalate.

They share one database, one backend, one design system. **Build it as one app with role-based surfaces**, and treat "modules" as billing/delivery milestones.

**Smartest first move:** ship a **thin vertical slice** — one villa fully set up → one caretaker completes one *turnover checklist with photos, offline* → manager reviews & approves → owner sees the result. That single flow exercises ~80% of the architecture (auth, RBAC, offline sync, photos, dashboards) and de-risks everything before we widen scope.

---

## PART A — The Product Stack

### A1. How we ship the caretaker app — PWA vs Capacitor vs Next.js

| Parameter | **PWA (Vite + React)** ✅ | Capacitor wrapper | Next.js (SSR) |
|---|---|---|---|
| Offline-first fit | Excellent (client-rendered) | Excellent | Awkward (SSR fights offline) |
| Camera / device access | Good (web APIs) | Best (native) | Good (web APIs) |
| Distribution | Install to home screen, **no app store** | Needs Play Store (friction, review, fees) | Web only |
| Build speed & cost | Fastest, cheapest | Extra native build/CI | Heavier for a field app |

**Verdict:** **PWA now** (installs in one tap, no store gatekeeping — perfect for non-technical field staff). Add **Capacitor later** only if we need stronger camera/background or a store listing. Dashboards can live in the same React codebase.

### A2. ⭐ The make-or-break decision — Offline sync engine

This is the heart of the caretaker app: it must let staff **finish work with no signal** and sync later without losing data or photos.

| Parameter | **PowerSync** ✅ | ElectricSQL | RxDB |
|---|---|---|---|
| Sync direction | **Bidirectional** (read + write) | **Read-only** (writes go via your own API) | Bidirectional (replication plugins) |
| Offline maturity | Most battle-tested for mobile | Newer, evolving fast | Mature, widely used |
| Postgres fit | Native (Postgres ↔ on-device SQLite) | Native (Postgres → client "Shapes") | Backend-agnostic |
| Photo/attachment handling | **Built-in attachment helper + upload queue** | Not built-in | Supported, more manual |
| Cost / licensing | OSS **self-host free**; cloud ~$49/mo | Apache-2.0, **free** | OSS (some premium plugins paid) |

**Verdict:** **PowerSync**, self-hosted on our VPS (₹0). Its bidirectional upload queue + attachment handling is exactly what a checklist-with-photos field app needs. **RxDB is the fallback.** ElectricSQL is read-path only — extra plumbing for a write-heavy app.

> ⚠️ **Critical gotcha:** Row-Level Security guards the *API*, **not** what syncs to the device. We must mirror the "caretaker sees only assigned villas" rule in **PowerSync Sync Rules**, or a phone could download data it shouldn't. RLS + Sync Rules stay in lockstep.

### A3. Backend & API

| Parameter | **Supabase (BaaS)** ✅ | Hono + tRPC (+ Postgres) | PostgREST (+ Postgres) |
|---|---|---|---|
| Time to ship | Fastest (auth/storage/realtime built-in) | Medium (assemble yourself) | Fast for CRUD |
| Custom business logic | Good (Edge Functions) | **Maximum** (full control, type-safe) | Weak (logic in SQL only) |
| Offline-sync fit | **Blessed PowerSync path** | Works with PowerSync | Works with PowerSync |
| Cost | $0 free → $25/mo Pro | ~$5 VPS / $0 on Workers | ~$5–15 VPS |

**Verdict:** **Supabase core** (Postgres + Auth + Storage + RLS + Realtime) — it removes the most undifferentiated work and has the most-proven offline path. Add a **thin Hono + tRPC service only if** custom workflow logic gets heavy. The data is plain Postgres, so **no real lock-in**.

### A4. Auth & RBAC — quick but important

- **Pick:** **Supabase Auth + Postgres Row-Level Security.** Roles = `owner | manager | caretaker`; a `caretaker_assignments` table + RLS policies on `auth.uid()` enforce per-villa scoping at the source of truth.
- **Our authz is simple** (3 flat roles + 1 scoping rule) → **RLS is the sweet spot. Skip heavy policy engines** (OpenFGA/Permify/Casbin) until/unless hierarchies get graph-like.
- 🚩 **Traps to avoid for a 2026 greenfield build:** **Auth.js/NextAuth** is now maintenance-only (handed off Sept 2025) and **Lucia is deprecated** (Mar 2025). If we ever go non-Supabase, use **Better Auth** (built-in org/RBAC), not these.

### A5. Photos for low-bandwidth rural areas — storage choice

The pipeline: **capture → compress to ~1600px WebP (~150–250KB) → queue in IndexedDB → resumable upload → thumbnails.** Resumable uploads via **Uppy + tus + Golden Retriever** (survives disconnect/reload). Where the photos *live*:

| Parameter | **Supabase Storage** ✅ | Cloudflare R2 | MinIO / S3-Mumbai |
|---|---|---|---|
| Setup ease | Easiest (one stack) | Medium (front with tus server) | Most ops |
| Egress cost | Charged (cloud) | **$0 egress** (best at scale) | Infra-only / S3 egress pricey |
| Thumbnails | **Built-in (imgproxy)** | Cloudflare Images (5k free) | Pair with imgproxy |
| India residency | Mumbai region / self-host | Edge (no native Mumbai) | **True India residency** |

**Verdict:** **Supabase Storage now** (one stack, free thumbnails) → **R2** if photo re-viewing volume explodes ($0 egress) → **MinIO/S3-Mumbai** only if strict residency is ever mandated.

> Notes: WebP yes, **skip AVIF** (too slow on low-end Android). Background Sync API is Chromium-only — we keep our own IndexedDB queue as the reliable path.

---

## PART B — Hosting, Cost & Compliance

### B1. Where it all runs — the model that resolves "managed vs self-host"

| Parameter | Managed (Supabase-Mumbai) | Self-host VPS OSS | **Hybrid** ✅ |
|---|---|---|---|
| Speed to ship | Fast | Slower | Fast |
| Ops burden | Low | **High** (backups, patching, security) | Medium (only tooling) |
| Recurring cost | $25+/mo | ~$5–10/mo | ~$30–60/mo total |
| Data control | In India (Mumbai) | Full | Product in India + tooling self-hosted |

**Verdict:** **Hybrid.** Keep **product/customer data on managed Supabase pinned to Mumbai** (reliable, in-India, low-latency) and **self-host the agency toolchain on one cheap VPS** (near-zero cost where it's safe). This is the best of both instincts you were torn between.

### B2. DPDP Act & Aadhaar — myth-busting (verified)

- ✅ **No blanket data-localization.** DPDP Rules were **notified 13 Nov 2025**; cross-border transfer uses a permissive **"negative list"** model — data may go anywhere except government-restricted countries. **India-only storage is NOT legally required** for you. (Choosing Mumbai is prudence, not obligation.)
- ✅ **Aadhaar the safe way:** use **Aadhaar Paperless Offline e-KYC / DigiLocker** — it verifies identity **without collecting or storing the Aadhaar number** (only a signed reference ID). Keeps you out of full KUA licensing.
- 🚫 **Never store** the raw Aadhaar number or biometrics.
- ⚖️ Aadhaar is **Module 4** — architect for it now, implement later. Get a quick lawyer review before it goes live.

### B3. Cost snapshot (small scale)

| Item | Monthly |
|---|---|
| Supabase (free → Pro) | $0 → $25 |
| One VPS (PowerSync + toolchain) | $5–10 |
| Frontend hosting (Cloudflare/Vercel free) | $0 |
| Error/uptime/analytics (self-hosted + free tiers) | $0 |
| **Total** | **≈ $30–60/mo** |

---

## PART C — Designing for non-tech, low-literacy users

### C1. The principles (evidence-based)

- **Icon-first, minimal text, photo-driven.** Assume the user may not read fluently.
- **Big touch targets:** aim **≥44–48px** (Apple HIG 44pt / Material 48dp; WCAG 2.2 floor is 24px — we go bigger).
- **Contrast ≥4.5:1**, target **WCAG 2.2 AA**.
- **Audio/voice prompts** for key steps; **color + number coding**; **visual progress** (1-of-5 dots, not paragraphs).
- **Forgiving flows:** large buttons, hard-to-mistap, confirm destructive actions.

### C2. Design system

| Parameter | **shadcn/ui + Radix + Tailwind** ✅ | MUI | Mantine |
|---|---|---|---|
| Accessibility | Excellent (Radix primitives) | Good | Good |
| Large-touch customization | **Full control (you own the code)** | Fighting Material defaults | Good |
| RTL (Urdu) | Clean (Tailwind logical props) | Supported | Supported |
| Bundle / DX | Lean; **great with AI codegen** | Heavier | Nice hooks, medium |

**Verdict:** **shadcn/ui + Radix + Tailwind** — maximum control to build oversized, friendly touch UI, accessible by default, and the most AI-coding-friendly.

### C3. Languages & i18n

Hyderabad-first: **Telugu, Hindi, English, Urdu** (Urdu is right-to-left) — but design so it's usable with **almost no reading**.

| Parameter | **i18next (react-i18next)** ✅ | next-intl | FormatJS (react-intl) |
|---|---|---|---|
| Fit with Vite/React | **Framework-agnostic, ideal** | Next.js only | Framework-agnostic |
| RTL (Urdu) | Yes (`dir` + Tailwind RTL) | Yes | Yes |
| Translation management | **Tolgee / Weblate** (OSS, in-context) | Supported | Supported |
| Ecosystem | Largest | Growing | Mature, heavier API |

**Verdict:** **i18next + Tolgee.** Fonts: **Noto Sans Telugu / Devanagari / Nastaliq (Urdu)**. For voice, **pre-record fixed prompts** (cheap, reliable) and use **Bhashini / AI4Bharat IndicTTS** for dynamic Telugu/Hindi text.

---

## PART D — The Automated Delivery Pipeline (our agency engine)

**Guiding principle:** one **Hetzner VPS (~€5–10/mo)** runs the whole OSS toolchain, with **n8n as the spine** and **GitHub as the system of record**. ("Free" OSS is only free if you have somewhere to run it — co-locating is what makes it cheap.)

### D1. Plan + client visibility + unified feedback

| Parameter | **Plane (self-host)** ✅ | GitHub Projects + Issues | OpenProject |
|---|---|---|---|
| Non-tech client friendliness | **High** (modern UI, Guest role) | Low (dev-centric) | Medium (powerful but dated) |
| Built-in feedback/intake | **Yes (Intake queue)** | Issues only | Yes |
| Cost / limits | Free, **no user limit** | Free | Free CE, **heavy (8GB RAM)** |
| Ops | One container | Zero | Heavy |

**Verdict:** **Plane** for the single shared board (client invited as **Guest/Commenter**) **+ Gleap** in-app widget for screenshot/annotation bug reports from non-technical mobile users → both flow into Plane via n8n.

### D2. Build, test, monitor — the picks

- **CI/CD:** **GitHub Actions** → **Vitest** (unit) + **Testcontainers** (real Postgres) + **Playwright** (a few E2E). Deploys + per-PR previews via **Coolify** (self-host) or managed Railway/Render.
- **Client release notes:** conventional commits + **release-please** → **LLM rewrite** into plain-English "What's new / What to test."
- **Error tracking:** **GlitchTip** (self-host, ~512MB RAM, Sentry-compatible). **Uptime:** **Uptime Kuma.** **Analytics:** **PostHog Cloud** (free 1M events).
- **Background jobs:** **Trigger.dev.** **Cost monitoring:** native budget alerts + an n8n billing-poll (skip OpenCost/Kubecost — Kubernetes-only).

> ⚠️ **Two gotchas:** (1) From **1 Mar 2026, GitHub Actions charges $0.002/min on private repos even for self-hosted runners** — keep CI lean or fall back to **Woodpecker CI**. (2) **Coolify had CVEs in Jan 2026** — keep it patched and firewalled.

---

## PART E — Reference architecture (at a glance)

```
[Caretaker PWA: Vite+React + offline SQLite] ──PowerSync──┐
[Manager/Owner dashboards: React, role-gated] ────────────┤
                                                          ▼
              [Supabase @ Mumbai: Postgres + Auth(RLS) + Storage(imgproxy)]
                                                          │
  Internal VPS (Hetzner/India): PowerSync · n8n · Plane · GlitchTip · Uptime Kuma · Trigger.dev
                                                          │
  GitHub Actions (Vitest/Playwright/Testcontainers) → Coolify previews → release-please + LLM notes
```

---

## PART F — The 4 decisions to lock before building

| # | Decision | Recommendation |
|---|---|---|
| 1 | Hosting model | **Hybrid** — Supabase-Mumbai for product, self-hosted VPS for tooling |
| 2 | Caretaker app delivery | **PWA first**, Capacitor only if needed |
| 3 | Phase-1 scope | **Single turnover vertical slice** first, then widen |
| 4 | Aadhaar/KYC timing | **Keep in Module 4**; architect now, build later (offline e-KYC) |

Once these are locked, next step is the **Phase-1 planning doc + task checklist** and scaffolding the repo (Vite+React PWA + Supabase schema + PowerSync + the data model).
