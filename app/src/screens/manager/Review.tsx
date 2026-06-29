import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Back, Check } from "../../components/Icons";
import { ClipboardWait, ProgressRing } from "../../components/EmptyArt";
import { useStore } from "../../lib/store";

export default function Review() {
  const nav = useNavigate();
  const { property, propReadiness, approveProperty, currentReviewId, totalProgress, showToast, t, tArea } = useStore();
  const [done, setDone] = useState(false);
  const propId = currentReviewId ?? "palm-grove";
  const name = t("prop." + propId);
  const r = propReadiness(propId);
  const photoAreas = property.areas.filter((a) => a.items.some((i) => i.requiresPhoto)).slice(0, 6);

  if (done || r === "ready") {
    return (
      <div className="screen wide">
        <div className="appbar">
          <button className="iconbtn" onClick={() => nav("/manager")} aria-label={t("a.back")}><Back /></button>
          <span style={{ width: 42 }} />
        </div>
        <div className="celebrate">
          <div className="ring"><Check size={40} color="#3E9D2E" /></div>
          <h1>{t("rev.approved")}</h1>
          <p>{t("rev.readyState", { name })}</p>
          <button className="btn btn-outline" style={{ marginTop: 28, width: "auto", padding: "0 28px" }} onClick={() => nav("/manager")}>{t("act.backOps")}</button>
        </div>
      </div>
    );
  }

  // Not yet submitted: nothing to review yet
  if (r === "active" || r === "todo") {
    const tp = totalProgress();
    return (
      <div className="screen wide">
        <div className="appbar">
          <button className="iconbtn" onClick={() => nav("/manager")} aria-label={t("a.back")}><Back /></button>
          <span style={{ width: 42 }} />
        </div>
        <div className="empty empty-full">
          <div className="empty-art">{r === "active" ? <ProgressRing pct={tp.pct} /> : <ClipboardWait />}</div>
          <div className="kicker">{r === "active" ? t("rev.kActive") : t("rev.kTodo")}</div>
          <div className="empty-t" style={{ fontSize: 23, marginTop: 7 }}>{name}</div>
          <div className="empty-s">{r === "active" ? t("rev.emptyActive", { done: tp.done, total: tp.total }) : t("rev.emptyTodo")}</div>
        </div>
        <div className="actions"><button className="btn btn-outline" onClick={() => nav("/manager")}>{t("act.backOps")}</button></div>
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
        <div className="kicker" style={{ marginTop: 12 }}>{t("rev.kReview")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{name}</h1>
        <div className="meta" style={{ marginTop: 8 }}>{t("rev.areasN", { n: property.areas.length })}</div>

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
        <button className="btn btn-primary" onClick={() => { approveProperty(propId); setDone(true); }}>{t("act.approve")} <Check /></button>
        <button className="btn btn-danger" onClick={() => { showToast(t("toast.sentBack")); nav("/manager"); }}>{t("act.sendBack")}</button>
      </div>
    </div>
  );
}
