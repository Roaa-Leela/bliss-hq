# Bliss HQ — Backend Platform & Hosting Options (Decision Doc)

> You asked: "Is Supabase the only option? There are newer solutions, right?" — Correct, there are. This separates the **two questions hiding inside "hosting"** and gives you the data to decide.

---

## First, untangle two different decisions

People say "hosting" but it's really two separate choices:

1. **WHICH backend platform** (the software: database + auth + storage + APIs) → Supabase vs alternatives.
2. **WHERE/HOW it runs** (managed cloud vs self-hosted on a VPS, and which region) → the ops/cost/compliance call.

You can mix them — e.g. *Supabase software* can run as *managed cloud* **or** *self-hosted on your own VPS*. So let's decide them one at a time.

---

## Decision 1 — The backend platform

### The field, grouped by type

**A. Established Postgres/relational BaaS (our lane)**

| Parameter | **Supabase** ✅ | Nhost | Appwrite |
|---|---|---|---|
| Database | **Standard Postgres** | Postgres + Hasura GraphQL | MariaDB (document-style) |
| Offline-first path | **PowerSync (proven)** | Possible, less common | Weaker |
| Open-source / self-host | **Yes** | Yes | Yes |
| Portability (escape hatch) | **High (plain Postgres dump)** | Medium | Lower |
| Community / maturity | **Largest** | Smaller | Good |

**B. The big non-Postgres incumbent**

- **Firebase (Google):** excellent real-time + **built-in offline**, very mature. But **NoSQL (not relational)**, **proprietary**, data lives in Google with **vendor lock-in**, and costs climb at scale. Our data (villas → rooms → checklists → issues) is deeply **relational**, so Firebase fights the grain. ([Supabase alternatives — Northflank](https://northflank.com/blog/supabase-alternative))

**C. The newer wave — "modern Firebase" all-in-one (offline + real-time built in)**

| Platform | What's exciting | Why *not* for a client production platform yet |
|---|---|---|
| **InstantDB** | "Firebase for the relational era" — relations, permissions, **offline out of the box** | Young; not standard Postgres → portability/lock-in risk |
| **Convex** | Reactive TS backend, no SQL, great DX | **No SQL**, proprietary model, offline limited |
| **Zero** (Rocicorp) | Hyped local-first sync | Creator says **offline is explicitly out of scope** |
| **Triplit** | Full-stack DB + sync, offline-first | **Acquired by Supabase in 2025** — standalone roadmap uncertain |

> Key research finding: among pluggable sync engines, **PowerSync is the only one with first-class offline support** (Zero's own creator confirms offline is out of scope). The newer all-in-one platforms *do* offer offline, but they're newer and **lock you out of standard Postgres**. ([Offline-first landscape — HN](https://news.ycombinator.com/item?id=45066070), [PowerSync + Supabase](https://www.powersync.com/blog/offline-first-apps-made-simple-supabase-powersync))

### Verdict on Decision 1: **Supabase**

Not out of hype — for three concrete reasons that matter to *this* project:
1. **It's just Postgres.** Our data is relational; Postgres is the industry default; and a plain Postgres dump means **we're never trapped** — we can move hosts or even platforms later.
2. **The offline story is proven.** Supabase + **PowerSync** is the most battle-tested offline-first path; the newer platforms either lack offline (Zero) or are too young to bet a client's business on.
3. **No lock-in, can self-host.** Open-source, so the *same software* runs managed today and self-hosted tomorrow — which feeds Decision 2.

*The newer platforms (InstantDB especially) are worth a small prototype out of curiosity, but they're the high-risk bet. For a client platform we want boring, portable, and proven.*

---

## Decision 2 — Managed vs self-hosted (where it runs)

This is the one you said you need more data for. Same Supabase software, three ways to run it:

| Parameter | **Managed Supabase Cloud (Mumbai)** | Self-hosted Supabase (VPS) | DIY (Neon + own auth/storage) |
|---|---|---|---|
| Speed to launch | **Fastest** | Slower (setup) | Slowest |
| Ops burden (you own) | **Near zero** | High (backups, patching, security, uptime) | High |
| Monthly cost | $0 free → ~$25 Pro | ~$10–20 VPS | ~$5–20 + your time |
| Data location | **Mumbai (in India)** | Wherever you host | Depends |
| Scaling | Automatic | Manual | Manual |
| Control / residency | Good | **Full** | Full |

### The data points YOU need to decide

Answer these and the choice is obvious:

1. **Do we have someone to babysit a server?** (backups that are *tested*, security patches, 2 a.m. uptime). If no → managed.
2. **How strict is residency, really?** Managed Supabase **Mumbai already keeps data in India**, and DPDP does **not** mandate India-only storage anyway. So self-hosting buys little *compliance* benefit here.
3. **What's the cost delta vs our time?** Managed Pro is ~$25/mo. A VPS is ~$15/mo **plus** hours of ops. At small scale, managed is usually *cheaper once you price your time*.
4. **Launch speed vs control** — early on, speed wins; control matters more at scale.

### Verdict on Decision 2 (recommended): **Start managed (Supabase Cloud, Mumbai), stay portable**

- Data sits **in India** (Mumbai region), ops burden ~zero, launch is fastest.
- Because it's **plain Postgres**, we keep a **clean escape hatch**: if cost, control, or residency rules ever demand it, we **self-host the *same* Supabase on a VPS with no rewrite** — just a migration.
- This avoids two traps: betting on an unproven newer platform, **and** taking on server-ops burden before we have the scale (or staff) to justify it.
- (Reminder: the **agency toolchain** — n8n, Plane, GlitchTip, etc. — is self-hosted on a cheap VPS regardless. That's where the "self-host" instinct pays off safely.)

---

## TL;DR

- **Platform:** **Supabase** — because it's standard Postgres (portable), has the proven offline path (PowerSync), and is open-source (self-hostable later). Newer platforms (InstantDB/Convex/Zero/Triplit) are exciting but riskier and less portable.
- **Hosting:** **Managed Supabase Cloud in Mumbai now**, with a no-rewrite path to self-hosting later. Decide based on *ops capacity* and *cost-vs-time*, not residency (Mumbai already covers India).
- **Reversible by design:** every choice keeps a clean exit, so this is a low-risk decision, not a one-way door.
