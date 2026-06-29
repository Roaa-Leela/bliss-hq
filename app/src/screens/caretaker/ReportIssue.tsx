import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Back, CatIcon } from "../../components/Icons";
import { useStore } from "../../lib/store";

const cats = [["cat.cleaning"], ["cat.damage"], ["cat.missing"], ["cat.maintenance"]].map((x) => x[0]);
const lvls = ["lvl.low", "lvl.medium", "lvl.high"];

export default function ReportIssue() {
  const nav = useNavigate();
  const { property, t, tArea, currentAreaId, firstOpenItem, markDone, addIssue } = useStore();
  const area = property.areas.find((a) => a.id === currentAreaId) ?? property.areas[0];
  const itemId = firstOpenItem(area);
  const [cat, setCat] = useState("cat.damage");
  const [level, setLevel] = useState("lvl.medium");
  const [note, setNote] = useState("");
  const submit = () => {
    const catId = cat.replace("cat.", "");
    const sev = level.replace("lvl.", "") as "low" | "medium" | "high";
    addIssue({
      id: "ri-" + Date.now(),
      propId: "palm-grove",
      locKey: "loc." + area.id,
      titleKey: "cat." + catId,
      title: note.trim() || undefined,
      cat: catId,
      sev,
      status: "open",
      whenKey: "when.now",
      assignee: null,
    });
    if (itemId) markDone(itemId);
    nav("/caretaker/task");
  };

  return (
    <div className="screen">
      <div className="pad" style={{ paddingBottom: 8, paddingTop: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button className="iconbtn" onClick={() => nav(-1)} aria-label={t("a.back")}><Back /></button>
          <div>
            <div className="kicker">{tArea(area.id)}</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "var(--forest)", marginTop: 3 }}>{t("issue.title")}</div>
          </div>
        </div>
      </div>

      <div className="pad grow" style={{ paddingTop: 8 }}>
        <div className="field" style={{ marginTop: 6 }}>
          <span className="flabel">{t("issue.what")}</span>
          <div className="options">
            {cats.map((c) => <button key={c} className={"opt opt-ic" + (cat === c ? " sel" : "")} onClick={() => setCat(c)}><CatIcon id={c.replace("cat.", "")} size={22} /><span>{t(c)}</span></button>)}
          </div>
        </div>
        <div className="field">
          <span className="flabel">{t("issue.urgent")}</span>
          <div className="options">
            {lvls.map((l) => <button key={l} className={"opt" + (level === l ? " sel" : "")} onClick={() => setLevel(l)}>{t(l)}</button>)}
          </div>
        </div>
        <div className="field">
          <span className="flabel">{t("issue.note")}</span>
          <textarea className="textarea" placeholder={t("issue.notePh")} value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <div className="field">
          <span className="flabel">{t("issue.photos")}</span>
          <div className="photogrid">
            <div className="thumb" />
            <button className="addthumb" aria-label={t("act.takePhoto")}>
              <svg width="26" height="26" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" stroke="#2D4A1A" strokeWidth="2.2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={submit}>{t("act.sendManager")}</button>
      </div>
    </div>
  );
}
