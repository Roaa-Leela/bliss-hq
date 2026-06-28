import { useNavigate } from "react-router-dom";
import { Check } from "../../components/Icons";
import { property } from "../../data/mock";
import { useStore } from "../../lib/store";

export default function Submit() {
  const nav = useNavigate();
  const { totalProgress } = useStore();
  const tp = totalProgress();
  return (
    <div className="screen">
      <div className="celebrate">
        <div className="ring"><Check size={40} color="#3E9D2E" /></div>
        <h1>{property.name} is ready</h1>
        <p>All {tp.total} areas checked and submitted. Your manager has been notified for review.</p>
      </div>
      <div className="actions">
        <button className="btn btn-primary" onClick={() => nav("/caretaker")}>Back to home</button>
      </div>
    </div>
  );
}
