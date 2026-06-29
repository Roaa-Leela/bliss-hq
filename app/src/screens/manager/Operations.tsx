import { useNavigate } from "react-router-dom";
import { Brand } from "../../components/Brand";
import { LangSwitch } from "../../components/LangSwitch";
import { NotifBell } from "../../components/NotifBell";
import { Calendar } from "../../components/Icons";
import { useStore } from "../../lib/store";

const chip = { ready: "pill-ok", active: "pill-go", todo: "pill-todo" } as const;
const sevColor: Record<string, string> = { high: "var(--alert)", medium: "var(--warn)", low: "var(--slate)" };

export default function Operations() {
  const nav = useNavigate();
  const { managerProps, issues, t } = useStore();
  const open = issues.filter((i) => i.status === "open");
  const chipLabel = { ready: t("st.ready"), active: t("st.inProgress"), todo: t("st.todo") };
  const sub = (id: string) =>
    id === "palm-grove" ? `${t("meta.preCheckin")} · ${t("today.guest")} ${t("time.4pm")}`
    : id === "misty" ? t("mgr.areasN", { done: 5, total: 8 })
    : id === "lake" ? t("mgr.notStarted")
    : t("mgr.postStay");

  return (
    <div className="screen wide">
      <div className="appbar"><Brand /><div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <button className="iconbtn" onClick={() => nav("/manager/calendar")} aria-label={t("cal.title")}><Calendar /></button>
        <NotifBell /><LangSwitch /></div></div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 14 }}>{t("mgr.dateline")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("mgr.ops")}</h1>

        <div className="statgrid" style={{ marginTop: 22 }}>
          <div className="stat"><div className="accent" style={{ background: "var(--ok)" }} /><div className="num" style={{ color: "var(--ok)" }}>1/4</div><div className="lab">{t("mgr.readyStat")}</div></div>
          <div className="stat"><div className="accent" style={{ background: "var(--info)" }} /><div className="num" style={{ color: "var(--info)" }}>2</div><div className="lab">{t("mgr.toReview")}</div></div>
          <div className="stat"><div className="accent" style={{ background: "var(--alert)" }} /><div className="num" style={{ color: "var(--alert)" }}>{open.length}</div><div className="lab">{t("mgr.openIssues")}</div></div>
        </div>

        <div className="label" style={{ marginTop: 28 }}>{t("mgr.readiness")}</div>
        <div className="list">
          {managerProps.map((p) => (
            <button className="li" key={p.id} onClick={() => nav("/manager/review")}>
              <span><span className="li-name">{t("prop." + p.id)}</span><span className="li-sub">{sub(p.id)}</span></span>
              <span className={"pill " + chip[p.state]}>{chipLabel[p.state]}</span>
            </button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 28 }}>
          <div className="label">{t("mgr.openIssues")}</div>
          <button className="pill pill-go" onClick={() => nav("/manager/issues")}>{t("iss.viewAll")}</button>
        </div>
        <div className="list">
          {open.slice(0, 3).map((i) => (
            <button className="tl-item" key={i.id} style={{ width: "100%", textAlign: "left" }}
              onClick={() => nav("/manager/issues")}>
              <span className="tl-dot" style={{ background: sevColor[i.sev] }} />
              <div>
                <div className="tt">{t(i.titleKey)} · {t("prop." + i.propId)}</div>
                <div className="ts">{t(i.locKey)} · {t("mgr.flagged", { when: t(i.whenKey) })}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
