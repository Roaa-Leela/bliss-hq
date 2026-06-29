import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { LangSwitch } from "../components/LangSwitch";
import { Back } from "../components/Icons";
import { useStore } from "../lib/store";

const trades = ["plumbing", "electrical", "ac", "pool", "laundry", "pest", "supplies"];

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
              <div className="label" style={{ marginTop: 26 }}>{t("trade." + tr)}</div>
              {list.map((v) => (
                <div className="vrow" key={v.id}>
                  <div>
                    <div className="vname">{t(v.nameKey)}</div>
                    <div className="vmeta">{v.area} · <Stars n={v.rating} /></div>
                  </div>
                  <button className="callbtn">
                    <svg width="16" height="16" viewBox="0 0 24 24"><path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 005.5 5.5L16 17l4 1.5v3a1.5 1.5 0 01-1.6 1.5A17 17 0 013 6.6 1.5 1.5 0 014.5 5h2z" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" /></svg>
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
