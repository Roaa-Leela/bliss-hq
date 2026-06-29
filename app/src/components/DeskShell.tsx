import type { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../lib/store";
import { Brand } from "./Brand";
import { LangSwitch } from "./LangSwitch";
import { Back, Swap, Grid, Calendar, Bell, Home, NotifIcon, AdminIcon, RoleIcon } from "./Icons";

type NavItem = { to: string; label: string; el: ReactNode; badge?: number };

const detailRoutes = new Set([
  "/manager/review", "/manager/issue", "/manager/deposit", "/manager/laundry",
  "/inventory/item", "/procurement/request", "/admin/staff",
]);

function group(path: string): "manager" | "owner" | "admin" {
  if (path.startsWith("/manager") || path === "/notifications") return "manager";
  if (path === "/owner") return "owner";
  return "admin";
}

export function DeskShell({ children }: { children: ReactNode }) {
  const nav = useNavigate();
  const loc = useLocation();
  const { t, unreadCount, setSwitcher } = useStore();
  const g = group(loc.pathname);

  const navs: Record<string, NavItem[]> = {
    manager: [
      { to: "/manager", label: t("mgr.ops"), el: <Grid size={20} /> },
      { to: "/manager/calendar", label: t("cal.title"), el: <Calendar size={20} /> },
      { to: "/manager/issues", label: t("iss.title"), el: <NotifIcon id="issue" size={20} /> },
      { to: "/notifications", label: t("nt.title"), el: <Bell size={20} />, badge: unreadCount() },
    ],
    admin: [
      { to: "/admin", label: t("adm.title"), el: <RoleIcon id="admin" size={20} /> },
      { to: "/inventory", label: t("adm.inventory"), el: <AdminIcon id="inventory" size={20} /> },
      { to: "/procurement", label: t("adm.procurement"), el: <AdminIcon id="procurement" size={20} /> },
      { to: "/vendors", label: t("adm.vendors"), el: <AdminIcon id="vendors" size={20} /> },
    ],
    owner: [
      { to: "/owner", label: t("own.your"), el: <Home size={20} /> },
    ],
  };
  const items = navs[g];

  // longest-prefix active match
  const active = items.reduce((best, it) => {
    const hit = loc.pathname === it.to || loc.pathname.startsWith(it.to + "/");
    return hit && it.to.length > (best?.to.length ?? -1) ? it : best;
  }, null as NavItem | null);

  const isDetail = detailRoutes.has(loc.pathname);

  return (
    <div className="deskshell">
      <aside className="sidebar">
        <div className="sb-brand" onClick={() => nav(items[0].to)}><Brand /></div>
        <nav className="sb-nav">
          {items.map((it) => (
            <button key={it.to} className={"sb-item" + (active?.to === it.to ? " on" : "")} onClick={() => nav(it.to)}>
              <span className="sb-ic">{it.el}</span>
              <span className="sb-label">{it.label}</span>
              {it.badge ? <span className="sb-badge">{it.badge}</span> : null}
            </button>
          ))}
        </nav>
        <div className="sb-foot">
          <LangSwitch />
          <button className="sb-switch" onClick={() => setSwitcher(true)}><Swap size={18} color="var(--forest)" /><span>{t("rsw.title")}</span></button>
        </div>
      </aside>
      <main className="deskmain">
        {isDetail && (
          <div className="deskhead">
            <button className="backlink" onClick={() => nav(-1)}><Back size={18} /><span>{t("a.back")}</span></button>
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
