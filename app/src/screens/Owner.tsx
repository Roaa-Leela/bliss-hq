import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { property, ownerTimeline } from "../data/mock";

const dot = { ok: "var(--ok)", info: "var(--info)", warn: "var(--warn)" };

export default function Owner() {
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
        <div className="kicker" style={{ marginTop: 12 }}>Your property</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{property.name}</h1>

        <div className="card" style={{ marginTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="li-name" style={{ fontWeight: 700 }}>Ready for guest</div>
            <div className="li-sub">Next check-in today, 4:00 PM</div>
          </div>
          <span className="pill pill-ok">Ready</span>
        </div>

        <div className="label" style={{ marginTop: 28 }}>Recent activity</div>
        <div>
          {ownerTimeline.map((t) => (
            <div className="tl-item" key={t.id}>
              <span className="tl-dot" style={{ background: dot[t.kind] }} />
              <div><div className="tt">{t.title}</div><div className="ts">{t.sub}</div></div>
            </div>
          ))}
        </div>

        <div className="label" style={{ marginTop: 28 }}>This month</div>
        <div className="statgrid" style={{ marginTop: 8 }}>
          <div className="stat"><div className="num">6</div><div className="lab">Bookings</div></div>
          <div className="stat"><div className="num">12</div><div className="lab">Inspections</div></div>
          <div className="stat"><div className="num">1</div><div className="lab">Issues</div></div>
        </div>
        <p className="meta" style={{ marginTop: 16 }}>Revenue details appear here once accounting goes live.</p>
      </div>
    </div>
  );
}
