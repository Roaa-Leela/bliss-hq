import { useStore } from "../lib/store";
import type { IssueStatus } from "../data/mock";

const C: Record<IssueStatus, { dot: string; bg: string; fg: string; bd: string }> = {
  open: { dot: "var(--warn)", bg: "var(--warn-bg)", fg: "var(--warn-text)", bd: "var(--warn)" },
  in_progress: { dot: "var(--leaf-deep)", bg: "var(--leaf-tint)", fg: "var(--leaf-text)", bd: "var(--leaf-deep)" },
  resolved: { dot: "var(--ok)", bg: "var(--ok-bg)", fg: "var(--ok-text)", bd: "var(--ok)" },
};
const statuses: IssueStatus[] = ["open", "in_progress", "resolved"];

export function StatusPicker({ value, onChange }: { value: IssueStatus; onChange: (s: IssueStatus) => void }) {
  const { t } = useStore();
  return (
    <div className="statusopts">
      {statuses.map((s) => {
        const c = C[s];
        const on = value === s;
        return (
          <button key={s} className="statusopt" style={on ? { background: c.bg, color: c.fg, borderColor: c.bd } : undefined} onClick={() => onChange(s)}>
            <span className="sdot" style={{ background: c.dot }} />{t("ist." + s)}
          </button>
        );
      })}
    </div>
  );
}
