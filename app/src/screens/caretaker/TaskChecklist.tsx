import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brand } from "../../components/Brand";
import { LangSwitch } from "../../components/LangSwitch";
import { Check } from "../../components/Icons";
import { BottomBar } from "../../components/BottomBar";
import { useStore } from "../../lib/store";

export default function TaskChecklist() {
  const nav = useNavigate();
  const { taskChecklists, activeChecklistId, done, toggleDone, t } = useStore();
  const cl = taskChecklists.find((c) => c.id === activeChecklistId);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { if (!cl) nav("/caretaker/checklists"); }, [cl, nav]);
  if (!cl) return null;

  const total = cl.items.length;
  const d = cl.items.filter((i) => done[i.id]).length;
  const pct = Math.round((d / total) * 100);

  if (submitted) {
    return (
      <div className="screen">
        <div className="celebrate">
          <div className="ring"><Check size={40} color="var(--ok-text)" /></div>
          <h1>{t("cl.submittedT")}</h1>
          <p>{t("cl.submittedS", { n: total })}</p>
          <button className="btn btn-outline" style={{ marginTop: 28, width: "auto", padding: "0 28px" }} onClick={() => nav("/caretaker/checklists")}>{t("act.backHome")}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen">
      <div className="appbar">
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t(cl.freqKey)}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("tpl." + cl.id)}</h1>
        <div className="meta" style={{ marginTop: 8 }}>{t("cl.progress", { done: d, total })} · {pct}%</div>
        <div className="progress" style={{ marginTop: 12 }}><i style={{ width: `${pct}%` }} /></div>

        <div style={{ marginTop: 16 }}>
          {cl.items.map((it) => {
            const on = !!done[it.id];
            return (
              <button className={"checkrow" + (on ? " on" : "")} key={it.id} onClick={() => toggleDone(it.id)}>
                <span className={"cbox" + (on ? " on" : "")}>{on && <Check size={15} />}</span>
                <span className="ctext">{t(it.textKey)}</span>
              </button>
            );
          })}
        </div>
      </div>
      <BottomBar onBack={() => nav("/caretaker/checklists")}>
        <button className="btn btn-primary" disabled={d < total} style={d < total ? { opacity: 0.5 } : undefined} onClick={() => setSubmitted(true)}>{t("cl.submit")}</button>
      </BottomBar>
    </div>
  );
}
