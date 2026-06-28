import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Back, Camera, Check } from "../../components/Icons";
import { property } from "../../data/mock";
import { useStore } from "../../lib/store";

export default function Task() {
  const nav = useNavigate();
  const { currentAreaId, firstOpenItem, markDone, areaProgress } = useStore();
  const area = property.areas.find((a) => a.id === currentAreaId) ?? property.areas[0];
  const openId = firstOpenItem(area);

  // Area finished: go back to the area list.
  useEffect(() => { if (!openId) nav("/caretaker/areas"); }, [openId, nav]);
  if (!openId) return null;

  const item = area.items.find((i) => i.id === openId)!;
  const idx = area.items.findIndex((i) => i.id === openId) + 1;
  const total = area.items.length;
  const p = areaProgress(area);
  const pct = Math.round((p.done / p.total) * 100);

  return (
    <div className="screen">
      <div className="pad" style={{ paddingBottom: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button className="iconbtn" onClick={() => nav("/caretaker/areas")}><Back /></button>
          <div style={{ flex: 1 }}>
            <div className="kicker">{area.name}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "var(--forest)", marginTop: 3 }}>Check {idx} of {total}</div>
          </div>
        </div>
        <div className="progress" style={{ marginTop: 18 }}><i style={{ width: `${pct}%` }} /></div>
      </div>

      <div className="pad grow">
        <div style={{ fontSize: 25, fontWeight: 700, lineHeight: 1.3, letterSpacing: "-.2px", marginTop: 8 }}>{item.text}</div>

        {item.requiresPhoto && (
          <>
            <div className="label" style={{ margin: "30px 0 12px" }}>Reference · how it should look</div>
            <div className="ref"><div className="tag">Ideal setup</div></div>
          </>
        )}

        <div className="label" style={{ margin: "26px 0 12px" }}>Your photo</div>
        <button className="capture">
          <span className="cam"><Camera /></span>
          <span>Take photo</span>
        </button>
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={() => markDone(item.id)}>Looks good <Check /></button>
        <button className="btn btn-danger" onClick={() => nav("/caretaker/issue")}>Report an issue</button>
      </div>
    </div>
  );
}
