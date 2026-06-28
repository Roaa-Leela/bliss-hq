# Bliss HQ: Delivery Layers, UX Approach, and Open Decisions

Locked so far: Supabase (managed, Mumbai) for the core, Frappe Cloud for ERPNext at Chunk 3, custom offline PWA, PWA only, Telugu and Hindi first, phased delivery in chunks.

This document does three things: lays the platform out in layers so nothing is missed, sets out how we deliver excellent UI and UX, and lists the decisions still needed from you.

---

# Part A: The platform in layers

Twelve layers in four groups. Each layer is an area we explicitly own. If every layer is addressed for every chunk, nothing falls through the cracks.

## Group 1: Foundation (the bedrock)

1. **Architecture and environments** - repo, dev, staging, production, the PWA starter, deploy pipeline. Mostly decided.
2. **Data and domain model** - entities (property, room, checklist, run, issue, inventory, staff, vendor), relationships, seed data, the room and area and asset taxonomy that scales checklists.
3. **Identity, access, and security** - phone login, the four roles, permission rules, per property scoping, secrets, encryption of sensitive fields.
4. **Offline and sync** - PowerSync rules, what each device downloads, conflict resolution, the offline queue and its UX.

## Group 2: Experience (what users feel)

5. **Design system and UI/UX** - the visual language, components, accessibility, responsiveness. The layer you care most about, detailed in Part B.
6. **Information architecture and navigation** - what each role sees, how they move around, how few taps a task takes.
7. **Localization and content** - Telugu and Hindi translations, the reference image library, checklist wording, optional voice and audio.

## Group 3: Function (what it does)

8. **Features and workflows** - the actual module behaviour: caretaker checklist run, review and approve, issue and escalation, inventory and procurement.
9. **Media and storage** - photo capture, compression, reference images, thumbnails, the retention policy.
10. **Integrations and notifications** - ERPNext, WhatsApp, Beds24 and Aadhaar later, plus in app and push and reminder notifications, glued by n8n.

## Group 4: Operations (keeping it excellent and alive)

11. **Quality, delivery, and observability** - automated tests, performance budgets, accessibility checks, CI and CD, preview links, error and speed monitoring, uptime, cost tracking, backups and restore.
12. **Adoption, governance, and iteration** - user training and in app help for non tech staff, a support channel, DPDP and audit and retention, IP and source handover, and the single feedback loop that drives the next chunk.

Every chunk we build passes through all twelve layers. The chunk is not done until each relevant layer is handled, not just the feature.

---

# Part B: How we deliver excellent UI and UX

Goal: seamless, modern, intuitive, smart, and usable by low literacy field staff and by managers and owners alike. We get there with principles, a system, a process, and testing, not by decorating screens at the end.

## 1. Design principles (the bets we make)

- **Visual first.** Icons, photos, and color carry meaning. Text is support, not the main channel. A caretaker should understand a screen without reading a sentence.
- **One job per screen.** Each screen has a single clear action. No clutter, no choices that do not matter right now.
- **Big and forgiving.** Large touch targets (44 to 48 px or more), generous spacing, hard to mis tap, easy to undo, clear confirmation.
- **Speed is felt.** Because the app works on device, actions are instant. We protect that feeling everywhere.
- **Consistent everywhere.** The same patterns, words, and icons mean the same thing across every screen and every role.
- **Calm and modern.** Clean layout, soft hospitality feel, plenty of whitespace, a confident but warm look that suits a premium villa brand.
- **Accessible by default.** Good contrast, readable type, works one handed on a phone, scales to tablet.

## 2. Role based information architecture

Four surfaces, each shaped for its user. Designing these up front is what makes the platform feel organised rather than a pile of pages.

- **Caretaker (phone, field):** today's tasks, the active checklist, the camera, flag an issue. Almost nothing else. The simplest surface.
- **Property Manager (phone and desktop):** review queue, property ready board, issues, assignments, laundry and housekeeping status.
- **Owner (phone, read mostly):** their villa, inspection history with photos, issues, and later revenue.
- **Admin (desktop):** everything, plus template and user setup.

We map every screen each role needs and how they flow before we design pixels, so navigation is shallow and predictable.

## 3. The design process (lean and test driven)

1. **Principles and brand** locked first (see decisions).
2. **Flows and information architecture** for each role, on paper or low fidelity.
3. **A clickable prototype** of the three or four core caretaker screens.
4. **Test with one or two real caretakers** early, in Telugu, on a real phone. Their reaction reshapes the design before we build.
5. **Build the design system** (tokens and components) from the validated direction.
6. **Build screens** from the system, so they are consistent by construction.
7. **Usability check each chunk** with the people who will actually use it.

Testing with real low literacy users early is the single highest leverage step. It is cheap and it prevents building the wrong thing beautifully.

## 4. The consistency engine (how it stays neat as it grows)

- **Design tokens:** one source for color, type, spacing, radius, shadows. Change once, applies everywhere.
- **Component library:** buttons, inputs, cards, checklist item, photo tile, status pill, all built once on shadcn and Radix and Tailwind, documented in Storybook.
- **Pattern library:** standard ways to do common things (a list, a form, an empty state, an error, a loading state) so every screen behaves the same.
- **Icon and copy guidelines:** one icon set, one short and simple voice, the same word for the same thing.

This is what keeps a growing platform feeling like one product rather than many.

## 5. Tooling

- **Figma** for the few key flows and the clickable prototype, light and fast, not pixel perfect everywhere.
- **Design in code** for the rest, using the component library plus Storybook, since the build is AI assisted and code is the source of truth. This avoids designs that drift from what is built.

---

# Part C: Decisions I need from you

Grouped by when they are needed.

## Needed to start Chunk 1

- **Brand assets:** logo, colors, and fonts if they exist. If not, do you want us to create a simple visual identity, or do you have a designer.
- **UI personality:** clean and minimal, or warm and friendly. For a premium hospitality brand with non tech staff, I recommend warm, simple, and calm.
- **Caretaker login:** confirm PIN set by manager, or phone number with OTP. The call mentioned both. I recommend PIN for simplicity.
- **Languages at launch:** confirm Telugu, Hindi, English. Is Urdu in or out for Phase 1. I recommend the three for now.
- **Pilot villa:** pick one real villa to seed first, and get its Property Bible and pre check in sheet filled. This becomes our first build target.
- **Caretaker Aadhaar in the Property Bible:** do we store it at all. I recommend not storing the raw number, only minimal staff details, and revisiting at the Aadhaar module.
- **Point of contact and tester:** who on your side reviews and tests each chunk.

## Needed soon (Chunk 2 and 3)

- **Owner portal depth:** read only summary, or detailed with photos, in the first owner view. I recommend read only summary first.
- **Approval rule:** confirm every checklist is approved by the manager.
- **Offline conflict rule:** confirm last save wins, with status set by the server.
- **Notifications:** in app first, and when to add WhatsApp. WhatsApp needs an AiSensy account and budget sign off.
- **Inventory ownership rules:** confirm who sets minimum stock, who updates, who approves, before Chunk 3.

## Accounts and ownership (per the brief, the client owns these)

- Who creates and owns the Supabase, Frappe Cloud, domain, and later WhatsApp and Aadhaar accounts. We can set up under your ownership, or guide your team.
- The domain name for the platform.

## Content and people

- Who validates the Telugu and Hindi translations (a native speaker on your side).
- Who collects the reference photos per room during onboarding (likely the property manager).
- Do you want voice or audio prompts in Phase 1, or later.

---

## How we keep the whole thing organised

- Every chunk is checked against all twelve layers before it is called done.
- The design system and the data model are built once and reused, so the platform stays consistent as it grows.
- One feedback inbox and one task board keep all input in one place.
- Each chunk ends with a plain language summary of what was built and what to test.

Answer the Chunk 1 decisions and we can start the foundation and the first real screens.
