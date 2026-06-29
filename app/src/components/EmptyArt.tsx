// Empty-state line illustrations: thoughtful, minimal, aesthetic.
// Soft fills for warmth and contrast; consistent line weight.

const INK = "#2D4A1A";
const F = { white: "#FFFFFF", mist: "#EAF2C0", sage: "#DCE8C2", leaf: "#DDEFB0", okbg: "#E6F4DD", ok: "#3E9D2E", deep: "#5E8E1E" };

function A({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none"
      stroke={INK} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">{children}</svg>
  );
}

// Inspection scheduled but not begun: clipboard with empty checks + a waiting clock.
export function ClipboardWait() {
  return (
    <A>
      <rect x="30" y="28" width="60" height="78" rx="9" fill={F.white} />
      <rect x="49" y="21" width="22" height="12" rx="4" fill={F.sage} />
      {[50, 68, 86].map((y) => (
        <g key={y}>
          <rect x="40" y={y} width="11" height="11" rx="3" fill={F.white} />
          <path d={`M58 ${y + 5.5}H80`} stroke={INK} strokeWidth={1.8} opacity={0.5} />
        </g>
      ))}
      <circle cx="87" cy="35" r="11" fill={F.mist} />
      <path d="M87 29v6l4 3" stroke={INK} strokeWidth={1.7} />
    </A>
  );
}

// Live progress ring (data-driven).
export function ProgressRing({ pct }: { pct: number }) {
  const r = 42, c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 120 120" width="100%" height="100%" fill="none">
      <circle cx="60" cy="60" r={r} stroke={F.mist} strokeWidth="11" />
      <circle cx="60" cy="60" r={r} stroke="#84BC25" strokeWidth="11" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} transform="rotate(-90 60 60)" />
      <text x="60" y="68" textAnchor="middle" fontSize="26" fontWeight="800" fill={INK} stroke="none" fontFamily="Inter, sans-serif">{pct}%</text>
    </svg>
  );
}

// Everything handled / all clear.
export function AllClear() {
  return (
    <A>
      <circle cx="60" cy="60" r="30" fill={F.okbg} stroke={F.ok} />
      <path d="M48 60l8 8 16-18" stroke={F.ok} strokeWidth="3.4" />
      <path d="M28 36v9M23.5 40.5h9" stroke={F.deep} strokeWidth="2.2" />
      <path d="M92 46v7M88.5 49.5h7" stroke={F.deep} strokeWidth="2.2" />
      <circle cx="95" cy="82" r="2.2" fill={F.deep} stroke="none" />
    </A>
  );
}

// Empty box / nothing here.
export function EmptyBox() {
  return (
    <A>
      <path d="M30 58l30-14 30 14v24L60 96 30 82z" fill={F.white} />
      <path d="M30 58l30 14 30-14" />
      <path d="M60 72v24" stroke={INK} strokeWidth={1.8} opacity={0.6} />
      <path d="M30 58l-7-7M90 58l7-7" stroke={F.deep} />
      <path d="M44 51l16 7 16-7" fill={F.mist} />
    </A>
  );
}

// Calm bell, no notifications.
export function CalmBell() {
  return (
    <A>
      <path d="M43 66a17 17 0 0134 0c0 13 6 15 6 15H37s6-2 6-15z" fill={F.mist} />
      <path d="M54 86a6 6 0 0012 0" />
      <path d="M83 38h9l-9 9h9" stroke={F.deep} strokeWidth="2" />
    </A>
  );
}

// Empty calendar, no bookings.
export function CalendarBlank() {
  return (
    <A>
      <rect x="28" y="34" width="64" height="56" rx="8" fill={F.white} />
      <path d="M28 50h64" />
      <path d="M44 28v10M76 28v10" />
      <circle cx="44" cy="64" r="2" fill={INK} stroke="none" opacity={0.4} />
      <circle cx="60" cy="64" r="2" fill={INK} stroke="none" opacity={0.4} />
      <circle cx="76" cy="64" r="2" fill={INK} stroke="none" opacity={0.4} />
      <circle cx="44" cy="78" r="2" fill={INK} stroke="none" opacity={0.4} />
      <circle cx="60" cy="78" r="2" fill={INK} stroke="none" opacity={0.4} />
    </A>
  );
}

// Empty laundry basket.
export function Basket() {
  return (
    <A>
      <path d="M37 62h46l-4 33a4 4 0 01-4 3.6H45a4 4 0 01-4-3.6z" fill={F.mist} />
      <path d="M42 73h36M44 85h32" stroke={INK} strokeWidth={1.7} opacity={0.55} />
      <ellipse cx="60" cy="62" rx="25" ry="6" fill={F.white} />
    </A>
  );
}
