# Bliss HQ: Scope Picture from the Discovery Call

A simple, organised summary of what the client wants, drawn from the call transcript. The transcript was auto generated across Telugu, Hindi, and English and is rough, so low confidence points are marked with (confirm).

---

## The headline

- Build in **3 modules**, do **module 1 first**, share a link for review, work in **chunks**, and keep **one place for all feedback**.
- The client's 3 modules (their mental model) are broader than our original ₹1.5L Modules 1 to 3. In particular, their module 3 is **inventory and procurement**. See the scope note at the end.

---

## People and hierarchy

- **Admin** at the top, sees everything.
- **Property Manager** manages several properties.
- **Caretaker** is assigned to one property only.
- Everything maps property to people: a property has its manager and its caretakers, and notifications flow down that chain.

---

## Module 1: Field operations (caretaker and checklists)

- **Property and room setup**, with the checklist scaling to the property (for example a 2 BHK with a pool).
- **Dynamic checklists**: daily, weekly, monthly, and pre check in. Admin can create and edit templates. A master list exists, and each property can have items added or removed, then saved as its own version.
- **Reference image system**: each item or room shows a reference image of how it should look (for example how linen is placed). The plan is a curated library of standard reference images (line drawings or vectors), collected in a shared drive with clear naming, shown to the caretaker who then takes their own photo.
- **Caretaker app photo capture**: automatic upload when connected, automatic image compression, GPS and time stamp on every photo.
- **Issue flagging**: the caretaker flags damage, maintenance needed, or a missing or misplaced item, attaches a photo, and it goes to the property manager. Each issue has a category (consumable, maintenance, electronic) and a status (open, in progress).
- **Housekeeping and laundry log**: after every checkout the caretaker updates housekeeping and laundry status, including linen and towel counts, visible to the manager in real time. A simple Excel or PDF of items going to laundry can be shared with the laundry vendor.

## Module 2: Management and oversight (manager dashboard)

- **Property Manager web dashboard** to review submissions, comment, and approve or reject. Every submitted checklist must be approved by the manager.
- **Property ready or not ready indicator**, updated automatically when all room, kitchen, and living area photos are uploaded and the checklist is complete.
- **Assign tasks and issues to vendors** from a vendor directory. Vendors do not use the platform, they are contacted with details from the directory.
- **Notifications**: WhatsApp and in app, including reminders around check in (for example a few hours before).
- Mentioned for later, not now: booking and Beds24 integration with an availability calendar, and security deposit deduction requests with inspection photos.

## Module 3: Inventory and procurement

- **Central item master** shared across all properties. Categories: housekeeping, toiletries, linen, kitchen, maintenance, cleaning supplies. Item fields: name, category, unit of measure, preferred vendor, last purchase price.
- **Per property stock**: the manager sets what is currently available before handover, and the caretaker updates stock at every checkout and cleaning. Photos in inventory are basic and optional.
- **Ownership**: minimum stock and the master sit with the property manager, the caretaker updates when something is missing, the owner approves, and the manager keeps reserve stock.
- **Low stock alerts** to the manager and admin when a threshold is reached.
- **Procurement**: the manager raises a purchase request when stock is low. Orders can be combined across properties into one composite order, but a purchase order is created per property. Missing items can auto create an order with the category. Owner or admin can review and approve, the PO goes to the vendor, and on receipt stock updates for that property. Purchases link to an accounting module later.
- **Vendor and contractor directory**: approved plumbers, electricians, AC repair, laundry, grocery suppliers. Fields: name, contact, trade, service area, notes, past work history. Vendors link to issues and tasks from the dashboard, and a preferred vendor links from the item master.

---

## Cross cutting decisions (from the call)

| Topic | Decision |
|---|---|
| Languages | Telugu primary, plus Hindi and English, more languages with switching. Interest in an automated translation tool, with accuracy checked. |
| Caretaker login | Phone number with password, and phone OTP. |
| Photo proof | Mandatory on all relevant items. |
| Notifications | WhatsApp (cost to be worked out) and in app. Reminders a few hours before check in. |
| Approval | Every checklist is approved by the property manager. |
| Reference images | Standard curated library, shown to caretaker as the target. |
| Issue routing | Most issues to the property manager. Owner impacting damage goes to the owner. Admin oversees. |
| Inventory ownership | Manager owns master and reserve, caretaker updates, owner approves deductions and missing items. |

## Facts and scale

- About **10 villas operational now**, growing over the next 12 months (exact number confirm).
- Owner, manager, and caretaker counts: (confirm, not clear in transcript).
- Peak season around **November and December**. Turnover numbers (confirm).
- **Internet is generally very good**, with some weak signal spots, so offline is a safety net rather than the everyday norm.
- **Devices are smartphones**, a mix of company provided and personal (confirm split).
- What goes wrong most often: things get broken, and tasks sometimes are not done properly.

## Out of scope for now (later phases)

- Guest app with smart login, registration, and ID verification (kept clean and simple, later).
- Beds24 booking and availability calendar.
- Security deposit deductions.
- Accounting module (procurement links into it later).

## To confirm with the client

- Exact villa growth target and the counts of owners, managers, and caretakers.
- WhatsApp notification budget and provider.
- Translation tool choice and how to check accuracy.
- Device provisioning split (company vs personal).

---

## Important scope note

The call's 3 modules include **inventory and procurement**, which is larger than the original ₹1.5L Modules 1 to 3 (foundation, caretaker app, monitoring). Two clean ways forward:

1. Keep Phase 1 at the ops core (the client's module 1 and the manager dashboard), and treat inventory and procurement as the next chunk, built on ERPNext (see the ERPNext vs custom evaluation). This likely needs its own scope and price.
2. Or expand Phase 1 to include inventory and procurement now, which raises scope, cost, and timeline.

Recommendation: option 1. Ship the ops core first as agreed, and bring in ERPNext powered inventory and procurement as the very next chunk. This matches the client's own wish to do module 1 first and work in chunks.
