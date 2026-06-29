import { useLocation, useNavigate } from "react-router-dom";
import { useStore } from "../lib/store";
import { useMedia } from "../lib/useMedia";
import { roles, type RoleId } from "../data/mock";
import { RoleIcon, Swap, Check } from "./Icons";

const dest: Record<RoleId, string> = { caretaker: "/caretaker", manager: "/manager", owner: "/owner", admin: "/admin" };

export function RoleSwitcher() {
  const nav = useNavigate();
  const loc = useLocation();
  const desktop = useMedia("(min-width: 1024px)");
  const { role, setRole, switcherOpen, setSwitcher, t } = useStore();

  if (loc.pathname === "/") return null;

  const go = (id: RoleId) => { setRole(id); setSwitcher(false); nav(dest[id]); };

  // The desktop sidebar provides "Switch view", so hide the floating button only
  // where the shell is active (desktop + back-office). Caretaker keeps the FAB.
  const shell = desktop && !loc.pathname.startsWith("/caretaker");

  return (
    <>
      {!shell && (
        <button className="roleswitch" onClick={() => setSwitcher(true)} aria-label={t("rsw.switch")}>
          <Swap size={20} color="#fff" />
        </button>
      )}
      {switcherOpen && (
        <div className="sheetwrap" onClick={() => setSwitcher(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <div className="sheethandle" />
            <div className="kicker">{t("role.demo")}</div>
            <h2 className="h2" style={{ marginTop: 6 }}>{t("rsw.title")}</h2>
            <div className="roles" style={{ marginTop: 16 }}>
              {roles.map((r) => (
                <button key={r.id} className={"role" + (role === r.id ? " cur" : "")} onClick={() => go(r.id)}>
                  <span className="ric"><RoleIcon id={r.id} size={24} color="var(--forest)" /></span>
                  <span style={{ flex: 1 }}>
                    <span className="rt" style={{ display: "block" }}>{t("role." + r.id)}</span>
                    <span className="rs">{t("role." + r.id + ".sub")}</span>
                  </span>
                  {role === r.id && <span className="rcheck"><Check size={16} color="#fff" /></span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
