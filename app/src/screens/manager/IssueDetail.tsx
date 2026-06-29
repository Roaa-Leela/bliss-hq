import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Back, CatIcon, Person, TradeIcon } from "../../components/Icons";
import { useStore } from "../../lib/store";
import type { IssueStatus } from "../../data/mock";

const statuses: IssueStatus[] = ["open", "in_progress", "resolved"];
const sevColor: Record<string, string> = { high: "var(--alert)", medium: "var(--warn)", low: "var(--slate)" };

export default function IssueDetail() {
  const nav = useNavigate();
  const { issues, currentIssueId, setIssueStatus, assignIssue, caretakers, vendors, t } = useStore();
  const issue = issues.find((i) => i.id === currentIssueId);

  useEffect(() => { if (!issue) nav("/manager/issues"); }, [issue, nav]);
  if (!issue) return null;

  const isAssigned = (type: "vendor" | "caretaker", id: string) =>
    issue.assignee?.type === type && issue.assignee?.id === id;

  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/manager/issues")} aria-label={t("a.back")}><Back /></button>
        <span style={{ width: 42 }} />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("prop." + issue.propId)} · {t(issue.locKey)}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{issue.title ?? t(issue.titleKey)}</h1>

        <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
          <span className="pill" style={{ background: "var(--cloud)", color: "var(--todo)", gap: 6 }}><CatIcon id={issue.cat} size={14} />{t("cat." + issue.cat)}</span>
          <span className="pill" style={{ background: "var(--surface)", color: sevColor[issue.sev], border: "1.5px solid " + sevColor[issue.sev] }}>{t("lvl." + issue.sev)}</span>
        </div>

        <div className="ref" style={{ height: 150, marginTop: 20 }}><div className="tag">{t("issue.photos")}</div></div>

        <div className="field">
          <span className="flabel">{t("iss.statusLabel")}</span>
          <div className="options">
            {statuses.map((s) => (
              <button key={s} className={"opt" + (issue.status === s ? " sel" : "")} onClick={() => setIssueStatus(issue.id, s)}>{t("ist." + s)}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <span className="flabel">{t("iss.assign")}</span>
          <button className={"pickrow" + (!issue.assignee ? " sel" : "")} onClick={() => assignIssue(issue.id, null)}>
            <span className="pname">{t("iss.unassigned")}</span>
            <span className="tick">{!issue.assignee && <Tick />}</span>
          </button>
          {caretakers.map((c) => (
            <button key={c.id} className={"pickrow" + (isAssigned("caretaker", c.id) ? " sel" : "")} onClick={() => assignIssue(issue.id, { type: "caretaker", id: c.id })}>
              <span className="pk-left"><span className="licon"><Person size={20} /></span><span><span className="pname" style={{ display: "block" }}>{t(c.nameKey)}</span><span className="ptag">{t("gen.caretaker")}</span></span></span>
              <span className="tick">{isAssigned("caretaker", c.id) && <Tick />}</span>
            </button>
          ))}
          {vendors.map((v) => (
            <button key={v.id} className={"pickrow" + (isAssigned("vendor", v.id) ? " sel" : "")} onClick={() => assignIssue(issue.id, { type: "vendor", id: v.id })}>
              <span className="pk-left"><span className="licon"><TradeIcon id={v.trade} size={20} /></span><span><span className="pname" style={{ display: "block" }}>{t(v.nameKey)}</span><span className="ptag">{t("trade." + v.trade)}</span></span></span>
              <span className="tick">{isAssigned("vendor", v.id) && <Tick />}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function Tick() {
  return <svg width="14" height="14" viewBox="0 0 24 24"><path d="M5 12l5 5 9-11" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
