import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Back, Check } from "../../components/Icons";
import { property } from "../../data/mock";

export default function Review() {
  const nav = useNavigate();
  const [done, setDone] = useState(false);
  const photoAreas = property.areas.filter((a) => a.items.some((i) => i.requiresPhoto)).slice(0, 6);

  if (done) {
    return (
      <div className="screen wide">
        <div className="celebrate">
          <div className="ring"><Check size={40} color="#3E9D2E" /></div>
          <h1>Approved</h1>
          <p>{property.name} is marked ready. The owner can now see the completed inspection.</p>
        </div>
        <div className="actions"><button className="btn btn-primary" onClick={() => nav("/manager")}>Back to operations</button></div>
      </div>
    );
  }

  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/manager")}><Back /></button>
        <span style={{ width: 42 }} />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>Pre check-in · submitted by Ramesh</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{property.name}</h1>
        <div className="meta" style={{ marginTop: 8 }}>8 of 8 areas · 6 photos</div>

        <div className="label" style={{ marginTop: 26 }}>Photos by area</div>
        {photoAreas.map((a) => (
          <div key={a.id} style={{ marginTop: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>{a.name}</div>
            <div className="photogrid">
              <div className="thumb" /><div className="thumb" /><div className="thumb" />
            </div>
          </div>
        ))}

        <div className="field">
          <span className="flabel">Comment (optional)</span>
          <textarea className="textarea" placeholder="Add a note for the caretaker" />
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={() => setDone(true)}>Approve <Check /></button>
        <button className="btn btn-danger" onClick={() => nav("/manager")}>Send back</button>
      </div>
    </div>
  );
}
