# Bliss HQ: Accounts and Subscriptions Strategy

The brief requires the client to own all infrastructure accounts directly, billed to them with no markup, with source code and IP handed over. This sets up exactly that, cleanly, from day one, so there is never a messy untangling later.

---

## The core principle

The client owns the billing and the accounts. We get delegated access to build and run them. Money for infrastructure never flows through us. We invoice only our own build and service fee, separately. This means there is effectively no handover to untangle, because it was the client's from the start.

---

## The two foundations to set up first

Everything else hangs off these two, so do them on day one.

1. **A dedicated company email for the platform**, for example ops@blissfarmstays.com, not anyone's personal email. Every account is created under this address. If a person leaves, nothing breaks.
2. **A shared password manager vault** (Bitwarden is free and good, or 1Password). The client owns the vault, we are given access. Every login, API key, recovery code, and two factor seed lives here. This single vault is what makes ownership and handover trivial.

With these two in place, ownership is clean by construction.

---

## How each account is owned

Preferred, where the provider supports it: the client creates the account with the company email and their card, and adds us as an admin or team member. True client ownership, we just have a seat.

Fallback, for providers without good team roles: we create the account under the company email, the client attaches their card directly, and the credentials sit in the shared vault. Ownership is still the client's because the email and billing are theirs.

We never route infrastructure billing through our own cards or take a markup. Each provider issues its GST invoice straight to the client's business, which is also better for their accounting.

---

## The single source of truth: a subscriptions register

One simple sheet, kept current, listing every account:

| Field | Why |
|---|---|
| Provider and purpose | what it is for |
| Plan and monthly or yearly cost | what is being paid |
| Billing cycle and renewal date | no surprise lapses or charges |
| Owner email and payment method | who pays |
| Who has access and at what role | least privilege, easy to revoke |
| Status (free tier or paid) | upgrade only when needed |

This register plus the password vault is the whole ownership picture in two places.

---

## What accounts are needed, and when

Create paid accounts only when a chunk needs them, so nothing is paid early.

| Account | Purpose | Cost | Paid by | When |
|---|---|---|---|---|
| Company email | identity for all accounts | free with domain | client | Day 1 |
| Password manager (Bitwarden) | hold all credentials | free or low | client owns | Day 1 |
| Domain registrar | platform web address | about Rs 1,000 per year | client | Day 1 |
| Cloudflare | DNS, frontend hosting, later R2 | free to start | client | Day 1 |
| GitHub | source code | free, or team | agency builds, client owns at handover | Day 1 |
| Supabase | database, login, storage | free then about Rs 2,100 | client | Chunk 1 |
| Sentry | errors and performance | free tier | client | Chunk 1 |
| Transactional email | system emails | free tier | client | Chunk 1 or 2 |
| Frappe Cloud | ERPNext | about Rs 2,100 | client | Chunk 3 |
| AiSensy plus Meta WhatsApp | notifications | about Rs 1,500 plus messages | client (needs client business verification) | when notifications added |
| Aadhaar provider | guest ID checks | per check | client (needs client business KYC) | Module 4 |
| Beds24 | bookings | client's existing | client | when integrated |
| VPS (only if self hosting) | tools or ERPNext | varies | client | only if chosen |

Note: a few accounts can only be the client's, because they require the client's business identity. Meta WhatsApp Business verification and the Aadhaar provider KYC both need the client's company documents, so these must be set up in the client's name from the start.

## What we pay for, not the client

Our own build tooling, the AI coding and design subscriptions, is our cost, covered by our service fee, not put on the client's infrastructure billing. This is the AI tooling line from the proposals. Keeping it separate keeps the no markup promise clean.

---

## Access and security

- Add team members with the least privilege that lets them work. Full admin during active build, can be reduced later.
- Turn on two factor on every account that supports it, store the recovery codes in the vault.
- Prefer per person member invites over sharing one login, so access can be revoked individually.
- Rotate any shared keys when a person leaves the project.

## Cost control

- Start every service on its free tier, upgrade only when a chunk needs it.
- Turn on each provider's budget or spend alert.
- A small monthly automation reads the bills into the register and flags anything unexpected, and we send the client a one line monthly cost summary.

## Handover and exit

Because ownership is the client's from day one, exit is simple:
- Hand over the password vault in full.
- Transfer the GitHub repository and source to the client, per the IP terms in the brief.
- Remove our access from each account.
- Provide a short runbook listing every account, its purpose, and how to access and rotate its keys.

Nothing about the running platform changes if we step away, which is exactly what the brief asks for.

---

## Recommended first move

On day one of Chunk 1, set up the company email and the shared vault, then create the domain, Cloudflare, GitHub, and Supabase accounts under the client, with the client attaching billing. That is the entire foundation for clean, client owned, no markup infrastructure.
