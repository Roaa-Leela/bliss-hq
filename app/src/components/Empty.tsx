import type { ReactNode } from "react";

// Consistent empty state. `art` is a large illustration; `icon` a small glyph.
export function Empty({ art, icon, title, sub, action, full }: {
  art?: ReactNode; icon?: ReactNode; title: string; sub?: string; action?: ReactNode; full?: boolean;
}) {
  return (
    <div className={"empty" + (full ? " empty-full" : "")}>
      {art && <div className="empty-art">{art}</div>}
      {!art && icon && <span className="empty-ic">{icon}</span>}
      <div className="empty-t">{title}</div>
      {sub && <div className="empty-s">{sub}</div>}
      {action && <div className="empty-action">{action}</div>}
    </div>
  );
}
