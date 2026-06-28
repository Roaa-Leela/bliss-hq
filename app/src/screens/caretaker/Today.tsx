import { useNavigate } from "react-router-dom";
import { Brand } from "../../components/Brand";
import { Arrow } from "../../components/Icons";
import { property } from "../../data/mock";
import { useStore, tr } from "../../lib/store";

export default function Today() {
  const nav = useNavigate();
  const { lang, totalProgress, areaState, areaProgress } = useStore();
  const tp = totalProgress();
  const preview = property.areas.slice(0, 4);
  const stateLabel = { done: "Done", active: "In progress", todo: "To do" };
  const statePill = { done: "pill-ok", active: "pill-go", todo: "pill-todo" };

  return (
    <div className="screen">
      <div className="appbar"><Brand /><div className="avatar">R</div></div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 14 }}>Thursday · 12 June</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{tr("greeting", lang)},<br />Ramesh</h1>

        <div className="card" style={{ marginTop: 24 }}>
          <div className="label">Current property</div>
          <h2 className="h2" style={{ marginTop: 8 }}>{property.name}</h2>
          <div className="meta" style={{ marginTop: 6 }}>{property.checklist} · {property.bhk} · Guest {property.guestTime}</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 18 }}>
            <strong style={{ fontSize: 13 }}>{tp.done} of {tp.total} areas ready</strong>
            <span className="meta">{tp.pct}%</span>
          </div>
          <div className="progress" style={{ marginTop: 11 }}><i style={{ width: `${tp.pct}%` }} /></div>
        </div>

        <button className="btn btn-primary" style={{ marginTop: 22 }} onClick={() => nav("/caretaker/areas")}>
          {tr("continue", lang)} <Arrow />
        </button>

        <div className="label" style={{ marginTop: 28 }}>Areas</div>
        <div className="list">
          {preview.map((a) => {
            const st = areaState(a); const p = areaProgress(a);
            return (
              <div className="li" key={a.id}>
                <span>
                  <span className="li-name">{a.name}</span>
                  {st === "active" && <span className="li-sub">{p.done} of {p.total} done</span>}
                </span>
                <span className={"pill " + statePill[st]}>{stateLabel[st]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
