// Minimal line-drawing references: show the caretaker the ideal placement,
// arrangement and style of each setup. Simple soft fills for contrast.

const INK = "#2D4A1A";
const C = {
  wood: "#E7D7B4", towel: "#FFFFFF", mist: "#EAF2C0", sage: "#DCE8C2",
  leaf: "#DDEFB0", water: "#D7E8F2", white: "#FFFFFF", band: "#84BC25", trunk: "#D9C39A",
};

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 340 150" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
      fill="none" stroke={INK} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="0" y="0" width="340" height="150" fill="#F6F4EC" stroke="none" />
      {children}
    </svg>
  );
}

function Bed() {
  return (
    <Frame>
      <path d="M30 131h280" stroke={INK} strokeWidth={1.4} opacity={0.35} />
      <rect x="42" y="46" width="22" height="80" rx="8" fill={C.wood} />
      <rect x="60" y="84" width="240" height="20" rx="8" fill={C.white} />
      <rect x="60" y="103" width="240" height="20" rx="6" fill={C.mist} />
      <path d="M148 86h148a4 4 0 014 4v14H144V90a4 4 0 014-4z" fill={C.sage} />
      <path d="M146 95h152" stroke={INK} strokeWidth={1.5} />
      <g transform="rotate(-4 100 78)"><rect x="72" y="66" width="54" height="24" rx="11" fill={C.white} /></g>
      <g transform="rotate(-2 108 72)"><rect x="82" y="62" width="48" height="22" rx="10" fill={C.mist} /></g>
      <path d="M70 123v8M290 123v8" />
    </Frame>
  );
}

function Bath() {
  return (
    <Frame>
      <rect x="58" y="26" width="56" height="42" rx="9" fill={C.white} />
      <path d="M68 34l18 24" stroke={INK} strokeWidth={1.4} opacity={0.25} />
      <rect x="26" y="92" width="288" height="12" rx="3" fill={C.sage} />
      <rect x="26" y="104" width="288" height="22" fill={C.mist} />
      <path d="M64 104v22M150 104v22M236 104v22" stroke={INK} strokeWidth={1.4} opacity={0.5} />
      <ellipse cx="86" cy="92" rx="30" ry="9" fill={C.white} />
      <path d="M86 70v8a6 6 0 016 6" />
      <rect x="206" y="74" width="84" height="12" rx="3" fill={C.white} />
      <rect x="212" y="84" width="72" height="12" rx="3" fill={C.leaf} />
      <path d="M206 80h84" stroke={C.band} strokeWidth={2} />
      <rect x="146" y="72" width="14" height="20" rx="3" fill={C.white} /><path d="M150 72v-4h6v4" />
      <rect x="168" y="76" width="12" height="16" rx="3" fill={C.mist} />
    </Frame>
  );
}

function Sofa() {
  return (
    <Frame>
      <path d="M30 131h280" stroke={INK} strokeWidth={1.4} opacity={0.35} />
      <rect x="48" y="56" width="244" height="42" rx="12" fill={C.sage} />
      <rect x="40" y="76" width="26" height="50" rx="12" fill={C.mist} />
      <rect x="274" y="76" width="26" height="50" rx="12" fill={C.mist} />
      <rect x="56" y="92" width="228" height="30" rx="8" fill={C.white} />
      <g transform="rotate(8 120 78)"><rect x="100" y="62" width="40" height="40" rx="9" fill={C.leaf} /></g>
      <g transform="rotate(-8 210 78)"><rect x="190" y="62" width="40" height="40" rx="9" fill={C.white} /></g>
      <path d="M268 70l30 6-4 22-28-8z" fill={C.mist} /><path d="M272 78l24 5M270 86l24 6" stroke={INK} strokeWidth={1.4} />
      <path d="M64 122v8M276 122v8" />
    </Frame>
  );
}

function Kitchen() {
  return (
    <Frame>
      <rect x="54" y="28" width="74" height="44" rx="4" fill={C.water} />
      <path d="M91 28v44M54 50h74" stroke={INK} strokeWidth={1.4} opacity={0.5} />
      <rect x="22" y="90" width="296" height="12" rx="3" fill={C.sage} />
      <rect x="22" y="102" width="296" height="30" fill={C.white} />
      <path d="M104 102v30M214 102v30" stroke={INK} strokeWidth={1.4} opacity={0.5} />
      <path d="M150 110h12M250 110h12" stroke={INK} strokeWidth={2} />
      <rect x="150" y="80" width="64" height="12" rx="4" fill={C.mist} />
      <path d="M236 90v-12a8 8 0 00-8-8h-20" />
      <rect x="262" y="72" width="12" height="20" rx="3" fill={C.leaf} /><path d="M266 72v-4h4v4" />
    </Frame>
  );
}

function Pool() {
  return (
    <Frame>
      <rect x="28" y="66" width="284" height="68" rx="14" fill={C.sage} />
      <rect x="40" y="76" width="260" height="50" rx="9" fill={C.water} />
      <path d="M52 92c14 0 14 6 28 6s14-6 28-6 14 6 28 6 14-6 28-6 14 6 28 6 14-6 28-6" stroke="#5E8E1E" strokeWidth={1.6} />
      <path d="M64 108c14 0 14 6 28 6s14-6 28-6" stroke="#5E8E1E" strokeWidth={1.6} />
      <path d="M268 66V44h14v22" /><path d="M268 50h14" stroke={INK} strokeWidth={1.5} opacity={0.6} />
      <path d="M44 60L52 47l18 4-4 11z" fill={C.mist} />
      <path d="M44 60h44v3H44z" fill={C.white} />
      <path d="M50 63v4M82 63v4" />
    </Frame>
  );
}

function Garden() {
  return (
    <Frame>
      <path d="M0 118c70-16 120-16 170-2s120 6 170-6v40H0z" fill={C.leaf} />
      <path d="M70 124V92" stroke={C.trunk} strokeWidth={5} />
      <circle cx="70" cy="74" r="26" fill={C.sage} />
      <path d="M148 119a28 12 0 0156 0z" fill={C.sage} />
      <circle cx="162" cy="113" r="3.2" fill={C.band} /><circle cx="178" cy="111" r="3.2" fill={C.white} /><circle cx="192" cy="114" r="3.2" fill={C.band} />
      <circle cx="262" cy="118" r="13" fill={C.sage} /><circle cx="285" cy="120" r="10" fill={C.mist} />
    </Frame>
  );
}

function Dining() {
  return (
    <Frame>
      <path d="M30 131h280" stroke={INK} strokeWidth={1.4} opacity={0.35} />
      <rect x="46" y="80" width="248" height="13" rx="5" fill={C.wood} />
      <path d="M64 93v35M276 93v35" />
      <ellipse cx="96" cy="80" rx="26" ry="7" fill={C.white} />
      <ellipse cx="96" cy="80" rx="12" ry="3.5" fill={C.mist} />
      <rect x="128" y="62" width="11" height="18" rx="2" fill={C.water} />
      <ellipse cx="244" cy="80" rx="26" ry="7" fill={C.white} />
      <ellipse cx="244" cy="80" rx="12" ry="3.5" fill={C.mist} />
      <rect x="201" y="62" width="11" height="18" rx="2" fill={C.water} />
      <path d="M150 58h40l-5 22h-30z" fill={C.mist} />
      <ellipse cx="170" cy="58" rx="20" ry="4" fill={C.white} />
      <path d="M155 68h30" stroke={INK} strokeWidth={1.5} opacity={0.5} />
      <circle cx="162" cy="53" r="4" fill={C.leaf} />
      <circle cx="170" cy="51" r="4" fill={C.band} />
      <circle cx="178" cy="53" r="4" fill={C.sage} />
    </Frame>
  );
}

const map: Record<string, () => React.ReactNode> = {
  bedroom: Bed, bathroom: Bath, living: Sofa, dining: Dining, kitchen: Kitchen, pool: Pool, outdoor: Garden,
};

export function RefImage({ id }: { id: string }) {
  const C = map[id] ?? Bed;
  return <C />;
}
export const hasRefImage = (id: string) => id in map;
