import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { LangSwitch } from "../components/LangSwitch";
import { Back, TlIcon } from "../components/Icons";
import { useStore } from "../lib/store";

const dot = { ok: "var(--ok)", info: "var(--info)", warn: "var(--warn)" };
const idxOf: Record<string, string> = { t1: "1", t2: "2", t3: "3", t4: "4" };

const ownPill: Record<string, string> = { ready: "pill-ok", review: "pill-warn", active: "pill-go", todo: "pill-todo" };

export default function Owner() {
  const nav = useNavigate();
  const { property, ownerTimeline, propReadiness, deductions, setDeductionStatus, showToast, t } = useStore();
  const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
  const r = propReadiness("palm-grove");
  const ownLabel: Record<string, string> = { ready: t("st.ready"), review: t("mgr.toReview"), active: t("st.inProgress"), todo: t("st.todo") };
  const ownTitle: Record<string, string> = { ready: t("own.readyGuest"), review: t("own.stReview"), active: t("own.stActive"), todo: t("own.stTodo") };
  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/")} aria-label={t("a.back")}><Back /></button>
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("own.your")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("prop." + property.id)}</h1>

        <div className="card" style={{ marginTop: 22, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div className="li-name" style={{ fontWeight: 700 }}>{ownTitle[r]}</div>
            <div className="li-sub">{t("own.nextCheckin")}</div>
          </div>
          <span className={"pill " + ownPill[r]}>{ownLabel[r]}</span>
        </div>

        {deductions.length > 0 && (
          <>
            <div className="label" style={{ marginTop: 28 }}>{t("own.approvals")}</div>
            {deductions.map((d) => (
              <div className="card" key={d.id} style={{ marginTop: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
                  <span className="li-name" style={{ fontWeight: 700 }}>{t(d.guestKey)}</span>
                  <span style={{ fontSize: 20, fontWeight: 800, color: "var(--alert-text)", whiteSpace: "nowrap" }}>−{inr(d.amount)}</span>
                </div>
                <div className="li-sub" style={{ marginTop: 5 }}>{t(d.reasonKey)} · {t("own.deductFrom")}</div>
                {d.status === "pending" ? (
                  <div className="options" style={{ marginTop: 14 }}>
                    <button className="opt" onClick={() => { setDeductionStatus(d.id, "declined"); showToast(t("toast.depDeclined")); }}>{t("dep.decline")}</button>
                    <button className="opt sel" onClick={() => { setDeductionStatus(d.id, "approved"); showToast(t("toast.depApproved")); }}>{t("act.approve")}</button>
                  </div>
                ) : (
                  <span className={"pill " + (d.status === "approved" ? "pill-ok" : "pill-alert")} style={{ marginTop: 12, display: "inline-flex" }}>{t("ddst." + d.status)}</span>
                )}
              </div>
            ))}
          </>
        )}

        <div className="cols2">
        <div>
        <div className="label" style={{ marginTop: 28 }}>{t("own.activity")}</div>
        <div>
          {ownerTimeline.map((tl) => (
            <div className="tl-item" key={tl.id}>
              <span className="tlic" style={{ color: dot[tl.kind], background: "var(--cloud)" }}><TlIcon id={tl.kind} size={16} /></span>
              <div>
                <div className="tt">{t("tl." + idxOf[tl.id] + ".t")}</div>
                <div className="ts">{t("tl." + idxOf[tl.id] + ".s")}</div>
              </div>
            </div>
          ))}
        </div>
        </div>

        <div>
        <div className="label" style={{ marginTop: 28 }}>{t("own.month")}</div>
        <div className="statgrid" style={{ marginTop: 8 }}>
          <div className="stat"><div className="num">6</div><div className="lab">{t("own.bookings")}</div></div>
          <div className="stat"><div className="num">12</div><div className="lab">{t("own.inspections")}</div></div>
          <div className="stat"><div className="num">1</div><div className="lab">{t("own.issues")}</div></div>
        </div>
        <p className="meta" style={{ marginTop: 16 }}>{t("own.revenue")}</p>
        </div>
        </div>
      </div>
    </div>
  );
}
