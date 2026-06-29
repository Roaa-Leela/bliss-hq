import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { LangSwitch } from "../components/LangSwitch";
import { Back } from "../components/Icons";
import { useStore } from "../lib/store";

const cats = ["kitchen", "crockery", "linen", "toiletries", "consumables"];

export default function Inventory() {
  const nav = useNavigate();
  const { inventoryItems, vendors, prefVendorByCat, setCurrentItem, t } = useStore();
  const low = inventoryItems.filter((i) => i.stock < i.must).length;
  const prefName = (cat: string) => { const v = vendors.find((x) => x.id === prefVendorByCat[cat]); return v ? t(v.nameKey) : ""; };

  const condStyle = (c: string) =>
    c === "good" ? { background: "var(--cloud)", color: "var(--todo)" }
    : c === "fair" ? { background: "var(--warn-bg)", color: "var(--warn-text)" }
    : { background: "var(--alert-bg)", color: "var(--alert-text)" };

  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav(-1)} aria-label={t("a.back")}><Back /></button>
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("adm.setup")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("inv.title")}</h1>
        <p className="meta" style={{ marginTop: 8 }}>{t("inv.sub")}</p>

        {/* The thing a manager cares about first: what needs reordering */}
        {low ? (
          <button className="banner warn" style={{ marginTop: 18, width: "100%", justifyContent: "space-between" }} onClick={() => nav("/procurement")}>
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span className="dot" style={{ background: "var(--warn)" }} />
              {t("inv.needReorder", { n: low })}
            </span>
            <span className="pill pill-warn">{t("inv.reorder")}</span>
          </button>
        ) : (
          <div className="banner ok" style={{ marginTop: 18 }}>
            <span className="dot" style={{ background: "var(--ok)" }} />{t("inv.allStocked")}
          </div>
        )}

        <div className="tbl-head" style={{ marginTop: 22 }}>
          <span /><span className="h">{t("inv.colItem")}</span>
          <span className="h r">{t("inv.colStock")}</span><span className="h">{t("inv.colCondition")}</span>
        </div>

        {cats.map((c) => {
          const items = inventoryItems
            .filter((i) => i.cat === c)
            .sort((a, b) => (a.stock - a.must) - (b.stock - b.must)); // low stock first
          if (!items.length) return null;
          return (
            <div key={c}>
              <div className="label" style={{ marginTop: 20, marginBottom: 4 }}>{t("cat." + c)}</div>
              {items.map((i) => {
                const isLow = i.stock < i.must;
                const barColor = i.stock === 0 ? "var(--alert)" : isLow ? "var(--warn)" : "var(--ok)";
                const cntColor = i.stock === 0 ? "var(--alert-text)" : isLow ? "var(--warn-text)" : "var(--ink)";
                return (
                  <button className="tbl-row" key={i.id} onClick={() => { setCurrentItem(i.id); nav("/inventory/item"); }}>
                    <span className="bar" style={{ background: barColor }} />
                    <span className="nmwrap">
                      <span className="nm">{t("inv." + i.id)}</span>
                      {isLow && <span className="ivsub">{t("proc.from", { vendor: prefName(i.cat) })}</span>}
                    </span>
                    <span className="cnt" style={{ color: cntColor }}>{i.stock}<small>/{i.must}</small></span>
                    <span className="cond" style={condStyle(i.condition)}>{t("cond." + i.condition)}</span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
