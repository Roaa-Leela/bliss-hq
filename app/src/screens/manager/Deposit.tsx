import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brand } from "../../components/Brand";
import { LangSwitch } from "../../components/LangSwitch";
import { Back, Check } from "../../components/Icons";
import { useStore } from "../../lib/store";
import { bookingsData, DEPOSIT_AMOUNT, depositReasons } from "../../data/mock";

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

export default function Deposit() {
  const nav = useNavigate();
  const { currentStayId, t } = useStore();
  const stay = bookingsData.find((b) => b.id === currentStayId) ?? bookingsData[0];
  const [reason, setReason] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const refundable = Math.max(0, DEPOSIT_AMOUNT - amount);
  const add = (n: number) => setAmount((a) => Math.min(DEPOSIT_AMOUNT, a + n));
  const canSubmit = !!reason && amount > 0;

  if (submitted) {
    return (
      <div className="screen wide">
        <div className="appbar">
          <button className="iconbtn" onClick={() => nav("/manager")} aria-label={t("a.back")}><Back /></button>
          <span style={{ width: 42 }} />
        </div>
        <div className="celebrate">
          <div className="ring"><Check size={40} color="var(--ok-text)" /></div>
          <h1>{t("dep.submittedT")}</h1>
          <p>{t("dep.submittedS", { guest: t(stay.guestKey), amt: inr(amount) })}</p>
          <button className="btn btn-outline" style={{ marginTop: 28, width: "auto", padding: "0 28px" }} onClick={() => nav("/manager")}>{t("act.backOps")}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/manager/calendar")} aria-label={t("a.back")}><Back /></button>
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("mgr.ops")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("dep.title")}</h1>
        <p className="meta" style={{ marginTop: 8 }}>{t("dep.sub")}</p>

        <div className="staycard">
          <span className="sgn">{t(stay.guestKey)}</span>
          <span className="sgs">{t("prop." + stay.propId)} · {t("dep.checkedOut", { date: `${t("cal.monShort")} ${stay.end}` })}</span>
        </div>

        {/* The number the PM cares about most: what stays refundable */}
        <div className="depcard">
          <div className="deprow"><span>{t("dep.depositLabel")}</span><span>{inr(DEPOSIT_AMOUNT)}</span></div>
          <div className="deprow"><span>{t("dep.deductLabel")}</span><span className="minus">{amount > 0 ? "−" : ""}{inr(amount)}</span></div>
          <div className="depdivider" />
          <div className="deprow hero"><span>{t("dep.refundLabel")}</span><span className="bignum">{inr(refundable)}</span></div>
        </div>

        <div className="field">
          <span className="flabel">{t("dep.reason")}</span>
          <div className="options">
            {depositReasons.map((r) => (
              <button key={r} className={"opt" + (reason === r ? " sel" : "")} onClick={() => setReason(r)}>{t("dep.reason." + r)}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <span className="flabel">{t("dep.amount")}</span>
          <div className="amtbox">
            <span className="amtval">{inr(amount)}</span>
            {amount > 0 && <button className="amtclear" onClick={() => setAmount(0)}>{t("dep.clear")}</button>}
          </div>
          <div className="amtchips">
            {[100, 500, 1000].map((n) => (
              <button key={n} className="amtchip" onClick={() => add(n)}>+{inr(n)}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <span className="flabel">{t("dep.note")}</span>
          <textarea className="textarea" placeholder={t("dep.notePh")} />
        </div>

        <div className="ref" style={{ height: 130, marginTop: 20 }}><div className="tag">{t("dep.evidence")}</div></div>
      </div>
      <div className="actions">
        <button className="btn btn-primary" disabled={!canSubmit} style={!canSubmit ? { opacity: 0.5 } : undefined} onClick={() => setSubmitted(true)}>{t("dep.submit")}</button>
      </div>
    </div>
  );
}
