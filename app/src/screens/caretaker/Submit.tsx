import { useNavigate } from "react-router-dom";
import { Check } from "../../components/Icons";
import { property } from "../../data/mock";
import { useStore } from "../../lib/store";

export default function Submit() {
  const nav = useNavigate();
  const { t, totalProgress } = useStore();
  const tp = totalProgress();
  return (
    <div className="screen">
      <div className="celebrate">
        <div className="ring"><Check size={40} color="#3E9D2E" /></div>
        <h1>{t("submit.ready", { name: t("prop." + property.id) })}</h1>
        <p>{t("submit.body", { total: tp.total })}</p>
      </div>
      <div className="actions">
        <button className="btn btn-primary" onClick={() => nav("/caretaker")}>{t("act.backHome")}</button>
      </div>
    </div>
  );
}
