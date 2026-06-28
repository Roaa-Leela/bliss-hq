// Brand mark. Placeholder leaf glyph until the official squirrel SVG is supplied.
// Swap the <path> here (or drop the SVG into /public and reference it) to use the real mark.
export function Mark({ size = 20, color = "#84BC25" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size * 1.08} viewBox="0 0 24 26" aria-hidden>
      <path d="M12 1C19 6 19 18 12 25C5 18 5 6 12 1Z" fill={color} />
    </svg>
  );
}

export function Brand({ color = "#2D4A1A" }: { color?: string }) {
  return (
    <span className="brand">
      <Mark size={19} color="#84BC25" />
      <b style={{ color }}>Bliss Farm Stays</b>
    </span>
  );
}
