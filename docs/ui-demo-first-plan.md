# Bliss HQ: UI First Demo Approach

Goal: build one meaningful chunk that shows the client almost the entire experience, get it approved, then set up accounts and wire the backend. Yes this is possible, sensible, and low cost. Here is how we do it so the work is reused, not thrown away.

---

## What the demo is

A real, clickable front end of the platform, running with realistic mock data, installable on a phone like the real app, deployed to a private shareable link. The client and real caretakers can open it, tap through every flow, and feel the product. There is no database, no login system, no sync, and no paid accounts behind it yet. It only looks and behaves real on the surface.

---

## The one thing that makes this not wasted work

We build the real screens and the real design system now, and we hide all data behind a thin data layer. In the demo, that layer returns mock data from memory. Later, we swap the same layer to talk to Supabase and PowerSync, with no change to the screens.

So the front end we build for the demo is the actual production front end. Approval to backend is a wiring job, not a rebuild. This is the key decision, and we make it on day one by keeping the screens and the data cleanly separated.

---

## What the demo includes

The priority flows from the call, with seed data from one real villa so it feels authentic:

- **Caretaker app:** pick a role to enter (a stand in for login), see today's tasks, run a pre check in checklist room by room in Telugu and Hindi using the real checklist content, see the reference image to match, take a photo with the phone camera, flag an issue, fill the housekeeping and laundry log, and submit.
- **Property Manager dashboard:** the review queue, the property ready board, open a submission with its photos, approve or reject or comment, see issues and assignments, see laundry status.
- **Owner view:** their villa, inspection history with photos, flagged issues.
- **Admin, light:** the screens to set up a property and edit a checklist template, enough to show the shape.

All of it on the real design system, so the look, feel, language, spacing, and flow are exactly what the final product will be.

---

## What is real and what is faked in the demo

| Aspect | In the demo |
|---|---|
| Look, feel, layout, design system | Real, final quality |
| Screens and flows | Real, the actual production screens |
| Languages, Telugu and Hindi | Real |
| Installable on a phone (PWA) | Real |
| Photos via camera | Real capture, stored only on the device for the demo, not uploaded anywhere |
| Login and roles | Faked, a simple role switcher to explore each view |
| Data persistence and sync | Faked, mock data in memory, resets on reload |
| Multi user, real time, true offline sync | Simulated happy path only, the real engine comes after approval |
| Integrations, ERPNext, WhatsApp | Not in the demo |

We tell the client plainly: the experience is real, the plumbing is simulated. That keeps expectations honest.

---

## Cost and accounts during the demo

Almost nothing. The demo hosts on a free static host under our own account, so the client needs no accounts and pays nothing yet. No Supabase, no Frappe Cloud, no domain required to demo. We only set up accounts after approval, exactly as you want. This also means the client commits money only once they have seen and liked the product.

---

## The sequence

1. **Demo chunk:** design system plus all priority screens plus mock data, deployed to a private link and installable. Test with one or two real caretakers in Telugu.
2. **Client approves** the look, flows, and language. We refine from their feedback.
3. **Wire it for real:** set up the company email, vault, and accounts (Supabase, domain, hosting), then connect the data layer to Supabase and PowerSync, add real login, photo upload, and offline sync.
4. **Continue chunk by chunk** into the manager dashboard backend, then inventory on ERPNext, as planned.

So the only change to our earlier plan is that the front end of the first chunks is built and approved before the backend is wired, which is exactly the demo first idea.

---

## What I need from you to start the demo

- **Brand and UI personality:** logo and colors if they exist, and the feel you want (I recommend warm, simple, calm). Without brand assets we use a clean tasteful default and swap later.
- **Pilot villa content:** one real villa's pre check in checklist and Property Bible basics, so the mock data feels real. The files we already have are enough to start.
- **Languages:** confirm Telugu, Hindi, English for the demo.
- **Login style to portray:** PIN or phone OTP, so the demo login screen matches the intended real one, even though it is faked for now.

Nothing else is needed. No accounts, no billing, no provider setup until you approve the demo.

---

## Honest caveats

- A convincing demo of this scope is real front end effort, it is most of the app's screens. The payoff is that this effort carries straight into production.
- Some things cannot be truly shown without a backend, real offline sync conflicts, multi user updates, real notifications. We demo the intended experience and explain that the engine follows.
- Mock data resets on reload, by design. We seed it to look real each time.

This is a strong way to go: the client sees and approves the real experience early, you spend on infrastructure only after a yes, and the front end we build is the one we ship.
