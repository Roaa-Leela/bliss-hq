import { useNavigate } from "react-router-dom";
import { Brand } from "../../components/Brand";
import { LangSwitch } from "../../components/LangSwitch";
import { NotifBell } from "../../components/NotifBell";
import { Calendar } from "../../components/Icons";
import { useStore } from "../../lib/store";

const sevColor: Record<string, string> = { high: "var(--alert)", medium: "var(--warn)", low: "var(--slate)" };
const rPill: Record<string, string> = { todo: "pill-todo", active: "pill-go", review: "pill-warn", ready: "pill-ok" };

export default function Operations() {
  const nav = useNavigate();
  const { managerProps, issues, propReadiness, setReviewProp, setCurrentIssue, totalProgress, t } = useStore();
  const open = issues.filter((i) => i.status === "open");
  const rLabel: Record<string, string> = { todo: t("st.todo"), active: t("st.inProgress"), review: t("mgr.toReview"), ready: t("st.ready") };
  const ids = managerProps.map((p) => p.id);
  const readyN = ids.filter((id) => propReadiness(id) === "ready").length;
  const reviewN = ids.filter((id) => propReadiness(id) === "review").length;

  const sub = (id: string) => {
    const r = propReadiness(id);
    if (r === "ready") return t("own.readyGuest");
    if (r === "review") return t("rev.kReview");
    if (id === "palm-grove") { const tp = totalProgress(); return t("mgr.areasN", { done: tp.done, total: tp.total }); }
    if (id === "lake") return t("mgr.notStarted");
    return t("mgr.postStay");
  };

  const openReview = (id: string) => { setReviewProp(id); nav("/manager/review"); };
  const openIssue = (id: string) => { setCurrentIssue(id); nav("/manager/issue"); };

  return (
    <div className="screen wide">
      <div className="appbar"><Brand /><div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button className="iconbtn" onClick={() => nav("/manager/calendar")} aria-label={t("cal.title")}><Calendar /></button>
        <NotifBell /><LangSwitch /></div></div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 14 }}>{t("mgr.dateline")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("mgr.ops")}</h1>

        <div className="statgrid" style={{ marginTop: 22 }}>
          <div className="stat"><div className="accent" style={{ background: "var(--ok)" }} /><div className="num" style={{ color: "var(--ok)" }}>{readyN}/{ids.length}</div><div className="lab">{t("mgr.readyStat")}</div></div>
          <div className="stat"><div className="accent" style={{ background: "var(--warn)" }} /><div className="num" style={{ color: "var(--warn)" }}>{reviewN}</div><div className="lab">{t("mgr.toReview")}</div></div>
          <div className="stat"><div className="accent" style={{ background: "var(--alert)" }} /><div className="num" style={{ color: "var(--alert)" }}>{open.length}</div><div className="lab">{t("mgr.openIssues")}</div></div>
        </div>

        <div className="label" style={{ marginTop: 28 }}>{t("mgr.readiness")}</div>
        <div className="list">
          {managerProps.map((p) => {
            const r = propReadiness(p.id);
            return (
              <button className="li" key={p.id} onClick={() => openReview(p.id)}>
                <span><span className="li-name">{t("prop." + p.id)}</span><span className="li-sub">{sub(p.id)}</span></span>
                <span className={"pill " + rPill[r]}>{rLabel[r]}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 28 }}>
          <div className="label">{t("mgr.openIssues")}</div>
          <button className="pill pill-go" onClick={() => nav("/manager/issues")}>{t("iss.viewAll")}</button>
        </div>
        <div className="list">
          {open.slice(0, 3).map((i) => (
            <button className="tl-item" key={i.id} style={{ width: "100%", textAlign: "left" }}
              onClick={() => openIssue(i.id)}>
              <span className="tl-dot" style={{ background: sevColor[i.sev] }} />
              <div>
                <div className="tt">{i.title ?? t(i.titleKey)} · {t("prop." + i.propId)}</div>
                <div className="ts">{t(i.locKey)} · {t("mgr.flagged", { when: t(i.whenKey) })}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
