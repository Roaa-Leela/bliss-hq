import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Check } from "../../components/Icons";
import { BottomBar } from "../../components/BottomBar";
import { RefImage, hasRefImage } from "../../components/Illustrations";
import { useStore } from "../../lib/store";

export default function Task() {
  const nav = useNavigate();
  const { property, t, tArea, tItem, currentAreaId, firstOpenItem, markDone, areaProgress } = useStore();
  const area = property.areas.find((a) => a.id === currentAreaId) ?? property.areas[0];
  const openId = firstOpenItem(area);

  useEffect(() => { if (!openId) nav("/caretaker/areas"); }, [openId, nav]);
  if (!openId) return null;

  const item = area.items.find((i) => i.id === openId)!;
  const idx = area.items.findIndex((i) => i.id === openId) + 1;
  const total = area.items.length;
  const p = areaProgress(area);
  const pct = Math.round((p.done / p.total) * 100);

  return (
    <div className="screen">
      <div className="pad" style={{ paddingBottom: 0, paddingTop: 24 }}>
        <div style={{ flex: 1 }}>
          <div className="kicker">{tArea(area.id)}</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "var(--forest)", marginTop: 3 }}>{t("task.check", { idx, total })}</div>
        </div>
        <div className="progress" style={{ marginTop: 16 }}><i style={{ width: `${pct}%` }} /></div>
      </div>

      <div className="pad grow" style={{ paddingTop: 18, paddingBottom: 14 }}>
        <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.3, letterSpacing: "-.2px" }}>{tItem(item.textKey)}</div>

        {item.requiresPhoto && (
          <>
            <div className="label" style={{ margin: "22px 0 10px" }}>{t("task.reference")}</div>
            {hasRefImage(area.type) ? (
              <div className="refart"><RefImage id={area.type} /><div className="tag">{t("task.idealSetup")}</div></div>
            ) : (
              <div className="ref" style={{ height: 148 }}><div className="tag">{t("task.idealSetup")}</div></div>
            )}
          </>
        )}

        <div className="label" style={{ margin: "20px 0 10px" }}>{t("task.yourPhoto")}</div>
        <button className="capture" style={{ height: 128 }}>
          <span className="cam"><Camera /></span>
          <span>{t("act.takePhoto")}</span>
        </button>
      </div>

      <BottomBar onBack={() => nav("/caretaker/areas")}>
        <button className="btn btn-primary" onClick={() => markDone(item.id)}>{t("act.looksGood")} <Check /></button>
        <button className="btn btn-danger" onClick={() => nav("/caretaker/issue")}>{t("act.reportIssue")}</button>
      </BottomBar>
    </div>
  );
}
