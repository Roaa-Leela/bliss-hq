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
