import { useNavigate } from "react-router-dom";
import { Brand } from "../../components/Brand";
import { LangSwitch } from "../../components/LangSwitch";
import { useStore } from "../../lib/store";

const chip = { ready: "pill-ok", active: "pill-go", todo: "pill-todo" } as const;
const issueTitleKey: Record<string, string> = { i1: "ix.ac", i2: "ix.towels" };
const issueWhenKey: Record<string, string> = { i1: "when.2h", i2: "when.today" };
const issuePropId: Record<string, string> = { i1: "palm-grove", i2: "lake" };
const issueLocKey: Record<string, string> = { i1: "loc.bedroom2", i2: "loc.restock" };

export default function Operations() {
  const nav = useNavigate();
  const { managerProps, openIssues, t } = useStore();
  const chipLabel = { ready: t("st.ready"), active: t("st.inProgress"), todo: t("st.todo") };
  const sub = (id: string) =>
    id === "palm-grove" ? `${t("meta.preCheckin")} · ${t("today.guest")} ${t("time.4pm")}`
    : id === "misty" ? t("mgr.areasN", { done: 5, total: 8 })
    : id === "lake" ? t("mgr.notStarted")
    : t("mgr.postStay");

  return (
    <div className="screen wide">
      <div className="appbar"><Brand /><LangSwitch /></div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 14 }}>{t("mgr.dateline")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("mgr.ops")}</h1>

        <div className="statgrid" style={{ marginTop: 22 }}>
          <div className="stat"><div className="accent" style={{ background: "var(--ok)" }} /><div className="num" style={{ color: "var(--ok)" }}>1/4</div><div className="lab">{t("mgr.readyStat")}</div></div>
          <div className="stat"><div className="accent" style={{ background: "var(--info)" }} /><div className="num" style={{ color: "var(--info)" }}>2</div><div className="lab">{t("mgr.toReview")}</div></div>
          <div className="stat"><div className="accent" style={{ background: "var(--alert)" }} /><div className="num" style={{ color: "var(--alert)" }}>2</div><div className="lab">{t("mgr.openIssues")}</div></div>
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

        <div className="label" style={{ marginTop: 28 }}>{t("mgr.openIssues")}</div>
        <div className="list">
          {openIssues.map((i) => (
            <div className="tl-item" key={i.id}>
              <span className="tl-dot" style={{ background: i.level === "alert" ? "var(--alert)" : "var(--warn)" }} />
              <div>
                <div className="tt">{t(issueTitleKey[i.id])} · {t("prop." + issuePropId[i.id])}</div>
                <div className="ts">{t(issueLocKey[i.id])} · {t("mgr.flagged", { when: t(issueWhenKey[i.id]) })}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
