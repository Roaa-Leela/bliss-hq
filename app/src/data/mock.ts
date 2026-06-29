// Mock data for the demo, seeded from a real villa (Palm Grove Villa).
// No backend. This stands in for what Supabase will later provide.

export type Item = { id: string; text: string; requiresPhoto?: boolean };
export type Area = { id: string; name: string; items: Item[] };
export type Property = {
  id: string; name: string; bhk: string; location: string;
  checklist: string; guestTime: string; areas: Area[];
};

export const property: Property = {
  id: "palm-grove",
  name: "Palm Grove Villa",
  bhk: "4 BHK",
  location: "Shamirpet",
  checklist: "Pre check-in",
  guestTime: "4:00 PM",
  areas: [
    { id: "bedroom-1", name: "Bedroom 1", items: [
      { id: "b1-1", text: "Bed made neatly with fresh linen, pillow covers clean", requiresPhoto: true },
      { id: "b1-2", text: "Water bottle and 2 glasses placed in the room" },
      { id: "b1-3", text: "AC and fan are clean and working" },
      { id: "b1-4", text: "All lights and switches working" },
    ]},
    { id: "bathroom-1", name: "Bathroom 1", items: [
      { id: "ba1-1", text: "Toiletries refilled and bath towels placed", requiresPhoto: true },
      { id: "ba1-2", text: "Toilet, basin and floor cleaned, no smell" },
      { id: "ba1-3", text: "Geyser and lights working" },
    ]},
    { id: "living", name: "Living room", items: [
      { id: "lv-1", text: "Cushions arranged and throws folded neatly on the sofa", requiresPhoto: true },
      { id: "lv-2", text: "Floor swept and mopped, surfaces dusted" },
      { id: "lv-3", text: "TV, AC and lights working" },
      { id: "lv-4", text: "Wi-Fi card placed and working" },
    ]},
    { id: "kitchen", name: "Kitchen", items: [
      { id: "k-1", text: "Counter and sink clean and dry", requiresPhoto: true },
      { id: "k-2", text: "Fridge clean, switched on and empty of old food" },
      { id: "k-3", text: "Gas, induction and chimney working" },
      { id: "k-4", text: "Tea, coffee, sugar and water stocked" },
    ]},
    { id: "pool", name: "Pool area", items: [
      { id: "p-1", text: "Pool water clean, no leaves floating", requiresPhoto: true },
      { id: "p-2", text: "Pool deck swept, chairs arranged" },
    ]},
    { id: "outdoor", name: "Outdoor & garden", items: [
      { id: "o-1", text: "Garden tidy, lawn presentable", requiresPhoto: true },
      { id: "o-2", text: "Outdoor lights working" },
    ]},
    { id: "safety", name: "Safety & security", items: [
      { id: "s-1", text: "Main door lock and latches working" },
      { id: "s-2", text: "First aid kit and emergency numbers in place" },
    ]},
  ],
};

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
export const inventoryItems = [
  { id: "iv1", cat: "kitchen", must: 1, stock: 1, condition: "good" as const },
  { id: "iv2", cat: "kitchen", must: 1, stock: 1, condition: "fair" as const },
  { id: "iv3", cat: "kitchen", must: 2, stock: 1, condition: "good" as const },
  { id: "iv4", cat: "crockery", must: 12, stock: 12, condition: "good" as const },
  { id: "iv5", cat: "crockery", must: 12, stock: 8, condition: "good" as const },
  { id: "iv6", cat: "linen", must: 9, stock: 9, condition: "good" as const },
  { id: "iv7", cat: "linen", must: 6, stock: 4, condition: "fair" as const },
  { id: "iv8", cat: "toiletries", must: 2, stock: 0, condition: "good" as const },
  { id: "iv9", cat: "consumables", must: 3, stock: 1, condition: "good" as const },
  { id: "iv10", cat: "consumables", must: 3, stock: 3, condition: "good" as const },
];

export const vendors = [
  { id: "vd1", trade: "plumbing", name: "Sai Plumbing Works", area: "Shamirpet", rating: 5 },
  { id: "vd2", trade: "electrical", name: "Sri Lakshmi Electricals", area: "Medchal", rating: 4 },
  { id: "vd3", trade: "ac", name: "CoolCare AC Service", area: "Shamirpet", rating: 5 },
  { id: "vd4", trade: "pool", name: "AquaPure Pool Care", area: "Hyderabad", rating: 4 },
  { id: "vd5", trade: "laundry", name: "FreshFold Laundry", area: "Kompally", rating: 5 },
  { id: "vd6", trade: "pest", name: "GreenShield Pest Control", area: "Medchal", rating: 4 },
];
