# ERPNext vs Custom Build: Objective Evaluation

A thorough, rubric based comparison to decide how to build the inventory, procurement, vendor, and back office layer. Scoring is weighted and transparent so the decision is defensible, not a matter of taste.

---

## First, frame the real choice

The caretaker field app must be custom no matter what. ERPNext is online and is not a low literacy, offline first field interface, so it cannot be the caretaker app. That part is settled.

So the real question is how we build the inventory, procurement, vendor directory, and (later) accounting layer. Two strategies:

- **Strategy A, Custom build everything:** build inventory, procurement, purchase orders, vendor directory, and accounting links ourselves on the same custom stack (Supabase, Postgres, React).
- **Strategy B, ERPNext hybrid:** custom field app for caretaker and dashboards, plus ERPNext for inventory, procurement, vendors, and accounting, integrated by API.

(A third option, ERPNext for everything including the field app, is not viable because of the offline and low literacy requirement, so it is excluded.)

---

## Scoring method

- Ten criteria, each given a weight that sums to 100, reflecting what matters for this client.
- Each strategy scored 1 to 5 per criterion (5 is best).
- Weighted score = score x weight. Totals are out of 500.

---

## The scorecard

| # | Criterion | Weight | Custom build (score) | Custom (weighted) | ERPNext hybrid (score) | ERPNext (weighted) |
|---|---|---|---|---|---|---|
| 1 | Requirement fit for inventory, procurement, PO, multi property | 18 | 3 | 54 | 5 | 90 |
| 2 | Speed to ship | 16 | 2 | 32 | 4 | 64 |
| 3 | Total cost (build plus run) | 12 | 3 | 36 | 4 | 48 |
| 4 | Field and offline UX (caretaker app) | 12 | 5 | 60 | 5 | 60 |
| 5 | Integration simplicity (fewer moving parts) | 10 | 5 | 50 | 3 | 30 |
| 6 | Customisation for bespoke villa workflows | 10 | 5 | 50 | 4 | 40 |
| 7 | India compliance (GST, accounting, e-invoicing) | 8 | 2 | 16 | 5 | 40 |
| 8 | Maintainability and talent availability | 8 | 4 | 32 | 4 | 32 |
| 9 | Data ownership and low lock in | 3 | 5 | 15 | 5 | 15 |
| 10 | Operational and hosting burden | 3 | 4 | 12 | 3 | 9 |
| | **Total** | **100** | | **357** | | **428** |

**Result: ERPNext hybrid 428, Custom build 357 (out of 500).** ERPNext hybrid wins by a clear margin.

---

## Why each row scored that way

1. **Requirement fit.** The client's asks map almost one to one onto ERPNext: central item master, categories, unit of measure, preferred vendor, last purchase price, reorder thresholds, purchase request to purchase order, per property stock, composite ordering, and an accounting link. ERPNext does all of this natively. Custom would have to build every piece.
2. **Speed.** Configuring ERPNext is far faster than building an inventory and procurement system from scratch.
3. **Cost.** ERPNext software is free and saves large build effort. It costs more in hosting and integration, so the edge is moderate, not huge.
4. **Field and offline UX.** Equal, because the caretaker app is custom in both strategies.
5. **Integration simplicity.** Custom wins. One system is simpler than two systems that must stay in sync.
6. **Customisation.** Custom wins slightly. Total control versus ERPNext being flexible but opinionated for back office.
7. **India compliance.** ERPNext wins strongly. Native GST, e-invoicing, and accounting. Custom would be a major build, and the client explicitly mentioned linking purchases to an accounting module.
8. **Maintainability.** A tie. ERPNext has a huge community but needs Frappe specific skills. Custom uses common React and Postgres skills but every feature is ours to maintain.
9. **Data ownership.** A tie. Both are open source and exportable.
10. **Ops burden.** Custom wins slightly. ERPNext is a heavier stack to run and patch.

---

## When custom would have won instead

To be fair to the other side, Strategy A would win if any of these were true:
- Inventory needs were trivial (a simple list), so an ERP would be overkill.
- The workflows were so bespoke that ERPNext would have to be fought rather than configured.
- We wanted exactly one system and were willing to trade speed and compliance for that simplicity.

None of these hold here. The client's needs are classic inventory and procurement, which is exactly ERPNext's home turf, and they want accounting linkage, which is expensive to build custom.

---

## Recommendation

Adopt **Strategy B, the ERPNext hybrid**, for inventory, procurement, vendors, and accounting. Build the caretaker app, checklists, photos, and dashboards custom.

**But sequence it carefully.** Phase 1 (the ₹1.5L ops core, the client's module 1 first) does not need ERPNext yet. Build the custom ops core first and ship it for review. Bring ERPNext in when we reach the inventory and procurement chunk (the client's module 3). This gives the best of both: a fast, lean first delivery, and a properly built inventory and procurement layer that we do not have to throw away.

Design note for now: shape the data model and the field app so stock counts captured offline by caretakers can sync into ERPNext later, since ERPNext itself is online.
