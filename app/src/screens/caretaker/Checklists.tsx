import { useNavigate } from "react-router-dom";
import { Brand } from "../../components/Brand";
import { LangSwitch } from "../../components/LangSwitch";
import { Back } from "../../components/Icons";
import { useStore } from "../../lib/store";

export default function Checklists() {
  const nav = useNavigate();
  const { taskChecklists, done, totalProgress, setActiveChecklist, t } = useStore();
  const tp = totalProgress();

  const clProgress = (items: { id: string }[]) => items.filter((i) => done[i.id]).length;
  const pill = (d: number, total: number) =>
    d === 0 ? { cls: "pill-todo", lab: t("st.todo") } : d < total ? { cls: "pill-go", lab: t("st.inProgress") } : { cls: "pill-ok", lab: t("st.done") };

  const openTask = (id: string) => { setActiveChecklist(id); nav("/caretaker/checklist"); };

  return (
    <div className="screen">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/caretaker")} aria-label={t("a.back")}><Back /></button>
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("today.currentProperty")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("cl.hubTitle")}</h1>
        <p className="meta" style={{ marginTop: 8 }}>{t("cl.hubSub")}</p>

        <div className="list" style={{ marginTop: 18 }}>
          <button className="li" onClick={() => nav("/caretaker/areas")}>
            <span>
              <span className="li-name">{t("tpl.preCheckin")}</span>
              <span className="li-sub">{t("freq.preCheckin")} · {t("cl.progress", { done: tp.done, total: tp.total })}</span>
            </span>
            <span className={"pill " + (tp.pct === 100 ? "pill-ok" : tp.pct > 0 ? "pill-go" : "pill-todo")}>{tp.pct === 100 ? t("st.done") : tp.pct > 0 ? t("st.inProgress") : t("st.todo")}</span>
          </button>
          {taskChecklists.map((cl) => {
            const d = clProgress(cl.items);
            const pl = pill(d, cl.items.length);
            return (
              <button className="li" key={cl.id} onClick={() => openTask(cl.id)}>
                <span>
                  <span className="li-name">{t("tpl." + cl.id)}</span>
                  <span className="li-sub">{t(cl.freqKey)} · {t("cl.checksN", { n: cl.items.length })}</span>
                </span>
                <span className={"pill " + pl.cls}>{pl.lab}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
