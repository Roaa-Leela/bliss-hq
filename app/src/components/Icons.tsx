import type { ReactNode } from "react";

type P = { size?: number; color?: string; stroke?: number };
const base = (size: number) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none" as const });

// One uniform line-icon family: 24-grid, round caps and joins, currentColor.
function I({ size = 24, color = "currentColor", stroke = 1.8, children }: P & { children: ReactNode }) {
  return (
    <svg {...base(size)} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">{children}</svg>
  );
}

/* ---- Navigation / actions ---- */
export const Arrow = ({ size = 20, color = "#fff", stroke = 2.4 }: P) => (
  <svg {...base(size)}><path d="M5 12h13M13 6l6 6-6 6" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const Check = ({ size = 20, color = "#fff", stroke = 2.6 }: P) => (
  <svg {...base(size)}><path d="M5 12l5 5 9-11" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const Back = ({ size = 20, color = "#2D4A1A", stroke = 2.4 }: P) => (
  <svg {...base(size)}><path d="M15 5l-7 7 7 7" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const Camera = ({ size = 26, color = "#2D4A1A", stroke = 1.7 }: P) => (
  <I size={size} color={color} stroke={stroke}>
    <path d="M3 8a2 2 0 012-2h2l1.5-2h7L18 6h1a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <circle cx="12" cy="12.5" r="3.4" />
  </I>
);
export const Bell = ({ size = 22, color = "#2D4A1A", stroke = 1.9 }: P) => (
  <I size={size} color={color} stroke={stroke}><path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 004 0" /></I>
);
export const Calendar = ({ size = 22, color = "#2D4A1A", stroke = 1.9 }: P) => (
  <I size={size} color={color} stroke={stroke}><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></I>
);
export const Phone = ({ size = 16, color = "currentColor", stroke = 1.8 }: P) => (
  <I size={size} color={color} stroke={stroke}><path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 005.5 5.5L16 17l4 1.5v3a1.5 1.5 0 01-1.6 1.5A17 17 0 013 6.6 1.5 1.5 0 014.5 5h2z" /></I>
);
export const Swap = ({ size = 22, color = "#fff", stroke = 1.9 }: P) => (
  <I size={size} color={color} stroke={stroke}><path d="M16 3l4 4-4 4" /><path d="M20 7H9a4 4 0 00-4 4" /><path d="M8 21l-4-4 4-4" /><path d="M4 17h11a4 4 0 004-4" /></I>
);

/* ---- Roles ---- */
export const Person = ({ size = 26, color = "#2D4A1A", stroke = 1.8 }: P) => (
  <I size={size} color={color} stroke={stroke}><circle cx="12" cy="8" r="3.4" /><path d="M5.5 19.5c.7-3.7 12.3-3.7 13 0" /></I>
);
const Manager = (p: P) => (
  <I {...p}><rect x="5" y="4" width="14" height="17" rx="2" /><path d="M9 4h6v3H9z" /><path d="M8.5 13l2 2 4-4.5" /></I>
);
const Owner = (p: P) => (
  <I {...p}><path d="M4 11l8-6 8 6" /><path d="M6 10v9h12v-9" /><path d="M10 19v-5h4v5" /></I>
);
const Admin = (p: P) => (
  <I {...p}><path d="M4 7h8M16 7h4M4 17h4M12 17h8" /><circle cx="14" cy="7" r="2.2" /><circle cx="8" cy="17" r="2.2" /></I>
);

/* ---- Areas ---- */
export const Bed = ({ size = 26, color = "#2D4A1A", stroke = 1.8 }: P) => (
  <I size={size} color={color} stroke={stroke}><path d="M3 12V7a2 2 0 012-2h14a2 2 0 012 2v5M3 12h18M3 12v6M21 12v6M6 9h4" /></I>
);
const Bath = (p: P) => (
  <I {...p}><path d="M12 3v4" /><path d="M7 11a5 5 0 0110 0z" /><path d="M8 15v1.5M12 15.5v1.5M16 15v1.5" /></I>
);
const Sofa = (p: P) => (
  <I {...p}><path d="M5 11V9a2 2 0 012-2h10a2 2 0 012 2v2" /><path d="M4 11a2 2 0 012 2v3h12v-3a2 2 0 012-2 2 2 0 00-2-2 2 2 0 00-2 2v1H8v-1a2 2 0 00-2-2 2 2 0 00-2 2z" /><path d="M6 19v1.5M18 19v1.5" /></I>
);
const Stove = (p: P) => (
  <I {...p}><rect x="4" y="5" width="16" height="14" rx="2" /><circle cx="9" cy="10" r="2" /><circle cx="15" cy="10" r="2" /><path d="M7.5 15h9" /></I>
);
const Pool = (p: P) => (
  <I {...p}><path d="M3 14.5c1.4 0 1.4 1.1 2.8 1.1s1.4-1.1 2.8-1.1 1.4 1.1 2.8 1.1 1.4-1.1 2.8-1.1 1.4 1.1 2.8 1.1 1.4-1.1 2.8-1.1" /><path d="M3 18.5c1.4 0 1.4 1.1 2.8 1.1s1.4-1.1 2.8-1.1" /><path d="M9 13V6.5M12.5 13V6.5M9 9h3.5" /></I>
);
const Garden = (p: P) => (
  <I {...p}><path d="M12 13c0-3 1.8-5 4.5-5 0 3-1.8 5-4.5 5z" /><path d="M12 13c0-3-1.8-5-4.5-5 0 3 1.8 5 4.5 5z" /><path d="M12 13v4" /><path d="M8 17h8l-1 4H9z" /></I>
);
const Shield = (p: P) => (
  <I {...p}><path d="M12 3l7 3v5c0 4-3 6.8-7 8-4-1.2-7-4-7-8V6z" /><path d="M9 12l2 2 4-4" /></I>
);

/* ---- Issue categories ---- */
const Spray = (p: P) => (
  <I {...p}><path d="M9 9h4v10a1 1 0 01-1 1h-2a1 1 0 01-1-1z" /><path d="M9 9V6.5h4" /><path d="M13 6.5h2l1 2.5" /><path d="M17 4.5v1M19 5.5v1M18 8v1" /></I>
);
const Alert = (p: P) => (
  <I {...p}><path d="M12 4.5l8.5 14.5H3.5z" /><path d="M12 10v4" /><path d="M12 17h.01" /></I>
);
const Box = (p: P) => (
  <I {...p}><path d="M4 8l8-4 8 4-8 4z" /><path d="M4 8v8l8 4 8-4V8" /><path d="M12 12v8" /></I>
);
const Bolt = (p: P) => (
  <I {...p}><path d="M13 3L5 13h5l-1 8 8-11h-5z" /></I>
);

/* ---- Inventory categories / vendor trades ---- */
const Plate = (p: P) => (
  <I {...p}><circle cx="10" cy="12" r="7" /><circle cx="10" cy="12" r="3.2" /><path d="M19 5v8M19 5c1.2 0 1.2 4-0 4" /></I>
);
const Towel = (p: P) => (
  <I {...p}><rect x="5" y="4" width="14" height="16" rx="2" /><path d="M9 4v16M9 7h2.5M9 10h2.5" /></I>
);
const Bottle = (p: P) => (
  <I {...p}><path d="M10 3h4v3l1 2v11a2 2 0 01-2 2h-2a2 2 0 01-2-2V8l1-2z" /><path d="M9 12h6" /></I>
);
const Wrench = (p: P) => (
  <I {...p}><path d="M15.5 7.5a3.5 3.5 0 01-4.6 4.6l-5.2 5.2a1.7 1.7 0 002.4 2.4l5.2-5.2a3.5 3.5 0 004.6-4.6l-2.3 2.3-2.1-2.1z" /></I>
);
const Drop = (p: P) => (
  <I {...p}><path d="M12 3.5c3 4 5 6.4 5 9a5 5 0 01-10 0c0-2.6 2-5 5-9z" /></I>
);
const Broom = (p: P) => (
  <I {...p}><path d="M16 4l-7 7" /><path d="M8 10l6 6" /><path d="M14 16c-1.5 1.5-4 3-7 4-1-3 .5-5.5 2-7z" /></I>
);
const Bug = (p: P) => (
  <I {...p}><ellipse cx="12" cy="13" rx="4" ry="5" /><path d="M12 9V6a2 2 0 012-2M8 11H5M19 11h-3M8 14H4.5M19.5 14H16M8.5 18l-2.5 2M15.5 18l2.5 2" /></I>
);

/* ---- Checklist types ---- */
const Door = (p: P) => (
  <I {...p}><path d="M6 21V4a1 1 0 011-1h10a1 1 0 011 1v17" /><path d="M4 21h16" /><circle cx="14.5" cy="12" r="1" /></I>
);
const Refresh = (p: P) => (
  <I {...p}><path d="M4.5 12a7.5 7.5 0 0113-5" /><path d="M18 4v3.5h-3.5" /><path d="M19.5 12a7.5 7.5 0 01-13 5" /><path d="M6 20v-3.5h3.5" /></I>
);
const Sun = (p: P) => (
  <I {...p}><circle cx="12" cy="12" r="3.8" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" /></I>
);
const Moon = (p: P) => (
  <I {...p}><path d="M20 14a8 8 0 11-9-11 6.2 6.2 0 009 11z" /></I>
);
const Flag = (p: P) => (
  <I {...p}><path d="M6 21V4" /><path d="M6 5h11l-2.2 3.2L17 11.5H6" /></I>
);
const List = (p: P) => (
  <I {...p}><path d="M9 6h11M9 12h11M9 18h11" /><path d="M4 6h.01M4 12h.01M4 18h.01" /></I>
);
const CheckSquare = (p: P) => (
  <I {...p}><rect x="4" y="4" width="16" height="16" rx="3.5" /><path d="M8 12l3 3 5-6" /></I>
);
const Washer = (p: P) => (
  <I {...p}><rect x="5" y="3" width="14" height="18" rx="2" /><circle cx="12" cy="13" r="4" /><path d="M8 6h.01M11 6h.01" /></I>
);

/* ---- Notification kinds ---- */
const Eye = (p: P) => (
  <I {...p}><path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6-9-6-9-6z" /><circle cx="12" cy="12" r="2.6" /></I>
);
export const Cart = (p: P) => (
  <I {...p}><path d="M4 5h2l1.6 9.5a1.5 1.5 0 001.5 1.3h7a1.5 1.5 0 001.5-1.2L19 8H7" /><circle cx="10" cy="19" r="1.3" /><circle cx="17" cy="19" r="1.3" /></I>
);

/* ---- Misc ---- */
export const Home = (p: P) => (
  <I {...p}><path d="M4 11l8-6 8 6" /><path d="M6 10v9h12v-9" /><path d="M10 19v-5h4v5" /></I>
);
const Clock = (p: P) => (
  <I {...p}><circle cx="12" cy="12" r="8" /><path d="M12 7.5V12l3 2" /></I>
);
const Pillow = (p: P) => (
  <I {...p}><rect x="4" y="7" width="16" height="10" rx="4" /><path d="M7 8.5c0 3 0 4 0 7M17 8.5c0 3 0 4 0 7" stroke-width="1.4" opacity="0.5" /></I>
);
const Linen = (p: P) => (
  <I {...p}><rect x="4" y="6" width="16" height="5" rx="2" /><rect x="6" y="11" width="14" height="5" rx="2" /><path d="M8 8.5h3M10 13.5h3" stroke-width="1.4" opacity="0.6" /></I>
);
export const Signal = ({ size = 22, color = "currentColor", stroke = 1.8, level = 3 }: P & { level?: number }) => (
  <svg {...base(size)} stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="13.5" width="4" height="6.5" rx="1.2" fill={level >= 1 ? color : "none"} />
    <rect x="10" y="9.5" width="4" height="10.5" rx="1.2" fill={level >= 2 ? color : "none"} />
    <rect x="16" y="5" width="4" height="15" rx="1.2" fill={level >= 3 ? color : "none"} />
  </svg>
);

/* ---- Lookup helpers (keep iconography consistent across screens) ---- */
const roleMap: Record<string, (p: P) => ReactNode> = { caretaker: Person, manager: Manager, owner: Owner, admin: Admin };
const areaMap: Record<string, (p: P) => ReactNode> = {
  bedroom: Bed, bathroom: Bath, living: Sofa, dining: Plate, kitchen: Stove, pool: Pool, outdoor: Garden, safety: Shield,
};
const catMap: Record<string, (p: P) => ReactNode> = {
  cleaning: Spray, damage: Alert, missing: Box, maintenance: Wrench, electronic: Bolt,
};
const invMap: Record<string, (p: P) => ReactNode> = {
  kitchen: Stove, crockery: Plate, linen: Towel, toiletries: Bottle, consumables: Drop,
};
const tradeMap: Record<string, (p: P) => ReactNode> = {
  plumbing: Drop, electrical: Bolt, ac: Refresh, pool: Pool, laundry: Washer, pest: Bug, supplies: Box,
};
const clMap: Record<string, (p: P) => ReactNode> = {
  preCheckin: Door, postStay: Broom, daily: Sun, weekly: Calendar, monthly: Moon, adhoc: Flag,
};
const notifMap: Record<string, (p: P) => ReactNode> = {
  review: Eye, issue: Alert, stock: Box, po: Cart, approved: Shield, laundry: Washer,
};
const quickMap: Record<string, (p: P) => ReactNode> = { checklists: List, tasks: CheckSquare, laundry: Washer };
const adminMap: Record<string, (p: P) => ReactNode> = { inventory: Box, procurement: Cart, vendors: Wrench };
const depMap: Record<string, (p: P) => ReactNode> = { damage: Alert, missing: Box, cleaning: Spray, late: Clock };
const laundryMap: Record<string, (p: P) => ReactNode> = { l1: Linen, l2: Pillow, l3: Towel, l4: Towel, l5: Linen };
const tlMap: Record<string, (p: P) => ReactNode> = { ok: Check, info: Wrench, warn: Alert };

const pick = (m: Record<string, (p: P) => ReactNode>, id: string, p: P) => {
  const C = m[id];
  return C ? C(p) : null;
};
export const RoleIcon = ({ id, ...p }: P & { id: string }) => <>{pick(roleMap, id, p)}</>;
export const AreaIcon = ({ id, ...p }: P & { id: string }) => <>{pick(areaMap, id, p)}</>;
export const CatIcon = ({ id, ...p }: P & { id: string }) => <>{pick(catMap, id, p)}</>;
export const InvIcon = ({ id, ...p }: P & { id: string }) => <>{pick(invMap, id, p)}</>;
export const TradeIcon = ({ id, ...p }: P & { id: string }) => <>{pick(tradeMap, id, p)}</>;
export const ClIcon = ({ id, ...p }: P & { id: string }) => <>{pick(clMap, id, p)}</>;
export const NotifIcon = ({ id, ...p }: P & { id: string }) => <>{pick(notifMap, id, p)}</>;
export const QuickIcon = ({ id, ...p }: P & { id: string }) => <>{pick(quickMap, id, p)}</>;
export const AdminIcon = ({ id, ...p }: P & { id: string }) => <>{pick(adminMap, id, p)}</>;
export const DepIcon = ({ id, ...p }: P & { id: string }) => <>{pick(depMap, id, p)}</>;
export const LaundryIcon = ({ id, ...p }: P & { id: string }) => <>{pick(laundryMap, id, p)}</>;
export const TlIcon = ({ id, ...p }: P & { id: string }) => <>{pick(tlMap, id, p)}</>;
