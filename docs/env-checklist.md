# Go-live environment checklist

What we set once the client owns the accounts. Until then the app runs on a local mirror.

## Phase 1 (ops core)
- SUPABASE_URL, SUPABASE_ANON_KEY  (Mumbai project)
- SUPABASE_SERVICE_ROLE_KEY  (server/import tooling only, never in the client)
- Storage bucket name for photos (Supabase Storage, Mumbai)
- POWERSYNC_URL and its credentials (self-hosted on VPS, or PowerSync Cloud)
- SENTRY_DSN  (errors and performance)
- VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY  (web push; we generate these, no paid account)
- SMS provider key  (real OTP delivery; dev mode shows codes without it)
- App domain + DNS  (custom domain and SSL)

## Later phases
- AiSensy / Meta WhatsApp Business  (notifications)
- Aadhaar verification provider  (Module 4 guest KYC)
- Frappe Cloud / ERPNext  (inventory, procurement, accounting)
- Beds24 API v2 credentials  (reservation sync)

Ownership: all accounts created under the client's company email and billing, with us as members. See accounts-and-subscriptions.md.
