import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { LangSwitch } from "../components/LangSwitch";
import { Back } from "../components/Icons";
import { useStore } from "../lib/store";

export default function Vendors() {
  const nav = useNavigate();
  const { vendors, t } = useStore();
  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/admin")} aria-label={t("a.back")}><Back /></button>
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("adm.setup")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("vnd.title")}</h1>
        <p className="meta" style={{ marginTop: 8 }}>{t("vnd.sub")}</p>

        <div style={{ marginTop: 20 }}>
          {vendors.map((v) => (
            <div className="li" key={v.id} style={{ alignItems: "center" }}>
              <span>
                <span className="li-name">{v.name}</span>
                <span className="li-sub">{t("trade." + v.trade)} · {v.area} · {"★".repeat(v.rating)}</span>
              </span>
              <span className="pill" style={{ background: "var(--mist)", color: "var(--forest)" }}>{t("act.call")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
