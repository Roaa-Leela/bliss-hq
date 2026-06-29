import { useNavigate } from "react-router-dom";
import { Brand } from "../../components/Brand";
import { LangSwitch } from "../../components/LangSwitch";
import { Back, CatIcon } from "../../components/Icons";
import { StatusPicker } from "../../components/StatusPicker";
import { Empty } from "../../components/Empty";
import { AllClear } from "../../components/EmptyArt";
import { useStore } from "../../lib/store";

const sevColor: Record<string, string> = { high: "var(--alert)", medium: "var(--warn)", low: "var(--slate)" };

export default function MyTasks() {
  const nav = useNavigate();
  const { issues, setIssueStatus, showToast, t } = useStore();
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
          <Empty art={<AllClear />} title={t("ct.none")} />
        ) : (
          <div style={{ marginTop: 18 }}>
            {mine.map((i) => (
              <div className="taskcard" key={i.id}>
                <div className="tchead">
                  <span className="iicon" style={{ color: sevColor[i.sev], background: "var(--cloud)" }}><CatIcon id={i.cat} size={18} /></span>
                  <span className="tcnm">{i.title ?? t(i.titleKey)}</span>
                </div>
                <div className="tcsub">{t("prop." + i.propId)} · {t(i.locKey)}</div>
                <div style={{ marginTop: 12 }}>
                  <StatusPicker value={i.status} onChange={(s) => { setIssueStatus(i.id, s); showToast(t("toast.statusSaved")); }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
