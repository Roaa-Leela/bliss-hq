import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { LangSwitch } from "../components/LangSwitch";
import { RoleIcon } from "../components/Icons";
import { roles, type RoleId } from "../data/mock";
import { useStore } from "../lib/store";

const dest: Record<RoleId, string> = { caretaker: "/caretaker", manager: "/manager", owner: "/owner", admin: "/admin" };

export default function RoleSelect() {
  const nav = useNavigate();
  const { setRole, reset, t } = useStore();
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
              <span className="ric"><RoleIcon id={r.id} size={24} color="var(--forest)" /></span>
              <span style={{ flex: 1 }}>
                <span className="rt" style={{ display: "block" }}>{t("role." + r.id)}</span>
                <span className="rs">{t("role." + r.id + ".sub")}</span>
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={reset}
          style={{ marginTop: 22, color: "var(--slate)", fontSize: 13, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}
        >
          {t("demo.reset")}
        </button>
      </div>
    </div>
  );
}
