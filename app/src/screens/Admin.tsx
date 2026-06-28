import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { managerProps } from "../data/mock";

const templates = ["Pre check-in", "Post-stay", "Daily", "Weekly", "Monthly", "Ad-hoc"];

export default function Admin() {
  const nav = useNavigate();
  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/")} aria-label="Back">
          <svg width="20" height="20" viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7" stroke="#2D4A1A" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <Brand />
        <span style={{ width: 42 }} />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>Setup</div>
        <h1 className="h1" style={{ marginTop: 10 }}>Admin</h1>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 28 }}>
          <div className="label">Properties</div>
          <span className="pill pill-go">Add</span>
        </div>
        <div className="list">
          {managerProps.map((p) => (
            <div className="li" key={p.id}>
              <span><span className="li-name">{p.name}</span><span className="li-sub">Caretaker assigned · checklist set</span></span>
              <span className="pill pill-todo">Edit</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 28 }}>
          <div className="label">Checklist templates</div>
          <span className="pill pill-go">New</span>
        </div>
        <div className="list">
          {templates.map((t) => (
            <div className="li" key={t}>
              <span><span className="li-name">{t}</span><span className="li-sub">Master checklist · room by room</span></span>
              <span className="pill pill-todo">Edit</span>
            </div>
          ))}
        </div>

        <div className="label" style={{ marginTop: 28 }}>People</div>
        <div className="statgrid" style={{ marginTop: 8 }}>
          <div className="stat"><div className="num">3</div><div className="lab">Managers</div></div>
          <div className="stat"><div className="num">10</div><div className="lab">Caretakers</div></div>
          <div className="stat"><div className="num">8</div><div className="lab">Owners</div></div>
        </div>
      </div>
    </div>
  );
}
