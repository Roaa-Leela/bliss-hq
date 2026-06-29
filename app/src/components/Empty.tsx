import type { ReactNode } from "react";

// Consistent empty state used across every list surface.
export function Empty({ icon, title, sub }: { icon: ReactNode; title: string; sub?: string }) {
  return (
    <div className="empty">
      <span className="empty-ic">{icon}</span>
      <div className="empty-t">{title}</div>
      {sub && <div className="empty-s">{sub}</div>}
    </div>
  );
}
