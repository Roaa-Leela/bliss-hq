import { useNavigate } from "react-router-dom";
import { Brand } from "../../components/Brand";
import { LangSwitch } from "../../components/LangSwitch";
import { Arrow } from "../../components/Icons";
import { useStore } from "../../lib/store";

export default function Today() {
  const nav = useNavigate();
  const { property, issues, t, tArea, totalProgress, areaState, areaProgress } = useStore();
  const tp = totalProgress();
  const myTasks = issues.filter((i) => i.assignee?.type === "caretaker" && i.assignee.id === "c1" && i.status !== "resolved").length;
  const preview = property.areas.slice(0, 4);
  const stateLabel = { done: t("st.done"), active: t("st.inProgress"), todo: t("st.todo") };
  const statePill = { done: "pill-ok", active: "pill-go", todo: "pill-todo" };

  return (
    <div className="screen">
      <div className="appbar"><Brand /><LangSwitch /></div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 14 }}>{t("today.dateline")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("today.greeting")},<br />{t("name.ramesh")}</h1>

        <div className="card" style={{ marginTop: 24 }}>
          <div className="label">{t("today.currentProperty")}</div>
          <h2 className="h2" style={{ marginTop: 8 }}>{t("prop." + property.id)}</h2>
          <div className="meta" style={{ marginTop: 6 }}>
            {t("meta.preCheckin")} · {property.bhk} · {t("today.guest")} {t("time.4pm")}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 18 }}>
            <strong style={{ fontSize: 13 }}>{t("today.areasReady", { done: tp.done, total: tp.total })}</strong>
            <span className="meta">{tp.pct}%</span>
          </div>
          <div className="progress" style={{ marginTop: 11 }}><i style={{ width: `${tp.pct}%` }} /></div>
        </div>

        <button className="btn btn-primary" style={{ marginTop: 22 }} onClick={() => nav("/caretaker/areas")}>
          {tp.pct === 0 ? t("act.start") : t("act.continue")} <Arrow />
        </button>
        <div className="quickrow">
          <button className="qa" onClick={() => nav("/caretaker/checklists")}>{t("qa.checklists")}</button>
          <button className="qa" onClick={() => nav("/caretaker/tasks")}>
            {t("qa.tasks")}{myTasks > 0 && <span className="qabadge">{myTasks}</span>}
          </button>
          <button className="qa" onClick={() => nav("/caretaker/laundry")}>{t("qa.laundry")}</button>
        </div>

        <div className="label" style={{ marginTop: 28 }}>{t("today.areas")}</div>
        <div className="list">
          {preview.map((a) => {
            const st = areaState(a); const p = areaProgress(a);
            return (
              <div className="li" key={a.id}>
                <span>
                  <span className="li-name">{tArea(a.id)}</span>
                  {st === "active" && <span className="li-sub">{t("areas.checks", { done: p.done, total: p.total })}</span>}
                </span>
                <span className={"pill " + statePill[st]}>{stateLabel[st]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
