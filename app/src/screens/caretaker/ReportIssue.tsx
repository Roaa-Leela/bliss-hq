import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Back } from "../../components/Icons";
import { property } from "../../data/mock";
import { useStore } from "../../lib/store";

const categories = ["Cleaning", "Damage", "Missing item", "Maintenance"];
const levels = ["Low", "Medium", "High"];

export default function ReportIssue() {
  const nav = useNavigate();
  const { currentAreaId, firstOpenItem, markDone } = useStore();
  const area = property.areas.find((a) => a.id === currentAreaId) ?? property.areas[0];
  const itemId = firstOpenItem(area);
  const [cat, setCat] = useState("Damage");
  const [level, setLevel] = useState("Medium");
  const [note, setNote] = useState("");

  const submit = () => { if (itemId) markDone(itemId); nav("/caretaker/task"); };

  return (
    <div className="screen">
      <div className="pad" style={{ paddingBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button className="iconbtn" onClick={() => nav(-1)}><Back /></button>
          <div>
            <div className="kicker">{area.name}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "var(--forest)", marginTop: 3 }}>Report an issue</div>
          </div>
        </div>
      </div>

      <div className="pad grow" style={{ paddingTop: 8 }}>
        <div className="field" style={{ marginTop: 6 }}>
          <span className="flabel">What is the problem?</span>
          <div className="options">
            {categories.map((c) => (
              <button key={c} className={"opt" + (cat === c ? " sel" : "")} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <span className="flabel">How urgent?</span>
          <div className="options">
            {levels.map((l) => (
              <button key={l} className={"opt" + (level === l ? " sel" : "")} onClick={() => setLevel(l)}>{l}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <span className="flabel">Add a note</span>
          <textarea className="textarea" placeholder="Describe what you see" value={note} onChange={(e) => setNote(e.target.value)} />
        </div>

        <div className="field">
          <span className="flabel">Photos</span>
          <div className="photogrid">
            <div className="thumb" />
            <button className="addthumb" aria-label="Add photo">
              <svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="#2D4A1A" strokeWidth="2.2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={submit}>Send to manager</button>
      </div>
    </div>
  );
}
