// Mock data for the demo, seeded from a real villa (Palm Grove Villa).
// No backend. This stands in for what Supabase will later provide.

export type AreaType = "bedroom" | "bathroom" | "living" | "dining" | "kitchen" | "pool" | "outdoor" | "safety";
export type Item = { id: string; textKey: string; requiresPhoto?: boolean };
export type Area = { id: string; type: AreaType; num?: number; items: Item[] };
export type Property = {
  id: string; name: string; bhk: string; location: string;
  checklist: string; guestTime: string; areas: Area[];
};

// The client's real Pre Check-in Inspection: a single smart template whose
// room-typed sets repeat per room and scale with villa size.
const SET: Record<string, string[]> = {
  bedroom: ["ci.bd1", "ci.bd2", "ci.bd3", "ci.bd4", "ci.bd5", "ci.bd6", "ci.bd7", "ci.bd8", "ci.bd9"],
  bathroom: ["ci.ba1", "ci.ba2", "ci.ba3", "ci.ba4", "ci.ba5", "ci.ba6", "ci.ba7"],
  living: ["ci.lv1", "ci.lv2", "ci.lv3", "ci.lv4", "ci.lv5", "ci.lv6"],
  dining: ["ci.dn1", "ci.dn2", "ci.dn3", "ci.dn4", "ci.dn5", "ci.dn6", "ci.dn7", "ci.dn8", "ci.dn9", "ci.dn10", "ci.dn11", "ci.dn12"],
  kitchen: ["ci.kt1", "ci.kt2", "ci.kt3", "ci.kt4", "ci.kt5", "ci.kt6"],
  pool: ["ci.pl1", "ci.pl2", "ci.pl3", "ci.pl4"],
  outdoor: ["ci.od1", "ci.od2", "ci.od3", "ci.od4", "ci.od5"],
  safety: ["ci.sf1", "ci.sf2", "ci.sf3", "ci.sf4"],
};
const PRE: Record<string, string> = { bedroom: "bd", bathroom: "ba", living: "lv", dining: "dn", kitchen: "kt", pool: "pl", outdoor: "od", safety: "sf" };

function area(id: string, type: AreaType, num?: number): Area {
  const tag = num ? `${PRE[type]}${num}` : PRE[type];
  return { id, type, num, items: SET[type].map((k, i) => ({ id: `${tag}-${i + 1}`, textKey: k, requiresPhoto: i === 0 })) };
}

// 4 BHK: bedrooms 1-4, bathrooms 1-4, plus the fixed sections.
const palmAreas: Area[] = [
  ...[1, 2, 3, 4].map((n) => area(`bedroom-${n}`, "bedroom", n)),
  ...[1, 2, 3, 4].map((n) => area(`bathroom-${n}`, "bathroom", n)),
  area("living", "living"),
  area("dining", "dining"),
  area("kitchen", "kitchen"),
  area("pool", "pool"),
  area("outdoor", "outdoor"),
  area("safety", "safety"),
];

export const property: Property = {
  id: "palm-grove",
  name: "Palm Grove Villa",
  bhk: "4 BHK",
  location: "Shamirpet",
  checklist: "Pre check-in",
  guestTime: "4:00 PM",
  areas: palmAreas,
};

// Other checklist types beyond pre check-in. These run as simple tick lists
// (daily/weekly/monthly are task routines, not room-by-room photo passes).
export type TaskItem = { id: string; textKey: string };
export type TaskChecklist = { id: string; freqKey: string; items: TaskItem[] };
export const taskChecklists: TaskChecklist[] = [
  { id: "postStay", freqKey: "freq.perStay", items: [
    { id: "ps1", textKey: "cl.ps1" }, { id: "ps2", textKey: "cl.ps2" }, { id: "ps3", textKey: "cl.ps3" },
    { id: "ps4", textKey: "cl.ps4" }, { id: "ps5", textKey: "cl.ps5" }, { id: "ps6", textKey: "cl.ps6" },
  ]},
  { id: "daily", freqKey: "freq.daily", items: [
    { id: "dl1", textKey: "cl.dl1" }, { id: "dl2", textKey: "cl.dl2" }, { id: "dl3", textKey: "cl.dl3" },
    { id: "dl4", textKey: "cl.dl4" }, { id: "dl5", textKey: "cl.dl5" },
  ]},
  { id: "weekly", freqKey: "freq.weekly", items: [
    { id: "wk1", textKey: "cl.wk1" }, { id: "wk2", textKey: "cl.wk2" }, { id: "wk3", textKey: "cl.wk3" },
    { id: "wk4", textKey: "cl.wk4" }, { id: "wk5", textKey: "cl.wk5" },
  ]},
  { id: "monthly", freqKey: "freq.monthly", items: [
    { id: "mo1", textKey: "cl.mo1" }, { id: "mo2", textKey: "cl.mo2" }, { id: "mo3", textKey: "cl.mo3" },
    { id: "mo4", textKey: "cl.mo4" }, { id: "mo5", textKey: "cl.mo5" },
  ]},
  { id: "adhoc", freqKey: "freq.adhoc", items: [
    { id: "ah1", textKey: "cl.ah1" }, { id: "ah2", textKey: "cl.ah2" }, { id: "ah3", textKey: "cl.ah3" },
  ]},
];

export type RoleId = "caretaker" | "manager" | "owner" | "admin";
export const roles: { id: RoleId; title: string; sub: string }[] = [
  { id: "caretaker", title: "Caretaker", sub: "Do checks on the ground" },
  { id: "manager", title: "Property Manager", sub: "Review and run operations" },
  { id: "owner", title: "Villa Owner", sub: "See your property" },
  { id: "admin", title: "Admin", sub: "Set up and oversee everything" },
];

// Demo data for manager, owner and laundry views.
export const managerProps = [
  { id: "palm-grove", name: "Palm Grove Villa", sub: "Pre check-in · Guest 4:00 PM", state: "ready" as const },
  { id: "misty", name: "Misty Acres", sub: "5 of 8 areas", state: "active" as const },
  { id: "lake", name: "Lake House", sub: "Not started", state: "todo" as const },
  { id: "fern", name: "Fern Villa", sub: "Post-stay cleaning", state: "active" as const },
];

export const openIssues = [
  { id: "i1", title: "AC not cooling", where: "Palm Grove · Bedroom 2", when: "2h ago", level: "alert" as const },
  { id: "i2", title: "Towels short", where: "Lake House · Restock", when: "Today", level: "warn" as const },
];

export const laundryItems = [
  { id: "l1", name: "Bed sheets", size: "Queen / King" },
  { id: "l2", name: "Pillow covers", size: "Standard" },
  { id: "l3", name: "Bath towels", size: "Large" },
  { id: "l4", name: "Hand towels", size: "Medium" },
  { id: "l5", name: "Duvet covers", size: "Queen / King" },
];

export const ownerTimeline = [
  { id: "t1", title: "Pre check-in inspection completed", sub: "12 June · all 8 areas passed", kind: "ok" as const },
  { id: "t2", title: "AC service done", sub: "10 June · vendor visit", kind: "info" as const },
  { id: "t3", title: "Damage reported and resolved", sub: "2 June · chair repaired", kind: "warn" as const },
  { id: "t4", title: "Post-stay cleaning completed", sub: "1 June", kind: "ok" as const },
];

// Inventory and vendors, drawn from the client's Property Bible.
// Inventory, drawn from the client's Property Bible (must-have qty / stock /
// condition, plus brand and Diversey code where the sheet tracks them).
export type InvItem = { id: string; cat: string; must: number; stock: number; condition: "good" | "fair" | "poor"; brand?: string; code?: string };
export const inventoryItems: InvItem[] = [
  { id: "iv1", cat: "kitchen", must: 1, stock: 1, condition: "good", brand: "LG" },
  { id: "iv2", cat: "kitchen", must: 1, stock: 1, condition: "fair", brand: "IFB" },
  { id: "iv3", cat: "kitchen", must: 2, stock: 1, condition: "good", brand: "Prestige" },
  { id: "iv11", cat: "kitchen", must: 1, stock: 1, condition: "good", brand: "Morphy Richards" },
  { id: "iv12", cat: "kitchen", must: 1, stock: 1, condition: "good", brand: "Preethi" },
  { id: "iv4", cat: "crockery", must: 12, stock: 12, condition: "good", brand: "Corelle" },
  { id: "iv5", cat: "crockery", must: 12, stock: 8, condition: "good", brand: "Borosil" },
  { id: "iv13", cat: "crockery", must: 12, stock: 10, condition: "good", brand: "Borosil" },
  { id: "iv6", cat: "linen", must: 9, stock: 9, condition: "good" },
  { id: "iv7", cat: "linen", must: 6, stock: 4, condition: "fair" },
  { id: "iv14", cat: "linen", must: 6, stock: 6, condition: "good" },
  { id: "iv8", cat: "toiletries", must: 2, stock: 0, condition: "good" },
  { id: "iv15", cat: "toiletries", must: 2, stock: 1, condition: "good" },
  { id: "iv9", cat: "consumables", must: 3, stock: 1, condition: "good", code: "R7" },
  { id: "iv10", cat: "consumables", must: 3, stock: 3, condition: "good", code: "R6" },
  { id: "iv16", cat: "consumables", must: 2, stock: 2, condition: "good", code: "R3" },
];

export type Vendor = { id: string; trade: string; nameKey: string; name: string; area: string; rating: number; phone?: string; rate?: string };
export const vendors: Vendor[] = [
  { id: "vd1", trade: "plumbing", nameKey: "vend.vd1", name: "Sai Plumbing Works", area: "Shamirpet", rating: 5, phone: "+91 98480 11234", rate: "₹400/visit" },
  { id: "vd2", trade: "electrical", nameKey: "vend.vd2", name: "Sri Lakshmi Electricals", area: "Medchal", rating: 4, phone: "+91 91540 22345", rate: "₹350/visit" },
  { id: "vd3", trade: "ac", nameKey: "vend.vd3", name: "CoolCare AC Service", area: "Shamirpet", rating: 5, phone: "+91 99590 33456", rate: "₹600/service" },
  { id: "vd4", trade: "pool", nameKey: "vend.vd4", name: "AquaPure Pool Care", area: "Hyderabad", rating: 4, phone: "+91 90000 44567", rate: "₹2,500/month" },
  { id: "vd5", trade: "laundry", nameKey: "vend.vd5", name: "FreshFold Laundry", area: "Kompally", rating: 5, phone: "+91 70320 55678", rate: "₹18/kg" },
  { id: "vd6", trade: "pest", nameKey: "vend.vd6", name: "GreenShield Pest Control", area: "Medchal", rating: 4, phone: "+91 96660 66789", rate: "₹1,200/visit" },
  { id: "vd9", trade: "carpentry", nameKey: "vend.vd9", name: "Sri Venkateswara Carpentry", area: "Shamirpet", rating: 4, phone: "+91 94400 77810", rate: "₹500/visit" },
  { id: "vd10", trade: "painting", nameKey: "vend.vd10", name: "ColourKraft Painters", area: "Medchal", rating: 4, phone: "+91 81060 88921", rate: "₹450/visit" },
  { id: "vd7", trade: "supplies", nameKey: "vend.vd7", name: "Banjara General Stores", area: "Banjara Hills", rating: 5, phone: "+91 99490 99032", rate: "—" },
  { id: "vd8", trade: "supplies", nameKey: "vend.vd8", name: "Hyderabad Hospitality Supplies", area: "Madhapur", rating: 4, phone: "+91 93470 10143", rate: "—" },
];

// Preferred supply vendor for each inventory category (used by procurement).
export const prefVendorByCat: Record<string, string> = {
  kitchen: "vd8", crockery: "vd8", linen: "vd7", toiletries: "vd7", consumables: "vd7",
};

// Caretakers / staff record (from the Property Bible Caretaker Details sheet).
// Aadhaar is stored masked — DPDP care for staff PII.
export type Caretaker = {
  id: string; nameKey: string; propId: string; phone: string; emergency: string;
  age: number; genderKey: string; address: string; aadhaar: string; accommodationKey: string;
  salary: number; dutyHours: string; weeklyOffKey: string; languages: string; dutiesKey: string; trained: boolean; joined: string;
};
export const caretakers: Caretaker[] = [
  { id: "c1", nameKey: "name.ramesh", propId: "palm-grove", phone: "+91 98765 43210", emergency: "+91 98765 11111", age: 34, genderKey: "gen.male", address: "Shamirpet, Hyderabad", aadhaar: "XXXX XXXX 1234", accommodationKey: "acc.on", salary: 18000, dutyHours: "7:00 AM – 7:00 PM", weeklyOffKey: "day.tue", languages: "Telugu, Hindi", dutiesKey: "duty.full", trained: true, joined: "Jan 2024" },
  { id: "c2", nameKey: "name.lakshmi", propId: "misty", phone: "+91 91234 56780", emergency: "+91 91234 22222", age: 29, genderKey: "gen.female", address: "Medchal, Hyderabad", aadhaar: "XXXX XXXX 5678", accommodationKey: "acc.off", salary: 17000, dutyHours: "8:00 AM – 6:00 PM", weeklyOffKey: "day.mon", languages: "Telugu", dutiesKey: "duty.house", trained: true, joined: "Mar 2024" },
  { id: "c3", nameKey: "name.anil", propId: "lake", phone: "+91 99887 76655", emergency: "+91 99887 33333", age: 41, genderKey: "gen.male", address: "Kompally, Hyderabad", aadhaar: "XXXX XXXX 9012", accommodationKey: "acc.on", salary: 18500, dutyHours: "7:00 AM – 7:00 PM", weeklyOffKey: "day.wed", languages: "Telugu, Hindi", dutiesKey: "duty.full", trained: false, joined: "May 2024" },
];

export type IssueStatus = "open" | "in_progress" | "resolved";
export type Assignee = { type: "vendor" | "caretaker"; id: string } | null;
// Maintenance Tracker taxonomy (from the Property Bible)
export const maintenanceTypes = ["plumbing", "electrical", "ac", "appliance", "pool", "garden", "carpentry", "painting", "pest", "housekeeping", "structural"] as const;
export const ownerships = ["PM", "CT", "VD", "OWN"] as const; // Manager, Caretaker, Vendor, Owner
export type IssueRec = {
  id: string; propId: string; locKey: string; titleKey: string; title?: string;
  cat: string; sev: "low" | "medium" | "high"; status: IssueStatus; whenKey: string; assignee: Assignee;
  type?: string; ownership?: string; amount?: number; // PM triage fields (Maintenance Tracker)
};
export const issuesData: IssueRec[] = [
  { id: "i1", propId: "palm-grove", locKey: "loc.bedroom2", titleKey: "ix.ac", cat: "maintenance", sev: "high", status: "open", whenKey: "when.2h", assignee: null, type: "ac", ownership: "VD", amount: 2500 },
  { id: "i2", propId: "lake", locKey: "loc.restock", titleKey: "ix.towels", cat: "missing", sev: "medium", status: "open", whenKey: "when.today", assignee: null, type: "housekeeping", ownership: "CT" },
  { id: "i5", propId: "palm-grove", locKey: "loc.pool", titleKey: "ix.poolpump", cat: "maintenance", sev: "medium", status: "in_progress", whenKey: "when.today", assignee: { type: "vendor", id: "vd4" }, type: "pool", ownership: "VD", amount: 1800 },
  { id: "i3", propId: "misty", locKey: "loc.bathroom1", titleKey: "ix.geyser", cat: "maintenance", sev: "high", status: "in_progress", whenKey: "when.yest", assignee: { type: "vendor", id: "vd1" }, type: "plumbing", ownership: "VD", amount: 1200 },
  { id: "i6", propId: "fern", locKey: "loc.kitchen", titleKey: "ix.fridge", cat: "electronic", sev: "low", status: "in_progress", whenKey: "when.yest", assignee: { type: "vendor", id: "vd3" }, type: "appliance", ownership: "VD", amount: 3000 },
  { id: "i7", propId: "palm-grove", locKey: "loc.bathroom-1", titleKey: "ix.restock", cat: "missing", sev: "low", status: "in_progress", whenKey: "when.today", assignee: { type: "caretaker", id: "c1" }, type: "housekeeping", ownership: "CT" },
  { id: "i4", propId: "fern", locKey: "loc.living", titleKey: "ix.bulb", cat: "electronic", sev: "low", status: "resolved", whenKey: "when.2d", assignee: { type: "vendor", id: "vd2" }, type: "electrical", ownership: "VD", amount: 150 },
];

// Procurement: purchase requests move Requested -> Approved -> Ordered (PO to a supplier).
export type PRStatus = "requested" | "approved" | "ordered";
export type PRLine = { itemId: string; qty: number };
export type PurchaseReq = {
  id: string; lines: PRLine[]; status: PRStatus;
  vendorId: string | null; poNum: string | null; whenKey: string;
};
export const purchaseReqsData: PurchaseReq[] = [
  { id: "pr1", lines: [{ itemId: "iv9", qty: 2 }], status: "requested", vendorId: null, poNum: null, whenKey: "when.today" },
  { id: "pr2", lines: [{ itemId: "iv7", qty: 2 }], status: "approved", vendorId: "vd7", poNum: null, whenKey: "when.yest" },
  { id: "pr3", lines: [{ itemId: "iv3", qty: 1 }, { itemId: "iv5", qty: 4 }], status: "ordered", vendorId: "vd8", poNum: "PO-2041", whenKey: "when.2d" },
];

// Availability calendar: sample bookings for June 2026 (demo month).
export type Booking = { id: string; propId: string; start: number; end: number; guestKey: string };
export const calMonth = { year: 2026, month: 6, days: 30, firstDow: 1, todayDate: 13 }; // June 2026 starts on Monday
export const DEPOSIT_AMOUNT = 10000; // sample security deposit per stay (INR)
export const depositReasons = ["damage", "missing", "cleaning", "late"] as const;

// Security deposit deduction requests: PM raises, owner approves or declines.
export type DeductionStatus = "pending" | "approved" | "declined";
export type Deduction = { id: string; propId: string; guestKey: string; amount: number; reasonKey: string; status: DeductionStatus; whenKey: string };
export const deductionsData: Deduction[] = [
  { id: "dd1", propId: "palm-grove", guestKey: "guest.rao", amount: 1500, reasonKey: "dep.reason.damage", status: "pending", whenKey: "when.yest" },
];
export const bookingsData: Booking[] = [
  { id: "bk1", propId: "palm-grove", start: 6, end: 8, guestKey: "guest.sharma" },
  { id: "bk2", propId: "palm-grove", start: 13, end: 16, guestKey: "guest.rao" },
  { id: "bk3", propId: "palm-grove", start: 24, end: 27, guestKey: "guest.khan" },
  { id: "bk4", propId: "misty", start: 2, end: 5, guestKey: "guest.reddy" },
  { id: "bk5", propId: "misty", start: 18, end: 21, guestKey: "guest.mehta" },
  { id: "bk6", propId: "lake", start: 10, end: 14, guestKey: "guest.iyer" },
  { id: "bk7", propId: "lake", start: 27, end: 30, guestKey: "guest.sharma" },
  { id: "bk8", propId: "fern", start: 7, end: 9, guestKey: "guest.rao" },
  { id: "bk9", propId: "fern", start: 20, end: 23, guestKey: "guest.khan" },
];

// In-app notifications, aggregated across the modules.
export type NotifKind = "review" | "issue" | "stock" | "po" | "approved" | "laundry";
export type Notif = {
  id: string; kind: NotifKind; titleKey: string; subKey: string; whenKey: string;
  route: string; read: boolean; propId?: string; rawSub?: string;
};
export const notificationsData: Notif[] = [
  { id: "n1", kind: "review", titleKey: "nt.review.t", subKey: "nt.review.s", whenKey: "when.today", route: "/manager/review", read: false, propId: "palm-grove" },
  { id: "n2", kind: "issue", titleKey: "nt.issue.t", subKey: "nt.issue.s", whenKey: "when.2h", route: "/manager/issues", read: false },
  { id: "n3", kind: "stock", titleKey: "nt.stock.t", subKey: "nt.stock.s", whenKey: "when.today", route: "/procurement", read: false },
  { id: "n4", kind: "laundry", titleKey: "nt.laundry.t", subKey: "nt.laundry.s", whenKey: "when.yest", route: "/manager/laundry", read: true },
  { id: "n5", kind: "po", titleKey: "nt.po.t", subKey: "nt.po.s", whenKey: "when.2d", route: "/procurement", read: true },
  { id: "n6", kind: "approved", titleKey: "nt.approved.t", subKey: "nt.approved.s", whenKey: "when.2d", route: "/manager/review", read: true, propId: "misty" },
];

// Property readiness baseline for villas the caretaker app does not drive directly.
// Palm Grove is derived live from the caretaker's inspection progress + approval.
export type Readiness = "todo" | "active" | "review" | "ready";
export const baseReadiness: Record<string, Readiness> = {
  misty: "review", lake: "todo", fern: "ready",
};

// Last laundry list sent up from a caretaker (seeded with a recent one).
export type LaundrySubmission = { propId: string; counts: Record<string, number>; total: number; whenKey: string };
export const laundrySeed: LaundrySubmission = {
  propId: "lake", counts: { l1: 5, l3: 6, l2: 3 }, total: 14, whenKey: "when.yest",
};

// Stock movements: every count, consumption or receipt is logged for an item.
export type MoveType = "receipt" | "consumption" | "count";
export type StockMove = { id: string; itemId: string; type: MoveType; delta: number; resulting: number; whenKey: string };
export const stockMovesData: StockMove[] = [
  { id: "sm1", itemId: "iv5", type: "consumption", delta: -4, resulting: 8, whenKey: "when.2d" },
  { id: "sm2", itemId: "iv7", type: "consumption", delta: -2, resulting: 4, whenKey: "when.yest" },
  { id: "sm3", itemId: "iv8", type: "consumption", delta: -2, resulting: 0, whenKey: "when.yest" },
  { id: "sm4", itemId: "iv4", type: "receipt", delta: 4, resulting: 12, whenKey: "when.2d" },
];
