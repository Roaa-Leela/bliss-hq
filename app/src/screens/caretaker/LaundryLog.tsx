import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Back } from "../../components/Icons";
import { laundryItems } from "../../data/mock";

export default function LaundryLog() {
  const nav = useNavigate();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const set = (id: string, d: number) =>
    setCounts((c) => ({ ...c, [id]: Math.max(0, (c[id] ?? 0) + d) }));
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="screen">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/caretaker")}><Back /></button>
        <span style={{ width: 42 }} />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>After checkout</div>
        <h1 className="h1" style={{ marginTop: 10 }}>Laundry count</h1>
        <p className="meta" style={{ marginTop: 10 }}>Count items going to the laundry. The manager sees this instantly.</p>

        <div style={{ marginTop: 20 }}>
          {laundryItems.map((it) => (
            <div className="counter" key={it.id}>
              <div>
                <div className="cn">{it.name}</div>
                <div className="cs">{it.size}</div>
              </div>
              <div className="stepper">
                <button className="step" aria-label={"Less " + it.name} onClick={() => set(it.id, -1)}>−</button>
                <span className="stepval">{counts[it.id] ?? 0}</span>
                <button className="step" aria-label={"More " + it.name} onClick={() => set(it.id, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={() => nav("/caretaker")}>
          Send {total > 0 ? `${total} items` : "list"} to manager
        </button>
      </div>
    </div>
  );
}
