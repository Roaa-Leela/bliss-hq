import { useNavigate } from "react-router-dom";
import { Bell } from "./Icons";
import { useStore } from "../lib/store";

export function NotifBell() {
  const nav = useNavigate();
  const { unreadCount, t } = useStore();
  const n = unreadCount();
  return (
    <button className="iconbtn bell" onClick={() => nav("/notifications")} aria-label={t("nt.title")}>
      <Bell />
      {n > 0 && <span className="badge">{n}</span>}
    </button>
  );
}
