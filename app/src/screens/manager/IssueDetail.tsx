import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CatIcon, Person, TradeIcon, MtIcon } from "../../components/Icons";
import { BottomBar } from "../../components/BottomBar";
import { StatusPicker } from "../../components/StatusPicker";
import { useStore } from "../../lib/store";
import { maintenanceTypes, ownerships } from "../../data/mock";

const sevColor: Record<string, string> = { high: "var(--alert)", medium: "var(--warn)", low: "var(--slate)" };
const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function IssueDetail() {
  const nav = useNavigate();
  const { issues, currentIssueId, setIssueStatus, assignIssue, updateIssue, caretakers, vendors, showToast, t } = useStore();
  const issue = issues.find((i) => i.id === currentIssueId);

  useEffect(() => { if (!issue) nav("/manager/issues"); }, [issue, nav]);
  if (!issue) return null;

  const isAssigned = (type: "vendor" | "caretaker", id: string) =>
    issue.assignee?.type === type && issue.assignee?.id === id;

  return (
    <div className="screen wide">
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("prop." + issue.propId)} · {t(issue.locKey)}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{issue.title ?? t(issue.titleKey)}</h1>

        <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
          <span className="pill" style={{ background: "var(--cloud)", color: "var(--todo)", gap: 6 }}><CatIcon id={issue.cat} size={14} />{t("cat." + issue.cat)}</span>
          <span className="pill" style={{ background: "var(--surface)", color: sevColor[issue.sev], border: "1.5px solid " + sevColor[issue.sev] }}>{t("lvl." + issue.sev)}</span>
        </div>

        <div className="issueform" style={{ marginTop: 20 }}>
          <div className="issuecol">
            <div className="ref" style={{ height: 150 }}><div className="tag">{t("issue.photos")}</div></div>

            <div className="field">
              <span className="flabel">{t("iss.statusLabel")}</span>
              <StatusPicker value={issue.status} onChange={(s) => { setIssueStatus(issue.id, s); showToast(t("toast.statusSaved")); }} />
            </div>

            <div className="field">
              <span className="flabel">{t("iss.type")}</span>
              <div className="options optgrid">
                {maintenanceTypes.map((mt) => (
                  <button key={mt} className={"opt opt-ic" + (issue.type === mt ? " sel" : "")} onClick={() => { updateIssue(issue.id, { type: mt }); showToast(t("toast.statusSaved")); }}>
                    <MtIcon id={mt} size={19} /><span>{t("mt." + mt)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="field">
              <span className="flabel">{t("iss.ownership")}</span>
              <div className="options optgrid">
                {ownerships.map((o) => (
                  <button key={o} className={"opt" + (issue.ownership === o ? " sel" : "")} onClick={() => { updateIssue(issue.id, { ownership: o }); showToast(t("toast.statusSaved")); }}>{t("ow." + o)}</button>
                ))}
              </div>
            </div>

            <div className="field">
              <span className="flabel">{t("iss.quote")}</span>
              <div className="amtbox">
                <span className="amtval">{issue.amount ? inr(issue.amount) : t("iss.noQuote")}</span>
                {issue.amount ? <button className="amtclear" onClick={() => updateIssue(issue.id, { amount: 0 })}>{t("dep.clear")}</button> : null}
              </div>
              <div className="amtchips">
                {[500, 1000, 5000].map((n) => (
                  <button key={n} className="amtchip" onClick={() => updateIssue(issue.id, { amount: (issue.amount ?? 0) + n })}>+{inr(n)}</button>
                ))}
              </div>
            </div>
          </div>

          <div className="issuecol">
            <div className="field" style={{ marginTop: 0 }}>
              <span className="flabel">{t("iss.assign")}</span>
              <button className={"pickrow" + (!issue.assignee ? " sel" : "")} onClick={() => { assignIssue(issue.id, null); showToast(t("toast.assigned")); }}>
                <span className="pname">{t("iss.unassigned")}</span>
                <span className="tick">{!issue.assignee && <Tick />}</span>
              </button>
              {caretakers.map((c) => (
                <button key={c.id} className={"pickrow" + (isAssigned("caretaker", c.id) ? " sel" : "")} onClick={() => { assignIssue(issue.id, { type: "caretaker", id: c.id }); showToast(t("toast.assigned")); }}>
                  <span className="pk-left"><span className="licon"><Person size={20} /></span><span><span className="pname" style={{ display: "block" }}>{t(c.nameKey)}</span><span className="ptag">{t("gen.caretaker")}</span></span></span>
                  <span className="tick">{isAssigned("caretaker", c.id) && <Tick />}</span>
                </button>
              ))}
              {vendors.map((v) => (
                <button key={v.id} className={"pickrow" + (isAssigned("vendor", v.id) ? " sel" : "")} onClick={() => { assignIssue(issue.id, { type: "vendor", id: v.id }); showToast(t("toast.assigned")); }}>
                  <span className="pk-left"><span className="licon"><TradeIcon id={v.trade} size={20} /></span><span><span className="pname" style={{ display: "block" }}>{t(v.nameKey)}</span><span className="ptag">{t("trade." + v.trade)}</span></span></span>
                  <span className="tick">{isAssigned("vendor", v.id) && <Tick />}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <BottomBar onBack={() => nav("/manager/issues")}>
        <button className="btn btn-primary" onClick={() => nav("/manager/issues")}>{t("act.done")}</button>
      </BottomBar>
    </div>
  );
}

function Tick() {
  return <svg width="14" height="14" viewBox="0 0 24 24"><path d="M5 12l5 5 9-11" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
