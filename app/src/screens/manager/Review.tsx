import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Back, Check } from "../../components/Icons";
import { property } from "../../data/mock";
import { useStore } from "../../lib/store";

export default function Review() {
  const nav = useNavigate();
  const { t, tArea } = useStore();
  const [done, setDone] = useState(false);
  const photoAreas = property.areas.filter((a) => a.items.some((i) => i.requiresPhoto)).slice(0, 6);

  if (done) {
    return (
      <div className="screen wide">
        <div className="celebrate">
          <div className="ring"><Check size={40} color="#3E9D2E" /></div>
          <h1>{t("rev.approved")}</h1>
          <p>{t("rev.approvedBody", { name: property.name })}</p>
        </div>
        <div className="actions"><button className="btn btn-primary" onClick={() => nav("/manager")}>{t("act.backOps")}</button></div>
      </div>
    );
  }

  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/manager")} aria-label={t("a.back")}><Back /></button>
        <span style={{ width: 42 }} />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("rev.submittedBy")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{property.name}</h1>
        <div className="meta" style={{ marginTop: 8 }}>{t("rev.summary")}</div>

        <div className="label" style={{ marginTop: 26 }}>{t("rev.byArea")}</div>
        {photoAreas.map((a) => (
          <div key={a.id} style={{ marginTop: 16 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", marginBottom: 8 }}>{tArea(a.id)}</div>
            <div className="photogrid"><div className="thumb" /><div className="thumb" /><div className="thumb" /></div>
          </div>
        ))}

        <div className="field">
          <span className="flabel">{t("rev.comment")}</span>
          <textarea className="textarea" placeholder={t("rev.commentPh")} />
        </div>
      </div>

      <div className="actions">
        <button className="btn btn-primary" onClick={() => setDone(true)}>{t("act.approve")} <Check /></button>
        <button className="btn btn-danger" onClick={() => nav("/manager")}>{t("act.sendBack")}</button>
      </div>
    </div>
  );
}
