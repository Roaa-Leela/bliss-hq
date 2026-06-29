import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { LangSwitch } from "../components/LangSwitch";
import { Back, AdminIcon, Home, ClIcon, Person } from "../components/Icons";
import { useStore } from "../lib/store";

const templateKeys = ["tpl.preCheckin", "tpl.postStay", "tpl.daily", "tpl.weekly", "tpl.monthly", "tpl.adhoc"];
const propCare: Record<string, string> = { "palm-grove": "name.ramesh", misty: "name.lakshmi", lake: "name.anil", fern: "name.ramesh" };

export default function Admin() {
  const nav = useNavigate();
  const { managerProps, property, taskChecklists, caretakers, setCurrentStaff, t } = useStore();
  const tplCount = (key: string) =>
    key === "tpl.preCheckin"
      ? property.areas.reduce((s, a) => s + a.items.length, 0)
      : taskChecklists.find((c) => "tpl." + c.id === key)?.items.length ?? 0;
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

        <div className="cols2">
        <div>
        <div className="list" style={{ marginTop: 20 }}>
          <button className="li" onClick={() => nav("/inventory")}>
            <span className="li-left"><span className="licon"><AdminIcon id="inventory" size={21} /></span><span><span className="li-name">{t("adm.inventory")}</span><span className="li-sub">{t("inv.sub")}</span></span></span>
            <span className="pill pill-go">{t("adm.open")}</span>
          </button>
          <button className="li" onClick={() => nav("/procurement")}>
            <span className="li-left"><span className="licon"><AdminIcon id="procurement" size={21} /></span><span><span className="li-name">{t("adm.procurement")}</span><span className="li-sub">{t("proc.sub")}</span></span></span>
            <span className="pill pill-go">{t("adm.open")}</span>
          </button>
          <button className="li" onClick={() => nav("/vendors")}>
            <span className="li-left"><span className="licon"><AdminIcon id="vendors" size={21} /></span><span><span className="li-name">{t("adm.vendors")}</span><span className="li-sub">{t("vnd.sub")}</span></span></span>
            <span className="pill pill-go">{t("adm.open")}</span>
          </button>
        </div>

        <div className="label" style={{ marginTop: 28 }}>{t("adm.properties")}</div>
        <div className="list">
          {managerProps.map((p) => (
            <div className="li" key={p.id}>
              <span className="li-left"><span className="licon"><Home size={20} /></span><span><span className="li-name">{t("prop." + p.id)}</span><span className="li-sub">{t("adm.propSub")}</span></span></span>
              <span className="tag-info">{t(propCare[p.id])}</span>
            </div>
          ))}
        </div>

        </div>
        <div>
        <div className="label" style={{ marginTop: 28 }}>{t("adm.templates")}</div>
        <div className="list">
          {templateKeys.map((k) => (
            <div className="li" key={k}>
              <span className="li-left"><span className="licon"><ClIcon id={k.replace("tpl.", "")} size={21} /></span><span><span className="li-name">{t(k)}</span><span className="li-sub">{t("adm.tplSub")}</span></span></span>
              <span className="tag-info">{t("cl.checksN", { n: tplCount(k) })}</span>
            </div>
          ))}
        </div>

        <div className="label" style={{ marginTop: 28 }}>{t("adm.staff")}</div>
        <div className="list">
          {caretakers.map((c) => (
            <button className="li" key={c.id} onClick={() => { setCurrentStaff(c.id); nav("/admin/staff"); }}>
              <span className="li-left"><span className="licon"><Person size={20} /></span>
                <span><span className="li-name">{t(c.nameKey)}</span><span className="li-sub">{t("gen.caretaker")} · {t("prop." + c.propId)}</span></span>
              </span>
              <span className="pill pill-go">{t("adm.viewProfile")}</span>
            </button>
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
      </div>
    </div>
  );
}
