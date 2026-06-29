import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { LangSwitch } from "../components/LangSwitch";
import { NotifIcon } from "../components/Icons";
import { BottomBar } from "../components/BottomBar";
import { Empty } from "../components/Empty";
import { CalmBell } from "../components/EmptyArt";
import { useStore } from "../lib/store";
import type { NotifKind } from "../data/mock";

const kindBg: Record<NotifKind, string> = {
  review: "var(--info-bg)", issue: "var(--alert-bg)", stock: "var(--warn-bg)",
  po: "var(--mist)", approved: "var(--ok-bg)", laundry: "var(--info-bg)",
};
const kindDot: Record<NotifKind, string> = {
  review: "var(--info)", issue: "var(--alert)", stock: "var(--warn)",
  po: "var(--leaf-deep)", approved: "var(--ok)", laundry: "var(--info)",
};

export default function Notifications() {
  const nav = useNavigate();
  const { notifications, unreadCount, markNotifRead, markAllNotifsRead, setReviewProp, t } = useStore();
  const unread = unreadCount();

  return (
    <div className="screen wide">
      <div className="appbar">
        <Brand />
        <LangSwitch />
      </div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 12 }}>{t("mgr.ops")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("nt.title")}</h1>
        <p className="meta" style={{ marginTop: 8 }}>{t("nt.sub")}</p>

        {notifications.length > 0 && (
          <div className="ntbar">
            <span className="meta">{unread > 0 ? t("nt.unreadN", { n: unread }) : t("nt.allRead")}</span>
            {unread > 0 && <button className="pill pill-go" onClick={markAllNotifsRead}>{t("nt.markAll")}</button>}
          </div>
        )}

        <div>
          {notifications.length === 0 && (
            <Empty art={<CalmBell />} title={t("nt.empty")} />
          )}
          {notifications.map((n) => (
            <button className={"ntrow" + (n.read ? "" : " unread")} key={n.id}
              onClick={() => { if (n.propId) setReviewProp(n.propId); markNotifRead(n.id); nav(n.route); }}>
              <span className="ntic" style={{ background: kindBg[n.kind], color: kindDot[n.kind] }}>
                <NotifIcon id={n.kind} size={21} />
              </span>
              <span className="ntbody">
                <span className="ntt">{t(n.titleKey)}</span>
                <span className="nts">{n.rawSub ?? t(n.subKey)}</span>
              </span>
              <span className="ntmeta">
                {!n.read && <span className="ntnew" />}
                <span className="ntwhen">{t(n.whenKey)}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <BottomBar onBack={() => nav("/manager")} />
    </div>
  );
}
