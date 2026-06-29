import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TradeIcon } from "../components/Icons";
import { BottomBar } from "../components/BottomBar";
import { useStore } from "../lib/store";
import type { PRStatus } from "../data/mock";

const stages: PRStatus[] = ["requested", "approved", "ordered"];

export default function RequestDetail() {
  const nav = useNavigate();
  const { purchaseReqs, currentReqId, vendors, approvePurchaseReq, orderPurchaseReq, t } = useStore();
  const req = purchaseReqs.find((r) => r.id === currentReqId);
  const supplyVendors = vendors.filter((v) => v.trade === "supplies");
  const [vendorId, setVendorId] = useState<string>(req?.vendorId ?? supplyVendors[0]?.id ?? "");

  useEffect(() => { if (!req) nav("/procurement"); }, [req, nav]);
  if (!req) return null;

  const idx = stages.indexOf(req.status);
  const vName = (id: string | null) => { const v = vendors.find((x) => x.id === id); return v ? t(v.nameKey) : ""; };

  return (
    <div className="screen wide">
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("proc.title")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("proc.reqTitle")}</h1>
        <p className="meta" style={{ marginTop: 8 }}>{req.lines.length === 1 ? t("proc.item1") : t("proc.itemsN", { n: req.lines.length })} · {t(req.whenKey)}</p>

        <div className="flow">
          {stages.map((s, i) => (
            <Fragment key={s}>
              {i > 0 && <span className={"fbar" + (i <= idx ? " fill" : "")} />}
              <span className={"fstep" + (i < idx ? " done" : i === idx ? " on" : "")}>
                <span className="fdot">{i < idx ? <Tick /> : i + 1}</span>
                <span className="fl">{t("prs." + s)}</span>
              </span>
            </Fragment>
          ))}
        </div>

        <div className="label" style={{ marginTop: 30 }}>{t("proc.items")}</div>
        <div>
          {req.lines.map((l) => (
            <div className="prline" key={l.itemId}>
              <span className="plnm">{t("inv." + l.itemId)}</span>
              <span className="plqty">× {l.qty}</span>
            </div>
          ))}
        </div>

        {req.status === "approved" && (
          <div className="field">
            <span className="flabel">{t("proc.chooseVendor")}</span>
            {supplyVendors.map((v) => (
              <button key={v.id} className={"pickrow" + (vendorId === v.id ? " sel" : "")} onClick={() => setVendorId(v.id)}>
                <span className="pk-left"><span className="licon"><TradeIcon id={v.trade} size={20} /></span><span><span className="pname" style={{ display: "block" }}>{t(v.nameKey)}</span><span className="ptag">{v.area}</span></span></span>
                <span className="tick">{vendorId === v.id && <Tick />}</span>
              </button>
            ))}
          </div>
        )}

        {req.status === "ordered" && (
          <div className="pocard">
            <span className="polab">{t("proc.poReady")}</span>
            <span className="ponum">{req.poNum}</span>
            <span className="poto">{t("proc.toVendor", { vendor: vName(req.vendorId) })}</span>
          </div>
        )}
      </div>

      {req.status === "requested" ? (
        <BottomBar onBack={() => nav("/procurement")}>
          <button className="btn btn-primary" onClick={() => approvePurchaseReq(req.id)}>{t("proc.approve")}</button>
        </BottomBar>
      ) : req.status === "approved" ? (
        <BottomBar onBack={() => nav("/procurement")}>
          <button className="btn btn-primary" onClick={() => orderPurchaseReq(req.id, vendorId)}>{t("proc.generatePO")}</button>
        </BottomBar>
      ) : (
        <BottomBar onBack={() => nav("/procurement")} />
      )}
    </div>
  );
}

function Tick() {
  return <svg width="14" height="14" viewBox="0 0 24 24"><path d="M5 12l5 5 9-11" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
