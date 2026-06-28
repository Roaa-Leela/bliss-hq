import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Back } from "../../components/Icons";
import { useStore } from "../../lib/store";

const nameKey: Record<string, string> = { l1: "ln.sheets", l2: "ln.pillow", l3: "ln.bath", l4: "ln.hand", l5: "ln.duvet" };
const sizeKey: Record<string, string> = { l1: "sz.queenking", l2: "sz.standard", l3: "sz.large", l4: "sz.medium", l5: "sz.queenking" };

export default function LaundryLog() {
  const nav = useNavigate();
  const { laundryItems, t } = useStore();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const set = (id: string, d: number) => setCounts((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }));
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="screen">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/caretaker")} aria-label={t("a.back")}><Back /></button>
        <span style={{ width: 42 }} />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("laundry.kicker")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("laundry.title")}</h1>
        <p className="meta" style={{ marginTop: 10 }}>{t("laundry.help")}</p>

        <div style={{ marginTop: 20 }}>
          {laundryItems.map((it) => (
            <div className="counter" key={it.id}>
              <div>
                <div className="cn">{t(nameKey[it.id])}</div>
                <div className="cs">{t(sizeKey[it.id])}</div>
              </div>
              <div className="stepper">
                <button className="step" aria-label="-" onClick={() => set(it.id, -1)}>−</button>
                <span className="stepval">{counts[it.id] ?? 0}</span>
                <button className="step" aria-label="+" onClick={() => set(it.id, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={() => nav("/caretaker")}>
          {total > 0 ? t("laundry.sendN", { n: total }) : t("laundry.send")}
        </button>
      </div>
    </div>
  );
}
