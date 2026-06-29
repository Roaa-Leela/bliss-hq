# Phase 1 (Modules 1-3) build audit, against the brief

Legend
- DONE = already in the live demo.
- UI-NEXT = buildable into the UI now, no backend or credentials needed.
- PENDING = needs the real backend wired, real device hardware, or credentials.

Data model: after the latest additions, Modules 1-3 are fully modeled in the validated schema (see data-model.md coverage map). The items below are about the app and runtime, not the schema.

---

## Module 1 — Caretaker app

DONE (showable now)
- Installable PWA, works on any phone, no app store.
- Telugu, Hindi, English, switchable anywhere, persists.
- Property and room setup that scales the checklist.
- Pre check-in checklist, room by room, tick items, live progress.
- One task at a time, with the reference image block.
- Flag an issue: category, urgency, note, photo slot.
- Housekeeping and laundry count.
- Submit and property-ready confirmation.

UI-NEXT (no backend needed)
- The other checklist types live: post-stay, daily, weekly, monthly, ad-hoc (add content).
- Icon-led, image-led pass to cut reading further.
- A simple in-app notifications view.

PENDING (needs backend or device)
- Real offline-first sync (work with no internet, then sync) via PowerSync.
- Real camera: capture, compression, GPS and timestamp, offline upload queue.
- Phone-number login with PIN or OTP.
- Reference image library populated with the client's real photos.
- Real-time visibility of submissions to the PM.

---

## Module 2 — Property Manager dashboard

DONE (showable now)
- Operations dashboard: ready, to-review, open-issue counts.
- Property readiness list with clear statuses.
- Review a submission with photos by area, then Approve or Send back.
- Open issues list.

UI-NEXT (no backend needed)
- Issue status board: Open to In progress to Resolved, with a comment.
- Assign an issue or task to a caretaker or a vendor.
- Availability calendar as a clean view (with sample dates).
- Security deposit deduction request screen (lives with the guest module later, but the PM-side request is showable).

PENDING (needs backend or integration)
- Real-time updates from caretakers in the field.
- Property-ready auto-indicator driven by actual photo completion.
- Real booking data for the calendar (Beds24).

---

## Module 3 — Inventory, procurement and vendors

DONE (showable now)
- Inventory per villa: stock vs must-have, condition, low-stock banner, urgency colour, sorted low-first.
- Vendor directory grouped by trade, rating, Call action.
- Procurement flow: raise a purchase request from low stock (multi-select with suggested quantities), approve, then generate a purchase order to a chosen supplier. Status moves Requested to Approved to Ordered with a visual tracker and a PO number. Requests and statuses persist.
- Preferred supplier shown on each low-stock inventory item, and the reorder banner taps straight into procurement.

UI-NEXT (no backend needed)
- Stock update actions: manual count, consumption, receipt (with a movements history).
- Low-stock surfaced as a notification.

PENDING (needs backend or credentials)
- Real notification delivery (web push now possible without an account; WhatsApp needs the BSP).
- Accounting link for purchases (ERPNext, Phase 2).
- Composite ordering executed to a real supplier.

---

## Summary

- Modules 1-3 data model: full coverage, validated.
- A large, honest set of features is already demo-able, and almost everything else in the list is UI-NEXT, meaning I can build it into the demo without waiting on credentials.
- The PENDING items are the genuine backend or integration pieces: offline sync, real camera, phone login, real-time, notification delivery, Beds24, and accounting.
