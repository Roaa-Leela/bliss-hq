type P = { size?: number; color?: string; stroke?: number };
const base = (size: number) => ({ width: size, height: size, viewBox: "0 0 24 24", fill: "none" as const });

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
  <svg {...base(size)}>
    <path d="M3 8a2 2 0 012-2h2l1.5-2h7L18 6h1a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
    <circle cx="12" cy="12.5" r="3.4" stroke={color} strokeWidth={stroke} />
  </svg>
);
export const Bed = ({ size = 26, color = "#2D4A1A", stroke = 1.8 }: P) => (
  <svg {...base(size)}><path d="M3 12V7a2 2 0 012-2h14a2 2 0 012 2v5M3 12h18M3 12v6M21 12v6M6 9h4" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const Person = ({ size = 26, color = "#2D4A1A", stroke = 1.8 }: P) => (
  <svg {...base(size)}><path d="M12 12a4 4 0 100-8 4 4 0 000 8zM5 20c1-4 13-4 14 0" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const Bell = ({ size = 22, color = "#2D4A1A", stroke = 1.9 }: P) => (
  <svg {...base(size)}><path d="M6 9a6 6 0 0112 0c0 5 2 6 2 6H4s2-1 2-6M10 20a2 2 0 004 0" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" /></svg>
);
export const Calendar = ({ size = 22, color = "#2D4A1A", stroke = 1.9 }: P) => (
  <svg {...base(size)}><rect x="3.5" y="5" width="17" height="15" rx="2.5" stroke={color} strokeWidth={stroke} /><path d="M3.5 9.5h17M8 3v4M16 3v4" stroke={color} strokeWidth={stroke} strokeLinecap="round" /></svg>
);
