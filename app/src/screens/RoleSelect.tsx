import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { LangSwitch } from "../components/LangSwitch";
import { Arrow } from "../components/Icons";
import { roles, type RoleId } from "../data/mock";
import { useStore } from "../lib/store";

const dest: Record<RoleId, string> = { caretaker: "/caretaker", manager: "/manager", owner: "/owner", admin: "/admin" };

export default function RoleSelect() {
  const nav = useNavigate();
  const { setRole, t } = useStore();
  const choose = (id: RoleId) => { setRole(id); nav(dest[id]); };
  return (
    <div className="screen">
      <div className="appbar"><Brand /><LangSwitch /></div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 18 }}>{t("role.demo")}</div>
        <h1 className="h1" style={{ marginTop: 10 }}>{t("role.title")}</h1>
        <p className="meta" style={{ marginTop: 10, marginBottom: 26 }}>{t("role.help")}</p>
        <div className="roles">
          {roles.map((r) => (
            <button key={r.id} className="role" onClick={() => choose(r.id)}>
              <span className="ric"><Arrow size={20} color="#2D4A1A" /></span>
              <span style={{ flex: 1 }}>
                <span className="rt" style={{ display: "block" }}>{t("role." + r.id)}</span>
                <span className="rs">{t("role." + r.id + ".sub")}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
