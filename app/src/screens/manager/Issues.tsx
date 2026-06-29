import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brand } from "../../components/Brand";
import { LangSwitch } from "../../components/LangSwitch";
import { Back, CatIcon } from "../../components/Icons";
import { Empty } from "../../components/Empty";
import { AllClear } from "../../components/EmptyArt";
import { useStore } from "../../lib/store";
import type { IssueStatus } from "../../data/mock";

const sevColor: Record<string, string> = { high: "var(--alert)", medium: "var(--warn)", low: "var(--slate)" };
const statusPill: Record<IssueStatus, string> = { open: "pill-warn", in_progress: "pill-go", resolved: "pill-ok" };
const filters: (IssueStatus | "all")[] = ["all", "open", "in_progress", "resolved"];

export default function Issues() {
  const nav = useNavigate();
  const { issues, setCurrentIssue, t } = useStore();
  const [filter, setFilter] = useState<IssueStatus | "all">("all");
  const shown = filter === "all" ? issues : issues.filter((i) => i.status === filter);
  const count = (f: IssueStatus | "all") => (f === "all" ? issues.length : issues.filter((i) => i.status === f).length);

  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/manager")} aria-label={t("a.back")}><Back /></button>
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("mgr.ops")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("iss.title")}</h1>
        <p className="meta" style={{ marginTop: 8 }}>{t("iss.sub")}</p>

        <div className="tabs">
          {filters.map((f) => (
            <button key={f} className={"tab" + (filter === f ? " on" : "")} onClick={() => setFilter(f)}>
              {f === "all" ? t("iss.all") : t("ist." + f)}<span className="c">{count(f)}</span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 8 }}>
          {shown.length === 0 && (
            <Empty art={<AllClear />} title={t("iss.none")} sub={t("iss.noneSub")} />
          )}
          {shown.map((i) => (
            <button className="irow iconrow" key={i.id} onClick={() => { setCurrentIssue(i.id); nav("/manager/issue"); }}>
              <span className="iicon" style={{ color: sevColor[i.sev], background: "var(--cloud)" }}><CatIcon id={i.cat} size={18} /></span>
              <span>
                <span className="inm">{i.title ?? t(i.titleKey)}</span>
                <span className="isub">{t("prop." + i.propId)} · {t(i.locKey)}</span>
              </span>
              <span className={"pill " + statusPill[i.status]}>{t("ist." + i.status)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
