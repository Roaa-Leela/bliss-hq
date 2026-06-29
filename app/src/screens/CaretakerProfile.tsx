import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { LangSwitch } from "../components/LangSwitch";
import { Back, Person } from "../components/Icons";
import { useStore } from "../lib/store";

function Row({ k, v }: { k: string; v: string }) {
  return (<div className="kv"><span className="k">{k}</span><span className="v">{v}</span></div>);
}

export default function CaretakerProfile() {
  const nav = useNavigate();
  const { caretakers, currentStaffId, t } = useStore();
  const c = caretakers.find((x) => x.id === currentStaffId) ?? caretakers[0];
  const inr = (n: number) => "₹" + n.toLocaleString("en-IN");

  return (
    <div className="screen wide">
      <div className="appbar">
        <button className="iconbtn" onClick={() => nav("/admin")} aria-label={t("a.back")}><Back /></button>
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 12 }}>
          <span className="licon" style={{ width: 52, height: 52, flex: "0 0 52px" }}><Person size={26} color="var(--forest)" /></span>
          <div>
            <h1 className="h2">{t(c.nameKey)}</h1>
            <div className="meta" style={{ marginTop: 4 }}>{t("stf.title")} · {t("stf.assigned", { prop: t("prop." + c.propId) })}</div>
          </div>
        </div>

        <div className="label" style={{ marginTop: 26 }}>{t("stf.contact")}</div>
        <Row k={t("stf.phone")} v={c.phone} />
        <Row k={t("stf.emergency")} v={c.emergency} />

        <div className="label" style={{ marginTop: 24 }}>{t("stf.personal")}</div>
        <Row k={t("stf.age")} v={String(c.age)} />
        <Row k={t("stf.gender")} v={t(c.genderKey)} />
        <Row k={t("stf.address")} v={c.address} />
        <div className="kv">
          <span className="k">{t("stf.aadhaar")}</span>
          <span style={{ textAlign: "right" }}>
            <span className="v" style={{ display: "block" }}>{c.aadhaar}</span>
            <span style={{ fontSize: 11.5, color: "var(--slate)" }}>{t("stf.aadhaarNote")}</span>
          </span>
        </div>

        <div className="label" style={{ marginTop: 24 }}>{t("stf.employment")}</div>
        <Row k={t("stf.joined")} v={c.joined} />
        <Row k={t("stf.salary")} v={inr(c.salary)} />
        <Row k={t("stf.duty")} v={c.dutyHours} />
        <Row k={t("stf.weeklyOff")} v={t(c.weeklyOffKey)} />
        <Row k={t("stf.accommodation")} v={t(c.accommodationKey)} />
        <Row k={t("stf.languages")} v={c.languages} />
        <Row k={t("stf.duties")} v={t(c.dutiesKey)} />
        <div className="kv">
          <span className="k">{t("stf.training")}</span>
          <span className={"pill " + (c.trained ? "pill-ok" : "pill-warn")}>{c.trained ? t("stf.trained") : t("stf.untrained")}</span>
        </div>
      </div>
    </div>
  );
}
