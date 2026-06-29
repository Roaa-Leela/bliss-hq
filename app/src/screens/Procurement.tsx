import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { LangSwitch } from "../components/LangSwitch";
import { Back, Cart } from "../components/Icons";
import { Empty } from "../components/Empty";
import { useStore } from "../lib/store";
import type { PRStatus } from "../data/mock";

const prsPill: Record<PRStatus, string> = { requested: "pill-warn", approved: "pill-go", ordered: "pill-ok" };
const prsDot: Record<PRStatus, string> = { requested: "var(--warn)", approved: "var(--leaf-deep)", ordered: "var(--ok)" };

export default function Procurement() {
  const nav = useNavigate();
  const { inventoryItems, prefVendorByCat, vendors, purchaseReqs, createPurchaseReq, setCurrentReq, t } = useStore();
  const low = inventoryItems.filter((i) => i.stock < i.must);

  const [draft, setDraft] = useState<Record<string, { qty: number; on: boolean }>>(() => {
    const d: Record<string, { qty: number; on: boolean }> = {};
    for (const i of low) d[i.id] = { qty: Math.max(1, i.must - i.stock), on: true };
    return d;
  });

  const vName = (id: string | null) => { const v = vendors.find((x) => x.id === id); return v ? t(v.nameKey) : ""; };
  const setQty = (id: string, delta: number) => setDraft((s) => ({ ...s, [id]: { ...s[id], qty: Math.max(1, s[id].qty + delta) } }));
  const toggle = (id: string) => setDraft((s) => ({ ...s, [id]: { ...s[id], on: !s[id].on } }));
  const chosen = low.filter((i) => draft[i.id]?.on);

  const raise = () => {
    const lines = chosen.map((i) => ({ itemId: i.id, qty: draft[i.id].qty }));
    const id = createPurchaseReq(lines);
    setCurrentReq(id);
    nav("/procurement/request");
  };

  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav(-1)} aria-label={t("a.back")}><Back /></button>
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("adm.setup")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("proc.title")}</h1>
        <p className="meta" style={{ marginTop: 8 }}>{t("proc.sub")}</p>

        <div className="label" style={{ marginTop: 28 }}>{t("proc.build")}</div>
        {low.length === 0 ? (
          <div className="banner ok" style={{ marginTop: 12 }}>
            <span className="dot" style={{ background: "var(--ok)" }} />{t("proc.allStocked")}
          </div>
        ) : (
          <>
            <p className="meta" style={{ marginTop: 6, maxWidth: 340 }}>{t("proc.buildSub")}</p>
            <div style={{ marginTop: 10 }}>
              {low.map((i) => {
                const d = draft[i.id];
                return (
                  <div className={"porow" + (d.on ? "" : " off")} key={i.id}>
                    <button className={"chk" + (d.on ? " on" : "")} onClick={() => toggle(i.id)} aria-label={t("proc.qty")}>
                      {d.on && <Tick />}
                    </button>
                    <span className="pinfo">
                      <span className="pnm">{t("inv." + i.id)}</span>
                      <span className="psub">{t("proc.from", { vendor: vName(prefVendorByCat[i.cat]) })}</span>
                    </span>
                    <span className="stepper">
                      <button className="step" onClick={() => setQty(i.id, -1)} disabled={!d.on} aria-label="−">−</button>
                      <span className="stepval">{d.qty}</span>
                      <button className="step" onClick={() => setQty(i.id, 1)} disabled={!d.on} aria-label="+">+</button>
                    </span>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <div className="section-head"><div className="label">{t("proc.requests")}</div></div>
        <div>
          {purchaseReqs.length === 0 && (
            <Empty icon={<Cart size={22} color="var(--slate)" />} title={t("proc.noReqs")} />
          )}
          {purchaseReqs.map((r) => (
            <button className="irow iconrow" key={r.id} onClick={() => { setCurrentReq(r.id); nav("/procurement/request"); }}>
              <span className="iicon" style={{ color: prsDot[r.status], background: "var(--cloud)" }}><Cart size={18} /></span>
              <span>
                <span className="inm">{r.lines.map((l) => t("inv." + l.itemId)).join(", ")}</span>
                <span className="isub">{r.lines.length === 1 ? t("proc.item1") : t("proc.itemsN", { n: r.lines.length })} · {t(r.whenKey)}{r.poNum ? " · " + r.poNum : ""}</span>
              </span>
              <span className={"pill " + prsPill[r.status]}>{t("prs." + r.status)}</span>
            </button>
          ))}
        </div>
      </div>
      {low.length > 0 && (
        <div className="actions">
          <button className="btn btn-primary" disabled={chosen.length === 0} onClick={raise} style={chosen.length === 0 ? { opacity: 0.5 } : undefined}>
            {chosen.length ? t("proc.raiseN", { n: chosen.length }) : t("proc.selectNone")}
          </button>
        </div>
      )}
    </div>
  );
}

function Tick() {
  return <svg width="14" height="14" viewBox="0 0 24 24"><path d="M5 12l5 5 9-11" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
