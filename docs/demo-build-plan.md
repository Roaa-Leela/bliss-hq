# Bliss HQ: Demo Build Plan (simple)

Priority is a clickable demo to show the client. No real login, no backend, no accounts yet. We wire all of that up later, after approval.

## What we are building now
A real, installable demo app (PWA) with the locked design, running on realistic mock data. It looks and feels like the product. The plumbing is simulated.

## How we are approaching it
- Start from the React plus Vite PWA starter.
- Build the locked design system first: colour tokens, type, components.
- Use the client logo files for the mark, favicon, and app icons.
- Seed mock data from one real villa (the Property Bible and pre check-in sheet we have).
- Replace login with a simple role switcher, so the client can explore every view.
- All data lives in memory and resets on reload. Camera photos stay on the device.
- Keep a thin data layer so the same screens later connect to Supabase and PowerSync with no rebuild.
- Deploy to a private link, installable on a phone.

## Screens, in build order

Caretaker
1. Enter and pick role (stands in for login)
2. Today (home)
3. Property areas (the checklist overview)
4. One task at a time (reference image, take photo, looks good or report)
5. Report an issue
6. Housekeeping and laundry log
7. Submit and property ready confirmation

Manager
8. Operations dashboard
9. Review a submission (photos, approve, reject, comment)
10. Issues list and assign

Owner
11. Owner view (their villa, inspection history, issues)

Admin, light
12. Property setup and checklist template editor (basic)

Shared
- Header, simple navigation, language switch (Telugu, Hindi, English), empty and loading states.

## What is faked in the demo
Login, data saving, sync, notifications, integrations, and ERPNext. The experience is real, these are simulated.

## Sequence
1. Design system and components
2. Caretaker flow (screens 1 to 7)
3. Manager flow (8 to 10)
4. Owner and admin (11 to 12)
5. Polish, language switch, deploy the demo link
6. Client reviews and gives feedback in one place

## After approval (not now)
Wire accounts, Supabase, PowerSync, real phone login, photo upload and offline sync, then continue chunk by chunk into inventory on ERPNext.

## What I need from you
- The logo files (squirrel mark as SVG and PNG, and the full lockup).
- Confirm the roles to show in the demo: Caretaker, Property Manager, Owner, Admin.
- Nothing else. The villa data we already have is enough to seed the demo.
