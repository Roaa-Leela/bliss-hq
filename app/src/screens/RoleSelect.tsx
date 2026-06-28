import { useNavigate } from "react-router-dom";
import { Brand } from "../components/Brand";
import { Arrow } from "../components/Icons";
import { roles, type RoleId } from "../data/mock";
import { useStore } from "../lib/store";

const dest: Record<RoleId, string> = {
  caretaker: "/caretaker", manager: "/manager", owner: "/owner", admin: "/admin",
};

export default function RoleSelect() {
  const nav = useNavigate();
  const { setRole, lang, setLang } = useStore();
  const choose = (id: RoleId) => { setRole(id); nav(dest[id]); };
  return (
    <div className="screen">
      <div className="appbar"><Brand /><div className="langs">
        {(["en","hi","te"] as const).map((l) => (
          <button key={l} className={"lang" + (lang === l ? " on" : "")} onClick={() => setLang(l)}>
            {l === "en" ? "EN" : l === "hi" ? "हि" : "తె"}
          </button>
        ))}
      </div></div>
      <div className="pad grow">
        <div className="kicker" style={{ marginTop: 18 }}>Demo</div>
        <h1 className="h1" style={{ marginTop: 10 }}>Choose a view</h1>
        <p className="meta" style={{ marginTop: 10, marginBottom: 26 }}>
          Pick a role to explore the app. In the real product this is a secure login.
        </p>
        <div className="roles">
          {roles.map((r) => (
            <button key={r.id} className="role" onClick={() => choose(r.id)}>
              <span className="ric"><Arrow size={20} color="#2D4A1A" /></span>
              <span style={{ flex: 1 }}>
                <span className="rt" style={{ display: "block" }}>{r.title}</span>
                <span className="rs">{r.sub}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
