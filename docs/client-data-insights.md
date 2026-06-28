# Bliss HQ: Insights from Client Data (Pre Check-in Inspection and Property Bible)

These are the client's real, in-use operating tools. They tell us precisely how Bliss runs today, which lets us build the right data model and checklist engine instead of guessing. This doc captures what we learned and how it maps to the Phase 1 build.

---

## 1. What these two files are

- **Pre Check-in Inspection (v3):** the real turnover checklist, bilingual English and Telugu, one sheet per villa size (2 BHK to 7 BHK). This is what a caretaker fills before every guest arrives. Today it is paper plus photos sent to a WhatsApp group. This is exactly what the Module 2 caretaker app replaces.
- **Property Bible (v2):** the per-property master file. One file per villa holding inventory, consumables, linen, toiletries, caretaker details, maintenance, and vendors. This is the source of truth a Property Manager keeps. It maps directly to our Module 1 setup data and several later features.

---

## 2. Pre Check-in Inspection: structure and the key insight

The checklist is the same core list that scales with villa size:

| Villa size | Tasks |
|---|---|
| 2 BHK | 61 |
| 3 BHK | 77 |
| 4 BHK | 93 |
| 5 BHK | 109 |
| 6 BHK | 125 |
| 7 BHK | 141 |

It grows by about 16 tasks per extra BHK. That is one more bedroom (about 9 checks) plus one more bathroom (about 7 checks).

Sections: Bedroom 1..N, Bathroom 1..N, Living Room and Common Areas, Dining Area, Kitchen, Pool Area, Outdoor Garden and Activities, Safety and Security.

Each task row has: number, task in English, task in Telugu, a tick box, and a remarks field. The header captures Property, Unit (BHK), Date, Caretaker, Time, Guest Name, Check-in Time, Number of Guests, Booking Ref. The footer says photograph each area and share in the WhatsApp group, plus a caretaker signature.

**The design insight:** tasks repeat per room. So our checklist engine should define item sets per room type (bedroom set, bathroom set) plus fixed sections (kitchen, pool, etc.), and auto generate the right checklist from the villa's actual room structure. This is why Module 1 room setup matters: it drives the checklist automatically. No need for six separate templates, just one smart template that scales.

This sheet is the perfect seed for our first vertical slice: it is a complete, real turnover checklist in Telugu and English, ready to load.

---

## 3. Property Bible: sheet by sheet and what each maps to

| Sheet | What it holds | Maps to |
|---|---|---|
| Cover | Property name, address, PM and phone, owner name and phone, total BHK, pool yes or no, last updated | Property record (Module 1) |
| 1. Kitchen and Appliances | Item, brand, model, must-have qty, current stock, condition (Good Fair Poor), last serviced, suggested brand | Inventory plus appliance condition and servicing |
| 2. Cutlery and Crockery | Item, material, suggested brand, must-have qty, current stock, condition | Inventory (qty rule: 1.5x guest capacity) |
| 3. Linen | Item, size, must-have sets, in use, in laundry, in reserve, total auto | Linen stock flow and laundry tracking |
| 4. Toiletries | Item, brand and size, min per bathroom, current stock, buffer, reorder | Restocking per checkout (bulk 5L refilling 450ml dispensers) |
| 5. Consumables | Cleaning chemicals with Diversey codes, unit, must-have qty, current stock, reorder | Restocking and cleaning supplies |
| 6. Laundry Vendor | Primary and backup vendor, dispatch log of pieces out and back | Vendor plus laundry log |
| 7. Caretaker Details | Name, phone, WhatsApp, emergency, age, gender, address, Aadhaar, accommodation, salary, duty hours, weekly off, languages, duties, training | Staff record (Module 1) |
| 8. Maintenance Tracker | Area or item, issue, type, vendor, quoted amount, ownership (PM CT VD OWN), scheduled date, status | Issue management and escalation (Module 3) |
| 9. Vendor Directory | Vendor name, contact, phone, WhatsApp, service type, area, rate | Vendor directory |
| 10. Suggested Products | Product, recommended brands, spec, price, where to buy, notes | Global brand catalog reused across all villas |

---

## 4. The data model this gives us (evidence based)

Real fields from real use. Core entities for the build:

- **Property:** name, address, code (linen is labelled with a property code), PM and phone, owner name and phone or WhatsApp, total BHK, pool yes or no, guest capacity, last updated.
- **Room or Unit:** type (bedroom, bathroom, kitchen, living, dining, pool, outdoor), name or number, per property. Drives checklist scaling.
- **ChecklistTemplate:** name (Pre Check-in Inspection), scope (whole villa, with room-typed repeatable sections), version.
- **ChecklistItem:** section or room type, order, text in English, text in Telugu, requires photo, remarks allowed.
- **ChecklistRun (a turnover):** property, BHK, date, caretaker, time, guest name, check-in time, number of guests, booking ref, status, signature.
- **ChecklistResponse:** item, ticked, remark, photos.
- **InventoryItem:** property, category (appliance, cookware, cutlery, crockery, linen, toiletries, consumable, tool), name English and Telugu, brand, model, material, unit, must-have qty, current stock, condition, last serviced, suggested brand, reorder flag, notes. Linen adds in use, in laundry, in reserve.
- **ProductCatalog (global):** product, recommended brands, spec, price range, where to buy, notes. Reused across all properties.
- **Staff or Caretaker:** name, phone, WhatsApp, emergency contact, age, gender, address, Aadhaar, accommodation, salary, duty hours, weekly off, languages, duties, training, PM remarks, property assignments.
- **Vendor:** name, contact, phone, WhatsApp, service type, area, rate, rating, notes. Laundry vendor adds pickup and delivery days, turnaround, per kg and per piece rate, monthly contract.
- **MaintenanceIssue:** property, area or item, description, type (plumbing, electrical, AC, carpentry, painting, pool, garden, appliance, structural, pest control, housekeeping), vendor, quoted amount, ownership, scheduled date, status (open, in progress, resolved).
- **LaundryDispatchLog:** date, pieces out, pieces back, damage notes.

---

## 5. Important flags

- **Telugu is primary, not just supported.** The whole checklist is written Telugu first alongside English. We design Telugu first and visual first.
- **Caretaker Aadhaar appears in the Property Bible.** That is staff PII. Apply the same care we planned for guests: do not store the raw number in plain form, restrict who can view, and consider masking or encryption. This is a DPDP point for staff data, not only guests.
- **Current workflow is paper plus WhatsApp photos.** Our app is a direct, familiar replacement. Keep the habit they know: a clear photo per area and an easy end of task summary.
- **Stock versus must-have quantity, condition, and last serviced** power two of the owner's stated goals: restocking alerts and ensuring appliances and electronics function. These are not extra ideas, they are already in the client's sheets.
- **Quantities follow rules** (1.5x guest capacity for crockery, 3 sets per bed for sheets, 2 towels per guest). We can auto compute must-have quantities from villa size and guest capacity, which speeds onboarding.

---

## 6. How this maps to Phase 1 (Modules 1 to 3)

Build now in Phase 1:
- Property and room structure, with the room-typed model that scales the checklist (Module 1).
- Staff and caretaker records and assignment (Module 1).
- Checklist framework, seeded with the real Pre Check-in Inspection as the first template (Module 1).
- Caretaker app: run the checklist, tick items, add remarks, capture a photo per area, offline (Module 2).
- PM review and approval, the Maintenance and issue tracker with type, ownership and status, escalation, and dashboards (Module 3).
- Owner read only view (Module 3).

Capture the structure now, decide timing with the client (likely a fast follow or later phase):
- Full inventory stock management and reorder alerts (restocking), the consumables and toiletries and linen sheets.
- Vendor directory and laundry tracking.
- The global suggested products catalog as seed reference data.

These last items are central to how Bliss works, so even if the full stock management is not in the ₹1.5L Phase 1, we design the data model to hold them from day one, so adding them later is smooth.

---

## 7. Recommendation

Use the real files to seed the first vertical slice:
- Load the Pre Check-in Inspection as the first checklist template.
- Load one Property Bible cover plus rooms plus caretaker as the first property setup.
- Build the slice end to end: set up that villa, caretaker runs the checklist offline with photos, PM reviews and approves, owner sees it.

This means our first demo runs on the client's own checklist and a real villa, which is the fastest way to get useful feedback.
