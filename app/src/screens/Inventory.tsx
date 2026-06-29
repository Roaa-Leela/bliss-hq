import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { LangSwitch } from "../components/LangSwitch";
import { Back } from "../components/Icons";
import { useStore } from "../lib/store";

const cats = ["kitchen", "crockery", "linen", "toiletries", "consumables"];

export default function Inventory() {
  const nav = useNavigate();
  const { inventoryItems, t } = useStore();

  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/admin")} aria-label={t("a.back")}><Back /></button>
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("adm.setup")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("inv.title")}</h1>
        <p className="meta" style={{ marginTop: 8 }}>{t("inv.sub")}</p>

        {cats.map((c) => {
          const items = inventoryItems.filter((i) => i.cat === c);
          if (!items.length) return null;
          return (
            <div key={c}>
              <div className="label" style={{ marginTop: 26 }}>{t("cat." + c)}</div>
              <div className="list">
                {items.map((i) => {
                  const low = i.stock < i.must;
                  const pill = i.stock === 0 ? "pill-alert" : low ? "pill-warn" : "pill-ok";
                  const label = low ? t("inv.reorder") : t("inv.inStock");
                  return (
                    <div className="li" key={i.id}>
                      <span>
                        <span className="li-name">{t("inv." + i.id)}</span>
                        <span className="li-sub">{i.stock} / {i.must} · {t("cond." + i.condition)}</span>
                      </span>
                      <span className={"pill " + pill}>{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
