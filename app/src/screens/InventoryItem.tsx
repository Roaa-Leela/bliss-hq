import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BottomBar } from "../components/BottomBar";
import { useStore } from "../lib/store";
import type { MoveType } from "../data/mock";

const modes: MoveType[] = ["receipt", "consumption", "count"];
const moveColor: Record<MoveType, string> = { receipt: "var(--ok-text)", consumption: "var(--alert-text)", count: "var(--info-text)" };

export default function InventoryItem() {
  const nav = useNavigate();
  const { inventoryItems, stockMoves, currentItemId, adjustStock, showToast, t } = useStore();
  const item = inventoryItems.find((i) => i.id === currentItemId);
  const [mode, setMode] = useState<MoveType>("receipt");
  const [qty, setQty] = useState(1);

  useEffect(() => { if (!item) nav("/inventory"); }, [item, nav]);
  if (!item) return null;

  const isLow = item.stock < item.must;
  const numColor = item.stock === 0 ? "var(--alert)" : isLow ? "var(--warn)" : "var(--ok)";
  const moves = stockMoves.filter((m) => m.itemId === item.id);
  const qLabel = mode === "receipt" ? "stock.qtyReceive" : mode === "consumption" ? "stock.qtyUse" : "stock.qtyCount";

  const pick = (m: MoveType) => { setMode(m); setQty(m === "count" ? item.stock : 1); };
  const apply = () => { adjustStock(item.id, mode, qty); showToast(t("toast.stockUpdated")); setMode("receipt"); setQty(1); };

  return (
    <div className="screen wide">
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("cat." + item.cat)}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("inv." + item.id)}</h1>

        <div className="stockcard" style={{ marginTop: 18 }}>
          <div className="sc-main">
            <span className="sc-num" style={{ color: numColor }}>{item.stock}</span>
            <span className="sc-of">/ {item.must}</span>
          </div>
          <div className="sc-labs">
            <span className="sc-lab">{t("stock.inStock")}</span>
            <span className="cond" style={item.condition === "good" ? { background: "var(--cloud)", color: "var(--todo)" } : item.condition === "fair" ? { background: "var(--warn-bg)", color: "var(--warn-text)" } : { background: "var(--alert-bg)", color: "var(--alert-text)" }}>{t("cond." + item.condition)}</span>
          </div>
        </div>

        <div className="field">
          <span className="flabel">{t("stock.update")}</span>
          <div className="options">
            {modes.map((m) => (
              <button key={m} className={"opt" + (mode === m ? " sel" : "")} onClick={() => pick(m)}>{t("mv." + m + "Action")}</button>
            ))}
          </div>
        </div>

        <div className="field">
          <span className="flabel">{t(qLabel)}</span>
          <div className="qtybar">
            <button className="step" onClick={() => setQty((q) => Math.max(mode === "count" ? 0 : 1, q - 1))} aria-label="−">−</button>
            <span className="qtyval">{qty}</span>
            <button className="step" onClick={() => setQty((q) => q + 1)} aria-label="+">+</button>
          </div>
        </div>

        <div className="label" style={{ marginTop: 30 }}>{t("stock.history")}</div>
        {moves.length === 0 ? (
          <p className="meta" style={{ marginTop: 12 }}>{t("stock.noHistory")}</p>
        ) : (
          <div>
            {moves.map((m) => (
              <div className="mrow" key={m.id}>
                <span>
                  <span className="mt" style={{ color: moveColor[m.type] }}>{t("mv." + m.type)}</span>
                  <span className="ms">{t(m.whenKey)} · {t("stock.resultingTo", { n: m.resulting })}</span>
                </span>
                <span className="mdelta" style={{ color: m.delta >= 0 ? "var(--ok-text)" : "var(--alert-text)" }}>{m.delta > 0 ? "+" : ""}{m.delta}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomBar onBack={() => nav("/inventory")}>
        <button className="btn btn-primary" onClick={apply}>{t("stock.apply")}</button>
      </BottomBar>
    </div>
  );
}
