import { useStore } from "../lib/store";
import type { Lang } from "../lib/i18n";

const opts: { id: Lang; label: string }[] = [
  { id: "en", label: "EN" },
  { id: "hi", label: "हि" },
  { id: "te", label: "తె" },
];

export function LangSwitch() {
  const { lang, setLang } = useStore();
  return (
    <div className="langs">
      {opts.map((o) => (
        <button key={o.id} className={"lang" + (lang === o.id ? " on" : "")} onClick={() => setLang(o.id)} aria-label={"Language " + o.label}>
          {o.label}
        </button>
      ))}
    </div>
  );
}
