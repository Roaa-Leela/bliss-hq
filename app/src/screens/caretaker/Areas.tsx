import { useNavigate } from "react-router-dom";
import { Back } from "../../components/Icons";
import { property } from "../../data/mock";
import { useStore } from "../../lib/store";

export default function Areas() {
  const nav = useNavigate();
  const { areaState, areaProgress, setCurrentArea, totalProgress } = useStore();
  const tp = totalProgress();
  const stateLabel = { done: "Done", active: "Resume", todo: "Start" };
  const statePill = { done: "pill-ok", active: "pill-next", todo: "pill-todo" };

  const open = (id: string) => { setCurrentArea(id); nav("/caretaker/task"); };

  return (
    <div className="screen">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/caretaker")}><Back /></button>
        <div className="langs" />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 14 }}>{property.checklist}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{property.name}</h1>
        <div className="meta" style={{ marginTop: 8 }}>{tp.done} of {tp.total} areas ready · {tp.pct}%</div>
        <div className="progress" style={{ marginTop: 12 }}><i style={{ width: `${tp.pct}%` }} /></div>

        <div className="label" style={{ marginTop: 26 }}>All areas</div>
        <div className="list">
          {property.areas.map((a) => {
            const st = areaState(a); const p = areaProgress(a);
            return (
              <button className="li" key={a.id} onClick={() => open(a.id)}>
                <span>
                  <span className="li-name">{a.name}</span>
                  <span className="li-sub">{p.done} of {p.total} checks</span>
                </span>
                <span className={"pill " + statePill[st]}>{stateLabel[st]}</span>
              </button>
            );
          })}
        </div>
      </div>
      {tp.pct === 100 && (
        <div className="actions">
          <button className="btn btn-primary" onClick={() => nav("/caretaker/submit")}>Submit inspection</button>
        </div>
      )}
    </div>
  );
}
