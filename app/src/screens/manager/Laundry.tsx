import { useNavigate } from "react-router-dom";
import { Brand } from "../../components/Brand";
import { LangSwitch } from "../../components/LangSwitch";
import { Back, LaundryIcon } from "../../components/Icons";
import { useStore } from "../../lib/store";

const nameKey: Record<string, string> = { l1: "ln.sheets", l2: "ln.pillow", l3: "ln.bath", l4: "ln.hand", l5: "ln.duvet" };
const sizeKey: Record<string, string> = { l1: "sz.queenking", l2: "sz.standard", l3: "sz.large", l4: "sz.medium", l5: "sz.queenking" };

export default function Laundry() {
  const nav = useNavigate();
  const { laundrySubmission, t } = useStore();
  const sub = laundrySubmission;
  const rows = sub ? Object.entries(sub.counts).filter(([, n]) => n > 0) : [];

  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav(-1)} aria-label={t("a.back")}><Back /></button>
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("mgr.ops")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("lnd.title")}</h1>
        {!sub ? (
          <p className="meta" style={{ marginTop: 24 }}>{t("lnd.none")}</p>
        ) : (
          <>
            <p className="meta" style={{ marginTop: 8 }}>{t("prop." + sub.propId)} · {t("lnd.sub")} · {t(sub.whenKey)}</p>
            <div className="banner ok" style={{ marginTop: 18 }}>
              <span className="dot" style={{ background: "var(--ok)" }} />{t("lnd.total", { n: sub.total })}
            </div>
            <div style={{ marginTop: 14 }}>
              {rows.map(([id, n]) => (
                <div className="counter" key={id} style={{ borderTop: "1px solid var(--line)" }}>
                  <div className="li-left">
                    <span className="licon"><LaundryIcon id={id} size={20} /></span>
                    <div>
                      <div className="cn">{t(nameKey[id])}</div>
                      <div className="cs">{t(sizeKey[id])}</div>
                    </div>
                  </div>
                  <span className="cnt" style={{ fontSize: 20, fontWeight: 800, color: "var(--forest)" }}>{n}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
