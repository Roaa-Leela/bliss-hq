import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { LangSwitch } from "../components/LangSwitch";
import { Back } from "../components/Icons";
import { managerProps } from "../data/mock";
import { useStore } from "../lib/store";

const templateKeys = ["tpl.preCheckin", "tpl.postStay", "tpl.daily", "tpl.weekly", "tpl.monthly", "tpl.adhoc"];

export default function Admin() {
  const nav = useNavigate();
  const { t } = useStore();
  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/")} aria-label={t("a.back")}><Back /></button>
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("adm.setup")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("adm.title")}</h1>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 28 }}>
          <div className="label">{t("adm.properties")}</div>
          <span className="pill pill-go">{t("adm.add")}</span>
        </div>
        <div className="list">
          {managerProps.map((p) => (
            <div className="li" key={p.id}>
              <span><span className="li-name">{t("prop." + p.id)}</span><span className="li-sub">{t("adm.propSub")}</span></span>
              <span className="pill pill-todo">{t("adm.edit")}</span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 28 }}>
          <div className="label">{t("adm.templates")}</div>
          <span className="pill pill-go">{t("adm.new")}</span>
        </div>
        <div className="list">
          {templateKeys.map((k) => (
            <div className="li" key={k}>
              <span><span className="li-name">{t(k)}</span><span className="li-sub">{t("adm.tplSub")}</span></span>
              <span className="pill pill-todo">{t("adm.edit")}</span>
            </div>
          ))}
        </div>

        <div className="label" style={{ marginTop: 28 }}>{t("adm.people")}</div>
        <div className="statgrid" style={{ marginTop: 8 }}>
          <div className="stat"><div className="num">3</div><div className="lab">{t("adm.managers")}</div></div>
          <div className="stat"><div className="num">10</div><div className="lab">{t("adm.caretakers")}</div></div>
          <div className="stat"><div className="num">8</div><div className="lab">{t("adm.owners")}</div></div>
        </div>
      </div>
    </div>
  );
}
