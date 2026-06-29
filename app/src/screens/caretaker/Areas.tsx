import { useNavigate } from "react-router-dom";
import { AreaIcon } from "../../components/Icons";
import { BottomBar } from "../../components/BottomBar";
import { useStore } from "../../lib/store";

export default function Areas() {
  const nav = useNavigate();
  const { property, t, tArea, areaState, areaProgress, setCurrentArea, totalProgress } = useStore();
  const tp = totalProgress();
  const stateLabel = { done: t("st.done"), active: t("st.resume"), todo: t("st.start") };
  const statePill = { done: "pill-ok", active: "pill-next", todo: "pill-todo" };
  const open = (id: string) => { setCurrentArea(id); nav("/caretaker/task"); };

  return (
    <div className="screen">
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 14 }}>{t("meta.preCheckin")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("prop." + property.id)}</h1>
        <div className="meta" style={{ marginTop: 8 }}>{t("areas.ready2", { done: tp.done, total: tp.total })} · {tp.pct}%</div>
        <div className="progress" style={{ marginTop: 12 }}><i style={{ width: `${tp.pct}%` }} /></div>

        <div className="label" style={{ marginTop: 26 }}>{t("areas.all")}</div>
        <div className="list">
          {property.areas.map((a) => {
            const st = areaState(a); const p = areaProgress(a);
            return (
              <button className="li" key={a.id} onClick={() => open(a.id)}>
                <span className="li-left">
                  <span className="licon"><AreaIcon id={a.type} size={22} /></span>
                  <span>
                    <span className="li-name">{tArea(a.id)}</span>
                    <span className="li-sub">{t("areas.checks", { done: p.done, total: p.total })}</span>
                  </span>
                </span>
                <span className={"pill " + statePill[st]}>{stateLabel[st]}</span>
              </button>
            );
          })}
        </div>
      </div>
      {tp.pct === 100 ? (
        <BottomBar onBack={() => nav("/caretaker")}>
          <button className="btn btn-primary" onClick={() => nav("/caretaker/submit")}>{t("act.submit")}</button>
        </BottomBar>
      ) : (
        <BottomBar onBack={() => nav("/caretaker")} />
      )}
    </div>
  );
}
