import { useNavigate } from "react-router-dom";
import { Brand } from "../../components/Brand";
import { managerProps, openIssues } from "../../data/mock";

const chip = { ready: "pill-ok", active: "pill-go", todo: "pill-todo" };
const chipLabel = { ready: "Ready", active: "In progress", todo: "To do" };

export default function Operations() {
  const nav = useNavigate();
  return (
    <div className="screen wide">
      <div className="appbar"><Brand /><div className="avatar" style={{ background: "var(--sage)", color: "var(--forest)" }}>PM</div></div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 14 }}>Friday · 13 June</div>
        <h1 className="h1" style={{ marginTop: 10 }}>Operations</h1>

        <div className="statgrid" style={{ marginTop: 22 }}>
          <div className="stat"><div className="accent" style={{ background: "var(--ok)" }} /><div className="num" style={{ color: "var(--ok)" }}>1/4</div><div className="lab">Ready</div></div>
          <div className="stat"><div className="accent" style={{ background: "var(--info)" }} /><div className="num" style={{ color: "var(--info)" }}>2</div><div className="lab">To review</div></div>
          <div className="stat"><div className="accent" style={{ background: "var(--alert)" }} /><div className="num" style={{ color: "var(--alert)" }}>2</div><div className="lab">Open issues</div></div>
        </div>

        <div className="label" style={{ marginTop: 28 }}>Property readiness</div>
        <div className="list">
          {managerProps.map((p) => (
            <button className="li" key={p.id} onClick={() => nav("/manager/review")}>
              <span><span className="li-name">{p.name}</span><span className="li-sub">{p.sub}</span></span>
              <span className={"pill " + chip[p.state]}>{chipLabel[p.state]}</span>
            </button>
          ))}
        </div>

        <div className="label" style={{ marginTop: 28 }}>Open issues</div>
        <div className="list">
          {openIssues.map((i) => (
            <div className="tl-item" key={i.id}>
              <span className="tl-dot" style={{ background: i.level === "alert" ? "var(--alert)" : "var(--warn)" }} />
              <div><div className="tt">{i.title} · {i.where.split(" · ")[0]}</div><div className="ts">{i.where.split(" · ")[1]} · flagged {i.when}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
