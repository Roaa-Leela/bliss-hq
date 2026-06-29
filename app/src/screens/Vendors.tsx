import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { LangSwitch } from "../components/LangSwitch";
import { Back, TradeIcon, Phone } from "../components/Icons";
import { useStore } from "../lib/store";

const trades = ["plumbing", "electrical", "ac", "carpentry", "painting", "pool", "laundry", "pest", "supplies"];

function Stars({ n }: { n: number }) {
  return <span className="stars">{"★".repeat(n)}<span className="dim">{"★".repeat(5 - n)}</span></span>;
}

export default function Vendors() {
  const nav = useNavigate();
  const { vendors, t } = useStore();
  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav(-1)} aria-label={t("a.back")}><Back /></button>
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("adm.setup")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("vnd.title")}</h1>
        <p className="meta" style={{ marginTop: 8 }}>{t("vnd.sub")}</p>

        {trades.map((tr) => {
          const list = vendors.filter((v) => v.trade === tr);
          if (!list.length) return null;
          return (
            <div key={tr}>
              <div className="label cat-label" style={{ marginTop: 26 }}><span className="clic"><TradeIcon id={tr} size={16} /></span>{t("trade." + tr)}</div>
              {list.map((v) => (
                <div className="vrow" key={v.id}>
                  <div>
                    <div className="vname">{t(v.nameKey)}</div>
                    <div className="vmeta">{v.area} · <Stars n={v.rating} /></div>
                    {v.phone && <div className="vmeta">{v.phone}{v.rate && v.rate !== "—" ? ` · ${v.rate}` : ""}</div>}
                  </div>
                  <button className="callbtn">
                    <Phone size={16} color="#fff" />
                    {t("act.call")}
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
