import { useNavigate } from "react-router-dom";
import { Brand } from "../../components/Brand";
import { LangSwitch } from "../../components/LangSwitch";
import { Back, CatIcon } from "../../components/Icons";
import { useStore } from "../../lib/store";
import type { IssueStatus } from "../../data/mock";

const sevColor: Record<string, string> = { high: "var(--alert)", medium: "var(--warn)", low: "var(--slate)" };
const statuses: IssueStatus[] = ["open", "in_progress", "resolved"];

export default function MyTasks() {
  const nav = useNavigate();
  const { issues, setIssueStatus, t } = useStore();
  const mine = issues.filter((i) => i.assignee?.type === "caretaker" && i.assignee.id === "c1");

  return (
    <div className="screen">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/caretaker")} aria-label={t("a.back")}><Back /></button>
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("today.currentProperty")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("ct.title")}</h1>
        <p className="meta" style={{ marginTop: 8 }}>{t("ct.sub")}</p>

        {mine.length === 0 ? (
          <p className="meta" style={{ marginTop: 24 }}>{t("ct.none")}</p>
        ) : (
          <div style={{ marginTop: 18 }}>
            {mine.map((i) => (
              <div className="taskcard" key={i.id}>
                <div className="tchead">
                  <span className="iicon" style={{ color: sevColor[i.sev], background: "var(--cloud)" }}><CatIcon id={i.cat} size={18} /></span>
                  <span className="tcnm">{i.title ?? t(i.titleKey)}</span>
                </div>
                <div className="tcsub">{t("prop." + i.propId)} · {t(i.locKey)}</div>
                <div className="options" style={{ marginTop: 12 }}>
                  {statuses.map((s) => (
                    <button key={s} className={"opt" + (i.status === s ? " sel" : "")} onClick={() => setIssueStatus(i.id, s)}>{t("ist." + s)}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
