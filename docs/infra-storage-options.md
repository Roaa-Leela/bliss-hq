# Bliss HQ: Infrastructure and Storage Options (with 2026 costs)

A focused look at where things run and what they cost, so we finalise on facts. Prices are 2026. USD services for an Indian buyer add roughly 18 percent GST plus 1.5 to 3.5 percent forex, so treat USD figures as about 20 percent higher when landed. Rupee figures use about Rs 84 per dollar before that.

The infrastructure breaks into four separate decisions. We can mix managed and self hosted per piece.

---

## 1. App database, login, and files (the core)

| Option | What you get | Cost | India residency | Ops burden |
|---|---|---|---|---|
| **Supabase Pro, Mumbai region** | Postgres, Auth, Storage, 8 GB DB, 100 GB files included | about $25/mo (about Rs 2,100) | Yes, Mumbai | Very low |
| Supabase Free | Same, smaller, pauses after inactivity | $0 | Yes | Very low, but pausing makes it dev only |
| Self host Postgres on a VPS | Just the database, you add auth and storage | VPS cost only | Wherever the VPS is | High (backups, patching) |
| Neon (serverless Postgres) | Database only, no auth or storage | Free tier, then usage | Limited India presence | Low |

Recommendation: **Supabase Pro in Mumbai.** It bundles database, login, and file storage in one, keeps data in India, and is plain Postgres so we are never locked in. Free tier is fine while building, move to Pro before real use because the free tier pauses.

---

## 2. Photo and file storage

Our photos are compressed to about 150 to 250 KB each. Rough volume at 15 villas with the retention policy is tens of GB at steady state, not hundreds. So storage cost is small early and lives inside Supabase Pro to start. The thing that bites at scale is egress, the cost of serving photos back to managers and owners.

| Option | Storage cost | Egress | India | Notes |
|---|---|---|---|---|
| **Supabase Storage (in Pro)** | Included (100 GB) | Included allowance | Mumbai | Simplest, built in thumbnails, one stack |
| Cloudflare R2 | $0.015/GB | **Free egress** | Edge served, no Mumbai guarantee | Best when photos are viewed a lot |
| Backblaze B2 | $0.006/GB (cheapest) | Free up to 3x storage, free via Cloudflare or Bunny CDN | US or EU regions | Cheapest raw storage |
| AWS S3 Mumbai | $0.023/GB | $0.09/GB (expensive) | True Mumbai residency | Pricey egress, real residency |
| MinIO self host on VPS | VPS cost only | VPS bandwidth | Wherever VPS is | Full control, you run it |

Recommendation: **start on Supabase Storage** (it is already there, in India, with built in thumbnails). If photo viewing volume grows and egress becomes the cost driver, move photos to **Cloudflare R2** (zero egress) or **Backblaze B2 behind a CDN**. The data model makes this swap painless.

---

## 3. The always on box, for PowerSync sync and our tools

PowerSync (offline sync), and our delivery and monitoring tools (n8n, Plane, Uptime Kuma) need somewhere to run. Two clean ways:

| Approach | What runs where | Cost | India | Ops |
|---|---|---|---|---|
| **A. No box, managed** | PowerSync Cloud free tier, frontend on Cloudflare Pages free, Plane and Sentry free tiers | about $0 extra early | Supabase data in India; sync service region varies | Lowest |
| **B. One VPS** | Self host PowerSync plus n8n plus Plane plus Uptime Kuma on one server | Vultr Mumbai or DO Bangalore 2 to 4 GB, about $12 to 24/mo (Rs 1,000 to 2,000); Hetzner 4 GB about Rs 420 but no India region | India if Vultr Mumbai or DO Bangalore | Medium |

VPS price notes: **Vultr has Mumbai, Delhi, and Bangalore**, best price to performance in India, 1 GB about Rs 590, NVMe. **DigitalOcean has Bangalore.** **Hetzner is cheapest but has no India datacenter** (Singapore adds latency and puts data outside India).

Recommendation: **Option A early.** No server to manage, near zero extra cost, fast. If we want all sync traffic inside India or want to self host the tools for control, use **Option B on Vultr Mumbai**. PowerSync self hosted is free either way.

Residency note: PowerSync Cloud holds transient sync data, the real source of truth stays in Supabase Mumbai. If you want every byte in India, self host PowerSync on an India VPS (Option B).

---

## 4. ERPNext hosting (only at Chunk 3, inventory)

| Option | Cost | India | Ops |
|---|---|---|---|
| **Frappe Cloud, private bench** | about $25/mo (Rs 2,100), backups, SSL, upgrades included | Yes, India region available | **Very low, they manage it** |
| Frappe Cloud, shared starter | about $5 to 10/mo | Yes | Very low, but too small for real use |
| Self host ERPNext on a VPS | $10 to 40/mo VPS | Wherever VPS is | High (upgrades, backups, security) |

Recommendation: **Frappe Cloud private bench.** ERPNext is heavy to self host well. For about Rs 2,100/mo, Frappe Cloud handles upgrades, backups, and SSL, in an India region, which removes the biggest ops worry I flagged earlier. Self hosting only makes sense if we want to put it on the same box to save cash and accept the ops load.

---

## Recommended bundle, and total cost

Managed, India leaning, easy for the client to own each account directly (which the brief wants):

| Piece | Choice | Monthly |
|---|---|---|
| Database, login, storage | Supabase Pro, Mumbai | about Rs 2,100 |
| Offline sync and tools | PowerSync Cloud free plus free tiers (Option A) | about Rs 0 early |
| Frontend hosting | Cloudflare Pages | Free |
| Monitoring | Sentry free, Uptime Kuma | Free |
| Domain | Your domain | about Rs 85 |
| **Chunks 1 and 2 subtotal** | | **about Rs 2,200 to 3,500** |
| ERPNext (from Chunk 3) | Frappe Cloud private bench | about Rs 2,100 |
| WhatsApp (when added) | AiSensy plus utility messages | about Rs 1,500 plus about Rs 0.12 per message |
| **Full running, Chunk 3 onward** | | **about Rs 5,000 to 7,000** |

Cost first alternative (lowest cash, most ops, data in EU): one Hetzner 8 GB box (about Rs 1,300) running Postgres, PowerSync, and tools, plus Backblaze or R2 for photos, and ERPNext self hosted. Total roughly Rs 1,500 to 3,000/mo, but you own all the ops and the data sits outside India.

---

## What to decide

1. **Posture:** managed and India leaning (recommended, low ops), or cost first self hosted (cheapest, more ops, EU data).
2. **Residency strictness:** is all data in India a hard requirement now, or is Supabase Mumbai for the core plus pragmatic choices elsewhere acceptable, with strict India only applied when Aadhaar arrives in Module 4.

Everything is reversible because the core is plain Postgres and the storage swap is clean, so this is a low risk decision.
