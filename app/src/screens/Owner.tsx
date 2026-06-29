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
  const { property, ownerTimeline, propReadiness, t } = useStore();
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

        <div className="label" style={{ marginTop: 28 }}>{t("own.month")}</div>
        <div className="statgrid" style={{ marginTop: 8 }}>
          <div className="stat"><div className="num">6</div><div className="lab">{t("own.bookings")}</div></div>
          <div className="stat"><div className="num">12</div><div className="lab">{t("own.inspections")}</div></div>
          <div className="stat"><div className="num">1</div><div className="lab">{t("own.issues")}</div></div>
        </div>
        <p className="meta" style={{ marginTop: 16 }}>{t("own.revenue")}</p>
      </div>
    </div>
  );
}
